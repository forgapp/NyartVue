<template>
  <div class="container is-fluid">
    <div class="box">
      <h3 class="title is-4">New Process</h3>
      <process-form @save="save" @cancel="cancel" :recruiter="user" :isSaving="isSaving" />
    </div>
    <pre>{{ query }}</pre>
    <ul class="steps is-narrow is-medium is-centered has-content-centered">
      <li class="steps-segment">
        <a href="#" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon">
              <i class="fa fa-shopping-cart"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">Shopping Cart</p>
          </div>
        </a>
      </li>
      <li class="steps-segment">
        <a hef="#" class="has-text-dark">
          <span class="steps-marker">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
          </span>
          <div class="steps-content">
            <p class="heading">User Information</p>
          </div>
        </a>
      </li>
      <li class="steps-segment is-active has-gaps">
        <span class="steps-marker">
          <span class="icon">
            <i class="fa fa-usd"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Payment</p>
        </div>
      </li>
      <li class="steps-segment">
        <span class="steps-marker is-hollow">
          <span class="icon">
            <i class="fa fa-check"></i>
          </span>
        </span>
        <div class="steps-content">
          <p class="heading">Confirmation</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { firestore } from '@/lib/firebase';
  import { ProcessForm } from '@/components/new';

  export default {
    name: 'newProcess',
    components: { ProcessForm },
    data() {
      return {
        isSaving: false
      };
    },
    computed: {
      ...mapState('app', ['user']),
      query() {
        return this.$route.query;
      }
    },
    methods: {
      save(process) {
        this.isSaving = true;

        firestore.collection('Process')
          .add(process)
          .then(() => {
            console.log('Transaction successfully committed!');
            this.returnToRecord();
          }).catch(error => {
            console.log('Transaction failed: ', error);
          });

        // firestore.runTransaction(transaction => {
        //   const processCollection = firestore.collection('Process');
        //   const processRef = processCollection.doc();
        //   const transactionPromise = new Promise((resolve, reject) => {
        //     transaction.set(processRef, process);
        //     transaction.set(processRef.collection('Stage').doc(), application);

        //     resolve();
        //   });

        //   return transactionPromise;
        // }).then(() => {
        //   console.log('Transaction successfully committed!');
        // }).catch(error => {
        //   console.log('Transaction failed: ', error);
        // });
      },
      cancel() { this.returnToRecord(); },
      returnToRecord() {
        const { type, id } = this.query;

        this.$router.push(`/details/${type.toLowerCase()}/${id}`);
      }
    }
  };
// import { h, Component } from 'preact';
// import { route } from 'preact-router';
// import { auth, database } from '../../lib/firebase';
// import { formatdateForInput } from '../../lib/date';
// import Lookup from '../../components/lookup';

// class NewProcess extends Component {
//   state = {
//     process: {
//       Candidate: {
//         Name: '',
//         id: ''
//       },
//       Job: {
//         Title: '',
//         id: ''
//       },
//       Recruiter: {
//         id: auth.currentUser.uid,
//         Name: auth.currentUser.displayName
//       },
//       Application: {
//         StageDate: formatdateForInput(new Date())
//       }
//     }
//   }

//   constructor() {
//     super();

//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleCancel = this.handleCancel.bind(this);
//     this.redirectToRecord = this.redirectToRecord.bind(this);
//     this.handleJobSelect = this.handleJobSelect.bind(this);
//     this.handleCandidateSelect = this.handleCandidateSelect.bind(this);
//     this.handleRecruiterSelect = this.handleRecruiterSelect.bind(this);
//   }

//   componentDidMount() {
//     const { job, candidate } = this.props;

//     if(job) {
//       database.ref('Job')
//         .child(job)
//         .once('value')
//         .then(snapshot => {
//           const jobData = snapshot.val();
//           const process = Object.assign(
//             {},
//             this.state.process,
//             { Job: {
//                 Title: jobData.JobTitle,
//                 id: job
//               }
//             });

//           this.setState({ process });
//         });
//     }

//     if(candidate) {
//       database.ref('Candidate')
//         .child(candidate)
//         .once('value')
//         .then(snapshot => {
//           const candidateData = snapshot.val();
//           const process = Object.assign(
//             {},
//             this.state.process,
//             { Candidate: {
//                 Name: `${candidateData.Firstname} ${candidateData.Lastname}`,
//                 id: candidate
//               }
//             });

//           this.setState({ process });
//         });
//     }
//   }

//   handleJobSelect(item) {
//     const job = {
//       Title: item.value,
//       id: item.id
//     };

//     const process = Object.assign(
//             {},
//             this.state.process,
//             { Job: job }
//           );

//           this.setState({ process });
//   }

//   handleCandidateSelect(item) {
//     const candidate = {
//       Name: item.value,
//       id: item.id
//     };

//     const process = Object.assign(
//             {},
//             this.state.process,
//             { Candidate: candidate }
//           );

//           this.setState({ process });
//   }

//   handleRecruiterSelect(item) {
//     const recruiter = {
//       Name: item.value,
//       id: item.id
//     };

//     const process = Object.assign(
//             {},
//             this.state.process,
//             { Recruiter: recruiter }
//           );

//           this.setState({ process });
//   }

//   handleSubmit(event) {
//     event.preventDefault();

//     database.ref('/Process')
//       .push()
//       .set(this.state.process)
//       .then(() => {
//         this.redirectToRecord();
//       });
//   }

//   handleCancel(event) {
//     event.preventDefault();
//     this.redirectToRecord();
//   }

//   redirectToRecord() {
//     const { job, candidate } = this.props;

//     if (job) {
//           route(`/details/job/${job}`);
//         } else if (candidate) {
//           route(`/details/candidate/${candidate}`);
//         }
//   }

//   render(_, { process }) {
//     return (<form onSubmit={ this.handleSubmit }>
//     <div className="container">
//       <div className="box">
//     <div className="field is-horizontal">
//       <div className="field-label is-normal">
//         <label className="label">Candidate</label>
//       </div>
//       <div className="field-body">
//         <div className="field is-grouped">
//           <p className="control is-expanded">
//             <Lookup
//               index="record"
//               type="Candidate"
//               placeholder="Candidate Name"
//               formatValue={ (item) => `${item.Firstname} ${item.Lastname} (${item.JobTitle})` }
//               handleClick={ this.handleCandidateSelect }
//               value={ process.Candidate.Name }
//             />
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className="field is-horizontal">
//       <div className="field-label is-normal">
//         <label className="label">Job</label>
//       </div>
//       <div className="field-body">
//         <div className="field is-grouped">
//           <p className="control is-expanded">
//             <Lookup
//               index="record"
//               type="Job"
//               placeholder="Job"
//               formatValue={ (item) => `${item.JobTitle} (${item.Company.Name})` }
//               handleClick={ this.handleJobSelect }
//               value={ process.Job.Title }
//             />
//           </p>
//         </div>
//       </div>
//     </div>

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
//           handleClick={ this.handleRecruiterSelect }
//           value={ process.Recruiter.Name }
//         />
//         <div className="field">
//           <p className="control is-expanded">
//             <input id="Application.StageDate" className="input" type="date" placeholder="Date" value={ process.Application.StageDate } onChange={ this.handleChange } />
//           </p>
//         </div>
//       </div>
//     </div>

//     <div className="field is-horizontal">
//       <div className="field-label"></div>
//       <div className="field-body">
//         <div className="field is-grouped">
//           <div className="control">
//             <button type="submit" className="button is-primary">
//               Save
//             </button>
//           </div>
//           <div className="control">
//             <button className="button" onClick={ this.handleCancel }>Cancel</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//     </div>
// </form>);
//   }
// }

// export default NewProcess;
</script>
