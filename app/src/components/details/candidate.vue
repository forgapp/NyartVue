<template>
  <div class="box">
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div>
            <h3 class="title is-3 levelTitle">{{ record.Firstname }} {{ record.Lastname }}</h3>
            <h4 class="subtitle is-5">{{ record.FirstnameKanji }} {{ record.LastnameKanji }}</h4>
          </div>
        </div>

        <!-- <div class="level-item">
          <span>{{ record.Nationality }}</span>
          <span v-if="record.DateOfBirth">
            <i class="fa fa-birthday-cake" aria-hidden="true"></i>
            {{ record.DateOfBirth }} <small>({ calculateAge(record.DateOfBirth) } yrs)</small>
          </span>
           <span>{{ record.Status }}</span>
        </div>
      </div> -->

      <!-- <div class="level-right">
        <div class="level-item">
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
                <router-link class="dropdown-item" :to="`/process/new?candidate=${id}`">
                  Apply to a job
                </router-link>
                <router-link class="dropdown-item" :to="`/edit-info/Candidate/${id}`">
                  Edit Information
                </router-link>
                <router-link class="dropdown-item" :to="`/edit-resumes/${id}`">
                  Edit resumes
                </router-link>
                <router-link class="dropdown-item" :to="`/edit/InterviewNotes/Candidate/${id}`">
                  Edit Interview Notes
                </router-link>
                <a class="dropdown-item is-hidden">
                  Set Off-Limit
                </a>
                <a class="dropdown-item is-hidden">
                  Lock Prefered Recruiter
                </a>
              </div>
            </div>
          </div>
        </div>
      -->
      </div> 
    </nav>

    <!-- <display-resumes :id="id" /> -->
    <!-- <display-languages :languages="record.Languages" /> -->

    <!-- <v-tab>
      <v-pane title="Information">
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
      </v-pane>
      <v-pane title="ATS">World!</v-pane>
    </v-tab> -->

  </div>
</template>

<script>
  // import DatabaseStream from '@/lib/databaseStream';
  // import { DisplayResumes } from '../resumes';
  // import { DisplayLanguages } from '../languages';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'candidateDetails',
    // components: { DisplayResumes, DisplayLanguages },
    props: [ 'id' ],
    data() {
      return {
        record: {}
      };
    },
    beforeMount: function () {
      this.unsubscribe = firestore.collection('Candidate')
        .doc(this.id)
        .onSnapshot(doc => {
          this.record = doc.data();
        });
    }
    // beforeMount: function () {
    //   this.createSubscriptions(this.id);
    // },
    // beforeDestroy: function () {
    //   this.removeSubscriptions();
    // },
    // computed: {
    //   recruiterName() {
    //     return this.record.Recruiter && this.record.Recruiter.Name;
    //   },
    //   companyName() {
    //     return this.record.Company && this.record.Company.Name;
    //   },
    //   companyURL() {
    //     return this.record.Company ? `/details/company/${this.record.Company.id}` : '';
    //   }
    // },
    // methods: {
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
    // watch: {
    //   id: function (val, oldVal) {
    //     if (val !== oldVal) {
    //       this.removeSubscriptions();
    //       this.createSubscriptions(val);
    //     }
    //   }
    // }
  };
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
