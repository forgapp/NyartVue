<template>
  <spinner v-if="isLoading" />
  <div v-else class="box">
    <article class="media">
      <figure class="media-left">
        <span v-if="isActive" class="icon is-large has-text-success">
          <i class="fa fa-2x fa-user-o"></i>
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
          <nav class="level">
            <div class="level-left">
              <a class="level-item">
                <div>
                  <h3 class="title is-3">{{ record.Firstname }} {{ record.Lastname }}</h3>
                  <p class="heading">{{ record.FirstnameKanji }} {{ record.LastnameKanji }}</p>
                </div>
              </a>
              <a class="level-item is-hidden-mobile">
                <p class="image is-32x32">
                  <img class="flag" :src="flagImageUrl" />
                </p>
              </a>
              <a class="level-item is-hidden-mobile">
                {{ record.Birthdate }}
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div class="media-right">
        <div class="dropdown is-right is-hoverable">
          <div class="dropdown-trigger">
            <a class="button">
              <span class="is-hidden-mobile">Actions</span>
              <span class="icon is-small">
                <i class="fa fa-ellipsis-v"></i>
              </span>
            </a>
          </div>
          <div class="dropdown-menu">
            <div class="dropdown-content">
              <router-link class="dropdown-item" :to="links.applyJob">
                Apply to a job
              </router-link>
              <router-link class="dropdown-item" :to="links.edit">
                Edit Information
              </router-link>
              <router-link class="dropdown-item" :to="links.resumes">
                Edit resumes
              </router-link>
              <router-link class="dropdown-item" :to="links.interviewNotes">
                Edit Interview Notes
              </router-link>
              <a :class="statusLinkClass.offLimit" @click.prevent="changeStatus('Off-Limit')">
                Set Off-Limit
              </a>
              <a :class="statusLinkClass.active" @click.prevent="changeStatus('Active')">
                Set Active
              </a>
              <a class="dropdown-item is-hidden">
                Lock Prefered Recruiter
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
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
                    <addresses-display :addresses="record.Addresses" />
                  </div>
                </div>
                <article v-else class="message is-warning">
                  <div class="message-body">
                    This candidate is Off-limit.<br />
                    Please, do not contact.
                  </div>
                </article>
              </div>


            </div>
          </div>
          <div class="column">
            <h1 class="title is-5 is-marginless">Industries</h1>
            <codes-display :codes="record.Industry" />
            <h1 class="title is-5 is-marginless">Job Functions</h1>
            <codes-display :codes="record.JobFunction" />
            <!-- <h1 class="title is-5">Skills</h1> -->
            <!--<codes-display :codes="record.Skills" />-->
          </div>
        </div>
      </v-pane>
      <v-pane title="Interview Notes">
        <div class="column">
          <markdown label="Interview Notes" :text="record.InterviewNotes" />
        </div>
      </v-pane>
      <v-pane title="ATS">
        <Ats v-for="process in ats" :key="process.id" type="Job" :process="process"/>
      </v-pane>
    </v-tab>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import { DisplayLanguages } from '../languages';
  import { ResumesDisplay } from '../resumes';
  import { CodesDisplay } from '../codes';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import { Markdown } from '../markdown';
  import Ats from '../ats';

  @Component({
    components: {
      Ats,
      ResumesDisplay,
      DisplayLanguages,
      CodesDisplay,
      PhonesDisplay,
      EmailsDisplay,
      AddressesDisplay,
      Markdown
    }
  })
  class CandidateDetails extends Vue {
    @Prop({}) id
    record = {}
    resumes = []
    ats = {}
    isLoading = true

    beforeMount() {
      this.unsubscribe = this.getSubscription();
      this.resumeUnsubscribe = this.getResumeSubscription();
      this.atsUnsubscribe = this.getAtsSubscription();
    }

    beforeDestroy() {
      this.unsubscribe();
      this.resumeUnsubscribe();
      this.atsUnsubscribe();
    }

    get isActive() {
      return this.record.Status === 'Active';
    }

    get flagImageUrl() {
      const code = this.record.NationalityCode;

      return code ? `/static/img/flags/${code.toLowerCase()}.svg` : '';
    }

    get links() {
      return {
        company: this.record.Company ? `/details/company/${this.record.Company.id}` : '',
        applyJob: `/process/new?candidateId=${this.id}&candidateName=${this.record.Firstname} ${this.record.Lastname}`,
        edit: `/edit-info/Candidate/${this.id}`,
        resumes: `/edit-resumes/${this.id}`,
        interviewNotes: `/edit-notes/Candidate/InterviewNotes/${this.id}`
      };
    }

    get statusLinkClass() {
      const isActive = this.record.Status === 'Active';

      return {
        offLimit: { 'dropdown-item': true, 'is-hidden': !isActive },
        active: { 'dropdown-item': true, 'is-hidden': isActive }
      };
    }

    getSubscription() {
      this.isLoading = true;

      return firestore.collection('Candidate')
        .doc(this.id)
        .onSnapshot(doc => {
          this.record = doc.data();
          this.isLoading = false;
        });
    }

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
    }

    getAtsSubscription() {
      const candidateRef = firestore.collection('Candidate')
        .doc(this.id);

      return firestore.collection('Process')
        .where('Candidate.ref', '==', candidateRef)
        .onSnapshot(querySnapshot => {
          querySnapshot.docChanges.forEach(this.setProcess);
        });
    }

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

    changeStatus(status) {
      firestore.collection('Candidate')
        .doc(this.id)
        .update({ Status: status });
    }

    @Watch('id')
    onIdChanged(val, oldVal) {
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

  export default CandidateDetails;
</script>

<style scoped>
  .flag {
    border: 1px solid hsla(0, 0%, 75%, 1);
  }
</style>
