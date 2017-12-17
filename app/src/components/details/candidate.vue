<template>
  <div class="box">
    <article class="media">
      <figure class="media-left">
        <span v-if="isActive" class="icon is-large has-text-success">
          <i class="fa fa-3x fa-user-o"></i>
        </span>
        <span v-else class="icon is-large">
          <span class="fa-stack fa-lg">
            <i class="fa fa-user-o fa-stack-1x"></i>
            <i class="fa fa-ban fa-stack-2x has-text-danger"></i>
          </span>
        </span>
      </figure>
      <div class="media-content">
        <div class="content">
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <div>
                  <h3 class="title is-3">{{ record.Firstname }} {{ record.Lastname }}</h3>
                  <p class="heading">{{ record.FirstnameKanji }} {{ record.LastnameKanji }}</p>
                </div>
              </a>
              <a class="level-item">
                <p class="image is-32x32">
                  <img class="flag" :src="flagImageUrl" />
                </p>
              </a>
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
                      <router-link class="dropdown-item" :to="`/process/new?type=Candidate&id=${id}`">
                        Apply to a job
                      </router-link>
                      <router-link class="dropdown-item" :to="`/edit-info/Candidate/${id}`">
                        Edit Information
                      </router-link>
                      <router-link class="dropdown-item" :to="`/edit-resumes/${id}`">
                        Edit resumes
                      </router-link>
                      <router-link class="dropdown-item" :to="`/edit-notes/Candidate/InterviewNotes/${id}`">
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
            </div>
          </nav>
        </div>

        <nav class="level">
          <div class="level-left">
            <a class="level-item">
              <resumes-display :resumes="resumes" />
            </a>
          </div>
        </nav>

        <nav class="level">
          <div class="level-left">
            <a class="level-item">
              <display-languages :languages="record.Languages" />
            </a>
          </div>
        </nav>
      </div>
    </article>
    <v-tab>
      <v-pane title="Information">
        <div class="columns">
          <div class="column is-8">
            <div class="columns is-multiline">
              <div class="column is-half">
                <div id="information" class="columns is-multiline is-gapless is-mobile">

                  <div class="column is-half is-hidden-desktop column-label">Nationality</div>
                  <div class="column is-half is-hidden-desktop">{{ record.Nationality }}</div>

                  <div class="column is-half is-hidden-desktop column-label">Birthdate</div>
                  <div class="column is-half is-hidden-desktop">{{ record.Birthdate }}</div>

                  <div class="column is-half is-hidden-desktop column-label">Status</div>
                  <div class="column is-half is-hidden-desktop">{{ record.Status }}</div>

                  <div class="column is-half column-label">Title</div>
                  <div class="column is-half">{{ record.JobTitle }}</div>

                  <div class="column is-half column-label">Company</div>
                  <div class="column is-half">
                    <router-link :to="links.company">{{ record.Company && record.Company.Name }}</router-link>
                  </div>

                  <div class="column is-half column-label">Salary</div>
                  <div class="column is-half">
                    <currency-display :value="record.Salary" symbol="¥" />
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
                <div v-if="isActive" class="columns is-multiline is-mobile">
                  <div class="column is-12-desktop is-half-mobile">
                    <phones-display :phones="record.Phones" />
                  </div>
                  <div class="column is-12-desktop is-half-mobile">
                    <emails-display :emails="record.Emails" />
                  </div>
                  <div class="column is-12">
                    <addresses-display :emails="record.Addresses" />
                  </div>
                </div>
                <div v-else>
                  Off-limit. Do not contact.
                </div>
              </div>

              <div class="column">
                <markdown label="Interview Notes" :text="record.InterviewNotes" />
              </div>
            </div>
          </div>
          <div class="column">
            <h1 class="title is-5">Industries</h1>
            <codes-display :codes="record.Industry" />
            <h1 class="title is-5">Job Functions</h1>
            <codes-display :codes="record.JobFunction" />
            <h1 class="title is-5">Skills</h1>
            <!--<codes-display :codes="record.Skills" />-->
          </div>
        </div>
      </v-pane>
      <v-pane title="ATS">
        <div>
          <Ats v-for="process in ats" :key="process.id" type="Job" :process="process"/>
        </div>
      </v-pane>
    </v-tab>

  </div>
</template>

<script>
  import { ResumesDisplay } from '../resumes';
  import { firestore } from '@/lib/firebase';
  import { DisplayLanguages } from '@/components/languages';
  import { CodesDisplay } from '../codes';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import { Markdown } from '../markdown';
  import Ats from '../ats';

  export default {
    name: 'candidateDetails',
    components: { Ats, ResumesDisplay, DisplayLanguages, CodesDisplay, PhonesDisplay, EmailsDisplay, AddressesDisplay, Markdown },
    props: [ 'id' ],
    data() {
      return {
        record: {},
        resumes: [],
        ats: []
      };
    },
    beforeMount: function () {
      this.unsubscribe = this.getSubscription();
      this.resumeUnsubscribe = this.getResumeSubscription();
      this.atsUnsubscribe = this.getAtsSubscription();
    },
    beforeDestroy: function () {
      this.unsubscribe();
      this.resumeUnsubscribe();
    },
    computed: {
      isActive() {
        return this.record.Status === 'Active';
      },
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
        return firestore.collection('Candidate')
          .doc(this.id)
          .onSnapshot(doc => {
            this.record = doc.data();
          });
      },
      getResumeSubscription() {
        return firestore.collection('Candidate')
          .doc(this.id)
          .collection('resumes')
          .onSnapshot(querySnapshot => {
            var resumes = [];

            querySnapshot.forEach(doc => {
              resumes.push(doc.data());
            });

            this.resumes = resumes;
          });
      },
      getAtsSubscription() {
        const candidateRef = firestore.collection('Candidate')
          .doc(this.id);

        return firestore.collection('Process')
          .where('Candidate.ref', '==', candidateRef)
          .onSnapshot(querySnapshot => {
            var ats = [];

            querySnapshot.forEach(doc => {
              ats.push({
                id: doc.id,
                ...doc.data()
              });
            });

            this.ats = ats;
          });
      }
    },
    watch: {
      id: function (val, oldVal) {
        if (val !== oldVal) {
          this.unsubscribe();
          this.resumeUnsubscribe();
          this.atsUnsubscribe();
          this.unsubscribe = this.getSubscription();
          this.resumeUnsubscribe = this.getResumeSubscription();
          this.atsUnsubscribe = this.getAtsSubscription();
        }
      }
    }
  };
</script>

<style scoped>
  .levelTitle {
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
