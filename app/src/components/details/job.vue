<template>
  <spinner v-if="isLoading" />
  <div v-else class="box">
    <article class="media">
      <figure class="media-left">
        <span v-if="isOpen" class="icon is-large has-text-success">
          <i class="fa fa-2x fa-briefcase"></i>
        </span>
        <span v-else class="icon is-large">
          <span class="fa-stack fa-lg">
            <i class="fa fa-briefcase fa-stack-1x"></i>
            <i class="fa fa-ban fa-stack-2x has-text-danger"></i>
          </span>
        </span>
      </figure>
      <div class="media-content">
        <div class="content">
          <nav class="level">
            <div class="level-left">
              <a class="level-item">
                <div>
                  <h3 class="title is-3">{{ record.JobTitle }}</h3>
                  <p class="heading">{{ record.Company.Name }}</p>
                </div>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div class="media-right">
        <div class="dropdown is-right is-hoverable">
          <div class="dropdown-trigger">
            <a class="button">
              <span>Actions</span>
              <span class="icon is-small">
                <i class="fa fa-ellipsis-v"></i>
              </span>
            </a>
          </div>
          <div class="dropdown-menu">
            <div class="dropdown-content">
                <router-link class="dropdown-item" :to="`/process/new?jobId=${id}&jobName=${record.JobTitle}`">
                  Apply a candidate
                </router-link>
                <router-link class="dropdown-item" :to="`/edit-info/Job/${id}`">
                  Edit Information
                </router-link>
                <router-link class="dropdown-item" :to="`/edit-notes/Job/JobDescription/${id}`">
                  Edit Job Description
                </router-link>
              </div>
          </div>
        </div>
      </div>
    </article>


    <display-languages :languages="record.Languages" />

    <v-tab>
      <v-pane title="Information">
        <div class="columns">
          <div class="column is-8">
            <div class="columns is-multiline">
              <div class="column is-half">
                <div id="information" class="columns is-multiline is-gapless is-mobile">
                  <div class="column is-half column-label">Company</div>
                  <div class="column is-half">
                    <router-link :to="links.company">{{ record.Company && record.Company.Name }}</router-link>
                  </div>

                  <div class="column is-half is-hidden-desktop column-label">Status</div>
                  <div class="column is-half is-hidden-desktop">{{ record.Status }}</div>
                  <div class="column is-half column-label">Salary Range</div>
                  <div class="column is-half"><currency-display :value="record.SalaryMinimun" symbol="¥" /> ~ <currency-display :value="record.SalaryMaximun" symbol="¥" /></div>
                  <div class="column is-half column-label">Work Location</div>
                  <div class="column is-half">{{ record.WorkLocation }}</div>

                  <div class="column is-half column-label">Registration Date</div>
                  <div class="column is-half">{{ record.RegistrationDate }}</div>
                  <div class="column is-half column-label">Recruiter Name</div>
                  <div class="column is-half">{{ record.Recruiter && record.Recruiter.Name }}</div>
                  <div class="column is-half column-label">Source</div>
                  <div class="column is-half">{{ record.Source }}</div>
                </div>
              </div>
              <div class="column is-half">
                <h1 class="title is-6">Contact Information</h1>
                <div class="columns is-multiline is-mobile">
                  <div class="column is-half column-label">Name</div>
                  <div class="column is-half">{{ contact.Firstname }} {{ contact.Lastname }}</div>
                  <div class="column is-12-desktop is-one-third-mobile">
                    <phones-display :phones="contact.Phones" />
                  </div>
                  <div class="column is-12-desktop is-one-third-mobile">
                    <emails-display :emails="contact.Emails" />
                  </div>
                </div>
                  <!--<div class="column is-12-desktop is-one-third-mobile">-->
                  <!--  <addresses-display :emails="record.Addresses" />-->
                  <!--</div>-->
              </div>

            </div>
          </div>
          <div class="column">
            <h1 class="title is-6">Industries</h1>
            <codes-display :codes="record.Industry" />
            <h1 class="title is-6">Job Functions</h1>
            <codes-display :codes="record.JobFunction" />
            <!--<h1 class="title is-5">Skills</h1>-->
            <!--<codes-display :codes="record.Skills" />-->
          </div>
        </div>
    <!--
        <div id="information" class="columns">
          <div class="column is-3">
            <table class="fullwidthTable is-hidden-desktop">
              <tr>
                <td>Nationality</td>
                <td>{{ record.Nationality }}</td>
              </tr>
              <tr>
                <td>Birthdate</td>
                <td>{{ Birthdate }}  {{ Birthdate && Birthdate !== '' && <small>({{ calculateAge(Birthdate) }})</small> }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ record.Status }}</td>
              </tr>
            </table>
            <table class="fullwidthTable">
              <tr>
                <td>Title</td>
                <td>{{ record.JobTitle }}</td>
              </tr>
              <tr>
                <td>Company</td>
                <td><router-link :to="companyURL">{{ companyName }}</router-link></td>
              </tr>
              <tr>
                <td>Salary</td>
                <td>{{ record.Salary }}</td>
              </tr>
            </table>
            <table  class="fullwidthTable">
              <tr>
                <td>RegistrationDate</td>
                <td>{{ record.RegistrationDate }}</td>
              </tr>
              <tr>
                <td>RecruiterName</td>
                <td>{{ recruiterName }}</td>
              </tr>
              <tr>
                <td>Source</td>
                <td>{{ record.Source }}</td>
              </tr>
            </table>
          </div>
          <div class="column">
            <div class="columns is-desktop">
              <div class="column">
                <h1 class="title is-5">Industries</h1>
                <display-codes :codes="record.Industry" />
              </div>
              <div class="column">
                <h1 class="title is-5">Job Functions</h1>
                <display-codes :codes="record.JobFunction" />
              </div>
              <div class="column">
                <h1 class="title is-5">Skills</h1>
              </div>
            </div>
          </div>

          <div class="column is-3">
            <phones-display :phones="record.Phones" />
            <emails-display :emails="record.Emails" />
            <addresses-display :addresses="record.Addresses" />
          </div>
        </div>
    -->
      </v-pane>
      <v-pane title="Job Description">
        <markdown label="Job Description" :text="record.JobDescription" />
      </v-pane>
      <v-pane title="ATS">
        <Ats v-for="process in ats" :key="process.id" type="Candidate" :process="process"/>
      </v-pane>
    </v-tab>

  </div>
</template>

<script>
  // import DatabaseStream from '@/lib/databaseStream';
  // import { ResumesDisplay } from '../resumes';
  // import { DisplayLanguages } from '../languages';
  import { firestore } from '@/lib/firebase';
  import { DisplayLanguages } from '@/components/languages';
  import { CodesDisplay } from '../codes';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import { Markdown } from '../markdown';
  import Ats from '../ats';

  export default {
    name: 'jobDetails',
    // components: { DisplayResumes, DisplayLanguages },
    components: { Ats, DisplayLanguages, CodesDisplay, PhonesDisplay, EmailsDisplay, AddressesDisplay, Markdown },
    props: [ 'id' ],
    data() {
      return {
        isLoading: true,
        record: {},
        contact: {},
        ats: {}
      };
    },
    beforeMount: function () {
      this.unsubscribe = this.getSubscription();
      this.atsUnsubscribe = this.getAtsSubscription();
    },
    beforeDestroy: function () {
      this.unsubscribe();
      this.atsUnsubscribe();
    },
    computed: {
      links() {
        return {
          company: this.record.Company ? `/details/company/${this.record.Company.id}` : ''
        };
      },
      isOpen() {
        return this.record.Status === 'Open';
      }
    },
    methods: {
      getSubscription() {
        this.isLoading = true;

        return firestore.collection('Job')
          .doc(this.id)
          .onSnapshot(doc => {
            const job = doc.data();
            this.isLoading = false;
            this.record = job;
            this.getContactSubscription(job.ClientContact.id);
          });
      },
      getContactSubscription(id) {
        // const contactRef = firestore.collection('Job')
        //   .doc(this.id);

        return firestore.collection('ClientContact')
          .doc(id)
          // .where('ClientContact.ref', '==', contactRef)
          .get().then(doc => {
            console.log(doc.data());
            this.contact = doc.data();
          });
      },
      getAtsSubscription() {
        const candidateRef = firestore.collection('Job')
          .doc(this.id);

        return firestore.collection('Process')
          .where('Job.ref', '==', candidateRef)
          .onSnapshot(querySnapshot => {
            querySnapshot.docChanges.forEach(this.setProcess);
          });
      },
      setProcess(change) {
        const { type, doc } = change;

        if (type !== 'removed') {
          const process = {
            id: doc.id,
            ...doc.data()
          };
          this.ats = Object.assign({}, this.ats, { [doc.id]: process });
        }
      }
    },
    //   createSubscriptions: function (id) {
    //     this.candidateSub = new DatabaseStream('Candidate', 'value')
    //       .child(id)
    //       .subscribe({
    //         next: snapshot => {
    //           this.record = snapshot.val();
    //         },
    //         error: err => console.log(err)
    //       });

    //     this.processesSub = new DatabaseStream('Process', 'value')
    //       .orderByChild('Candidate/id')
    //       .equalTo(id)
    //       .subscribe({
    //         next: snapshot => {
    //           this.ats = snapshot.val();
    //         },
    //         error: err => console.log(err)
    //       });
    //   },
    //   removeSubscriptions() {
    //     this.candidateSub.unsubscribe();
    //     this.processesSub.unsubscribe();
    //   }
    // },
    watch: {
      id: function (val, oldVal) {
        if (val !== oldVal) {
          this.unsubscribe();
          this.atsUnsubscribe();
          this.contactSubscription();
          this.unsubscribe = this.getSubscription();
          this.atsUnsubscribe = this.getAtsSubscription();
          this.contactSubscription = this.getContactSubscription();
        }
      }
    }
  };

// import { h, Component } from 'preact';
// import databaseStream from '../../lib/databaseStream';
// import { Tabs, Pane } from '../tabs';
// import { levelTitle } from './style.css';
// import Spinner from '../spinner';
// import { Link } from 'preact-router';
// import Notes from '../notes';
// import { DisplayLanguages } from '../languages';
// import { fullwidthTable } from './style.css';
// import { DisplayCodes } from '../codes';
// import Ats from '../ats';

// export default class JobDetails extends Component {
//   state = {
//     record: null,
//     ats: null
//   }

//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     const { id } = this.props;

//     this.createSubscriptions(id);
//   }

//   componentWillReceiveProps(nextProps, _) {
//     if(nextProps.id !== this.props.id) {
//       this.removeSubscriptions();
//       this.createSubscriptions(nextProps.id);
//     }
//   }

//   componentWillUnmount() {
//     this.removeSubscriptions();
//   }

//   createSubscriptions(id) {
//     this.jobSub = new databaseStream('Job', 'value')
//       .child(id)
//       .subscribe({
//         next: snapshot => this.setState({ record: snapshot.val() }),
//         error: err => console.log(err)
//       });

//     this.processesSub = new databaseStream('Process', 'value')
//       .orderByChild("Job/id")
//       .equalTo(id)
//       .subscribe({
//         next: snapshot => this.setState({ ats: snapshot.val() }),
//         error: err => console.log(err)
//       });
//   }

//   removeSubscriptions() {
//     this.jobSub.unsubscribe();
//     this.processesSub.unsubscribe();
//   }

//   render({ id }, { record, ats }) {
//     if(!record) {
//       return (<Spinner />);
//     }

//     return (<div class="box">
//       <nav class="level">
//         <div class="level-left">
//           <div class="level-item">
//             <div>
//               <h3 class={ `title is-3 ${levelTitle}` }>{ record.JobTitle }</h3>
//               <h4 class="subtitle is-5"><Link href={ `/details/company/${record.Company.id}` }>{ record.Company.Name }</Link> <Link href={ `/details/clientcontact/${record.ClientContact.id}` }>{ record.ClientContact.Name }</Link></h4>
//             </div>
//           </div>

//           <div class="level-item">
//             <span>{ record.Nationality }</span>
//             <span>{ record.Status }</span>
//           </div>
//         </div>

//         <div class="level-right">
//           <div class="level-item">
//             <div class="dropdown is-right is-hoverable">
//               <div class="dropdown-trigger">
//                 <a class="button">
//                   <span>Actions</span>
//                   <span class="icon is-small">
//                     <i class="fa fa-ellipsis-v"></i>
//                   </span>
//                 </a>
//               </div>
//               <div class="dropdown-menu">
//                 <div class="dropdown-content">
//                   <Link class="dropdown-item" href={ `/process/new?job=${id}` }>
//                     Apply a candidate
//                   </Link>
//                   <Link class="dropdown-item" href={ `/edit-info/Job/${id}` }>
//                     Edit Information
//                   </Link>
//                   <Link class="dropdown-item" href={ `/edit/Notes/Job/${id}` }>
//                     Edit Notes
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <DisplayLanguages languages={ record.Languages } />

//       <Tabs>
//         <Pane label="Information">

//           <div id="information" class="columns">
//   <div class="column is-3">
//     <table class={ `${fullwidthTable} is-hidden-desktop` }>
//       <tr>
//         <td>Company</td>
//         <td><Link href={ `/details/company/${record.Company.id}` }>{ record.Company.Name }</Link></td>
//       </tr>

//       <tr>
//         <td>Contact</td>
//         <td><Link href={ `/details/clientcontact/${record.ClientContact.id}` }>{ record.ClientContact.Name }</Link></td>
//       </tr>

//       <tr>
//         <td>Status</td>
//         <td>{ record.Status }</td>
//       </tr>
//     </table>
//     <table class={ fullwidthTable }>
//       <tr>
//         <td>Salary Range</td>
//         <td>{ record.SalaryMinimun } ~ { record.SalaryMaximun }</td>
//       </tr>
//       <tr>
//         <td>Work Location</td>
//         <td>{ record.WorkLocation }</td>
//       </tr>
//     </table>
//     <table  class={ fullwidthTable }>
//       <tr>
//         <td>Registration Date</td>
//         <td>{ record.RegistrationDate }</td>
//       </tr>
//       <tr>
//         <td>Recruiter</td>
//         <td>{ record.Recruiter.Name }</td>
//       </tr>
//       <tr>
//         <td>Source</td>
//         <td>{ record.Source }</td>
//       </tr>
//     </table>
//   </div>

//   <div class="column">
//     <div class="columns is-desktop">
//       <div class="column">
//         <h1 class="title is-5">Industries</h1>
//         <DisplayCodes codes={ record.Industry } />
//       </div>
//       <div class="column">
//         <h1 class="title is-5">Job Functions</h1>
//         <DisplayCodes codes={ record.JobFunction } />
//       </div>
//       <div class="column">
//         <h1 class="title is-5">Skills</h1>
//       </div>
//     </div>
//   </div>

//   <div class="column is-3 is-hidden">
//     ClientContact Information
//   </div>
// </div>

//           <Notes label="Notes"  markdown={ record.Notes } />
//         </Pane>
//         <Pane label="ATS">
//           { ats && Object.keys(ats).map(key => {
//               const process = ats[key];
//               return (<Ats id={ key } process={ process } type="Candidate" />)
//             })
//           }
//         </Pane>
//       </Tabs>

//       </div>);
//   }
// }
</script>

<style scoped>
  .levelTitle{
    margin-bottom: 1.5rem;
  }

  .fullwidthTable {
    width: 100%;
    margin-bottom: 7px;
  }
</style>
