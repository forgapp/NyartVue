<template>
  <div>
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <h1 class="title  is-5">Job Information</h1>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Position</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <input
                    :class="{ input: true, 'is-danger': !validation.JobTitle }"
                    type="text"
                    placeholder="Job Title"
                    v-model.trim="job.JobTitle"
                  />
                </p>
                <p class="help is-danger" v-show="!validation.JobTitle">
                  Job title is required.
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="number"
                    placeholder="Headcount"
                    v-model.number="job.Headcount"
                  />
                </p>
              </div>
            </div>
          </div>
      
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Employer</label>
            </div>
            <company-contact-lookup
              :company="job.Company"
              :contact="job.ClientContact"
              @companyChanged="handleCompanyChange"
              @contactChanged="handleContactChange"
            />
          </div>
      
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Salary</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded">
                  <currency-input v-model.number="job.SalaryMinimun" placeholder="Minimum" />
                </p>
                <p class="help">Type 'm' for million, 'k' for thousand.</p>
              </div>
              <div class="field">
                <p class="control is-expanded">
                  <currency-input v-model.number="job.SalaryMaximun" placeholder="Maximum" />
                </p>
              </div>
            </div>
          </div>
          
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Work Location</label>
            </div>
            <div class="field-body">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <input class="input" type="text" placeholder="WorkLocation" v-model.trim="job.WorkLocation" />
                </p>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Registration</label>
            </div>
            <div class="field-body">
              <recruiter-lookup v-model="job.Recruiter" />
        
              <div class="field">
                <p class="control is-expanded">
                  <input
                    class="input"
                    type="date"
                    placeholder="Registration Date"
                    v-model="job.RegistrationDate"
                  />
                </p>
              </div>
        
              <Selectbox
                placeholder="Source"
                type="JobSource"
                v-model="job.Source"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="box">
          <h1 class="title is-5">Languages</h1>
          <edit-languages v-model="job.Languages" />
        </div>
      </div>
    </div>

    <!--<div class="box">-->
    <!--  <div class="columns">-->
    <!--    <div class="column is-4">-->
    <!--      <h1 class="title is-6">Phones</h1>-->
    <!--      <phones-edit :phones="job.Phones" @phoneChanged="handlePhoneChange" />-->
    <!--    </div>-->
    <!--    <div class="column is-4">-->
    <!--      <h1 class="title is-6">Emails</h1>-->
    <!--      <emails-edit :emails="job.Emails" @emailChanged="handleEmailChange" />-->
    <!--    </div>-->
    <!--    <div class="column is-4">-->
    <!--      <h1 class="title is-6">Addresses</h1>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--</div>-->
    
    <div class="box">
      <div class="columns">
        <div class="column is-4">
          <h1 class="title is-5">Industries</h1>
          <edit-codes type="Industry" :codes="job.Industry" @codesChanged="handleIndustryChange" />
        </div>
        <div class="column is-4">
          <h1 class="title is-5">Job Functions</h1>
          <edit-codes type="JobFunction" :codes="job.JobFunction" @codesChanged="handleJobFunctionChange" />
        </div>
      </div>
    </div>
    
    <div class="box">
      <div class="buttons">
        <span class="button is-primary" @click.prevent="handleSubmit" :disabled="!isValid">Save changes</span>
        <span class="button" @click.prevent="handleCancel">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { EditLanguages } from '../languages';
  import { PhonesEdit } from '../phones';
  import { EmailsEdit } from '../emails';
  import { EditCodes } from '../codes';

  export default {
    name: 'jobEdit',
    components: { PhonesEdit, EmailsEdit, EditCodes, EditLanguages },
    props: [ 'id' ],
    data() {
      return {
        job: {
          JobTitle: '',
          Headcount: 1,
          Company: {
            id: '',
            Name: ''
          },
          ClientContact: {
            id: '',
            Name: ''
          },
          SalaryMinimun: 0,
          SalaryMaximun: 0,
          Source: '',
          Languages: [],
          Industry: [],
          JobFunction: [],
          RegistrationDate: '',
          Recruiter: {
            id: '',
            Name: ''
          }
        }
      };
    },
    mounted() {
      this.unsubscribe = firestore.collection('Job')
        .doc(this.id)
        .onSnapshot(doc => {
          this.job = doc && Object.assign(this.job, doc.data());
        });
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    computed: {
      validation() {
        return {
          JobTitle: !!this.job.JobTitle
        };
      },
      isValid() {
        var validation = this.validation;
        return Object.keys(validation).every(function (key) {
          return validation[key];
        });
      }
    },
    methods: {
      handleIndustryChange(codes) {
        this.job = Object.assign({}, this.job, { Industry: codes });
      },
      handleJobFunctionChange(codes) {
        this.job = Object.assign({}, this.job, { JobFunction: codes });
      },
      handleCompanyChange(company) {
        this.job.Company = company;
      },
      handleContactChange(contact) {
        this.job.ClientContact = contact;
      },
      handleSubmit() {
        if (this.isValid) {
          this.$emit('save', this.job);
        }
      },
      handleCancel() {
        this.$emit('cancel');
      }
    }
  };

// import { h, Component } from 'preact';
// import { Selectbox } from '../selectbox';
// import Lookup from '../lookup';
// import { EditLanguages } from '../languages';
// import { EditCodes } from '../codes';
// import CompanyContactLookup from './companyContactLookup';

// const JobInformationEdit = ({ record, handleChange, handleSubmit, handleCancel, handleRecruiterSelect, handleCompanySelect, handleCodeChange, handleClientContactSelect }) => (<form onSubmit={ handleSubmit }>
//   <div class="columns">
//   <div class="column is-8">
// <div class="box">
//   <h1 class="title">Job Information</h1>
//   <div className="field is-horizontal">
//       <div className="field-label is-normal">
//         <label className="label">Position</label>
//       </div>
//       <div className="field-body">
//         <div className="field is-grouped">
//           <p className="control is-expanded">
//             <input id="JobTitle" className="input" type="text" placeholder="Job Title" value={ record.JobTitle } onChange={ handleChange } />
//           </p>
//         </div>
//         <div className="field">
//           <p className="control is-expanded">
//             <input id="Headcount" className="input" type="number" placeholder="Headcount" value={ record.Headcount } onChange={ handleChange } />
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className="field is-horizontal">
//       <div className="field-label is-normal">
//         <label className="label">Employer</label>
//       </div>
//       <CompanyContactLookup
//         company={ record.Company }
//         contact={ record.ClientContact }
//         handleCompanySelect={ handleCompanySelect }
//         handleContactSelect={ handleClientContactSelect }
//       />
//     </div>

//     <div className="field is-horizontal">
//       <div className="field-label is-normal">
//         <label className="label">Salary</label>
//       </div>
//       <div className="field-body">
//         <div className="field is-grouped">
//           <p className="control is-expanded">
//             <input id="SalaryMinimun" className="input" type="number" placeholder="Minimum" value={ record.SalaryMinimun } onChange={ handleChange } />
//           </p>
//         </div>
//         <div className="field">
//           <p className="control is-expanded">
//             <input id="SalaryMaximun" className="input" type="number" placeholder="Maximum" value={ record.SalaryMaximun } onChange={ handleChange } />
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className="field is-horizontal">
//     <div className="field-label is-normal">
//       <label className="label">Work Location</label>
//     </div>
//     <div className="field-body">
//       <div className="field is-grouped">
//         <p className="control is-expanded">
//           <input id="WorkLocation" className="input" type="text" placeholder="WorkLocation" value={ record.WorkLocation } onChange={ handleChange } />
//         </p>
//       </div>
//     </div>
//   </div>

//     <div className="field is-horizontal">
//       <div className="field-label is-normal">
//         <label className="label">Registration</label>
//       </div>
//       <div className="field-body">
//         <Lookup
//           index="config"
//           type="user"
//           placeholder="Recruiter"
//           formatValue={ (item) => `${item.Firstname} ${item.Lastname}` }
//           handleClick={ handleRecruiterSelect }
//           value={ record.Recruiter.Name }
//         />
//         <div className="field">
//           <p className="control is-expanded">
//             <input id="RegistrationDate" className="input" type="date" placeholder="Date" value={ record.RegistrationDate } onChange={ handleChange } />
//           </p>
//         </div>
//         <Selectbox id="Source" type='JobSource' value={ record.Source } handleChange={ handleChange } />
//       </div>
//     </div>
// </div>
//     </div>

//     <div class="column is-4">
// <div class="box">
//     <h1 class="title">Languages</h1>
//       <EditLanguages languages={ record.Languages } handleChange={ handleChange } />
//     </div>
// </div>
//   </div>

//   <div class="columns">
//     <div class="column is-4">
// <div class="box">
//     <h1 class="title">Industries</h1>
//     <EditCodes id="Industry" type="Industry" codes={ record.Industry } update={ handleCodeChange } />
// </div>
//     </div>
//     <div class="column is-4">
// <div class="box">
//     <h1 class="title">Job Functions</h1>
//     <EditCodes id="JobFunction" type="JobFunction" codes={ record.JobFunction } update={ handleCodeChange } />
// </div>
//     </div>
//     <div class="column is-4">
// <div class="box">
//     <h1 class="title">Skills</h1>
// </div>
//     </div>
//   </div>

//   <div className="field is-horizontal">
//     <div className="field-label"></div>
//     <div className="field-body">
//       <div className="field is-grouped">
//         <div className="control">
//           <button type="submit" className="button is-primary">
//             Save
//           </button>
//         </div>
//         <div className="control">
//           <button className="button" onClick={ handleCancel }>Cancel</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </form>);

// export default JobInformationEdit;
</script>
