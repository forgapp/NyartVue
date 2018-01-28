<template>
  <div class="box">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <div>
            <h3 class="title is-3 levelTitle">{{ record.Firstname }} {{ record.Lastname }}</h3>
            <h4 class="subtitle is-5">{{ record.FirstnameKanji }} {{ record.LastnameKanji }}</h4>
            <p class="image is-32x32">
              <img class="flag" :src="flagImageUrl" />
            </p>
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
      -->
      </div>

      <div class="level-right">
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
                <router-link class="dropdown-item" :to="`/edit-info/ClientContact/${id}`">
                  Edit Information
                </router-link>
                <a class="dropdown-item is-hidden">
                  Set Off-Limit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <display-languages :languages="record.Languages" />

    <v-tab>
      <v-pane title="Information">
        <div class="columns">
          <div class="column is-8">
            <div class="columns is-multiline">
              <div class="column is-half">
                <div id="information" class="columns is-multiline is-gapless is-mobile">

                  <div class="column is-half is-hidden-desktop column-label">Nationality</div>
                  <div class="column is-half is-hidden-desktop">{{ record.Nationality }}</div>

                  <div class="column is-half is-hidden-desktop column-label">Status</div>
                  <div class="column is-half is-hidden-desktop">{{ record.Status }}</div>

                  <div class="column is-half column-label">Title</div>
                  <div class="column is-half">{{ record.JobTitle }}</div>

                  <div class="column is-half column-label">Company</div>
                  <div class="column is-half">
                    <router-link :to="links.company">{{ record.Company && record.Company.Name }}</router-link>
                  </div>

                  <div class="column is-half column-label">Registration Date</div>
                  <div class="column is-half">{{ record.RegistrationDate }}</div>
                  <div class="column is-half column-label">Recruiter Name</div>
                  <div class="column is-half">{{ record.Recruiter && record.Recruiter.Name }}</div>
                  <div class="column is-half column-label">Source</div>
                  <div class="column is-half">{{ record.Source }}</div>
                </div>
              </div>
              <div class="column is-half">
                <div class="columns is-multiline is-mobile">
                  <div class="column is-12-desktop is-one-third-mobile">
                    <phones-display :phones="record.Phones" />
                  </div>
                  <div class="column is-12-desktop is-one-third-mobile">
                    <emails-display :emails="record.Emails" />
                  </div>
                  <div class="column is-12-desktop is-one-third-mobile">
                    <addresses-display :addresses="record.Addresses" />
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="column">
            <h1 class="title is-5">Industries</h1>
            <codes-display :codes="record.Industry" />
            <h1 class="title is-5">Job Functions</h1>
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
      <v-pane title="Jobs">Hello World!</v-pane>
    </v-tab>

  </div>
</template>

<script>
  // import DatabaseStream from '@/lib/databaseStream';
  import { ResumesDisplay } from '../resumes';
  // import { DisplayLanguages } from '../languages';
  import { firestore } from '@/lib/firebase';
  import { DisplayLanguages } from '@/components/languages';
  import { CodesDisplay } from '../codes';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import { Markdown } from '../markdown';

  export default {
    name: 'clientContactDetails',
    // components: { DisplayResumes, DisplayLanguages },
    components: { ResumesDisplay, DisplayLanguages, CodesDisplay, PhonesDisplay, EmailsDisplay, AddressesDisplay, Markdown },
    props: [ 'id' ],
    data() {
      return {
        record: {}
      };
    },
    beforeMount: function () {
      this.unsubscribe = this.getSubscription();
    },
    beforeDestroy: function () {
      this.unsubscribe();
    },
    computed: {
      flagImageUrl() {
        return this.record.NationalityCode ? require(`../../assets/flags/${this.record.NationalityCode.toLowerCase()}.svg`) : '';
      },
      links() {
        return {
          company: this.record.Company ? `/details/company/${this.record.Company.id}` : ''
        };
      }
    },
    methods: {
      getSubscription() {
        return firestore.collection('ClientContact')
          .doc(this.id)
          .onSnapshot(doc => {
            this.record = doc.data();
          });
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
          this.unsubscribe = this.getSubscription();
        }
      }
    }
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

  .flag {
    box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
  }
</style>
