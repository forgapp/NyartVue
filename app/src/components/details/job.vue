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
                  <div class="column is-half"><currency-display :value="record.SalaryMinimum" symbol="¥" /> ~ <currency-display :value="record.SalaryMaximum" symbol="¥" /></div>
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
                <p v-if="!hasContact">No Contact assigned.</p>
                <div v-else class="columns is-multiline is-mobile">
                  <div class="column is-half column-label">Name</div>
                  <div class="column is-half">{{ contact.Firstname }} {{ contact.Lastname }}</div>
                  <div class="column is-12-desktop is-half-mobile">
                    <phones-display :phones="contact.Phones" />
                  </div>
                  <div class="column is-12-desktop is-half-mobile">
                    <emails-display :emails="contact.Emails" />
                  </div>
                </div>
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
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import { DisplayLanguages } from '@/components/languages';
  import { CodesDisplay } from '../codes';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import { Markdown } from '../markdown';
  import Ats from '../ats';

  @Component({
    components: {
      Ats,
      DisplayLanguages,
      CodesDisplay,
      PhonesDisplay,
      EmailsDisplay,
      AddressesDisplay,
      Markdown
    }
  })
  class JobDetails extends Vue {
    @Prop() id
    isLoading = true
    record = {}
    contact = {}
    ats = {}

    beforeMount() {
      this.unsubscribe = this.getSubscription();
      this.atsUnsubscribe = this.getAtsSubscription();
    }

    beforeDestroy() {
      this.unsubscribe();
      this.atsUnsubscribe();
    }

    get links() {
      return {
        company: this.record.Company ? `/details/company/${this.record.Company.id}` : ''
      };
    }

    get isOpen() {
      return this.record.Status === 'Open';
    }

    get hasContact() {
      return this.record.ClientContact && !!this.record.ClientContact.id;
    }

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
    }

    getContactSubscription(id) {
      if (!id) {
        return null;
      }

      return firestore.collection('ClientContact')
        .doc(id)
        .get().then(doc => {
          this.contact = doc.data();
        });
    }

    getAtsSubscription() {
      const candidateRef = firestore.collection('Job')
        .doc(this.id);

      return firestore.collection('Process')
        .where('Job.ref', '==', candidateRef)
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

    @Watch('id')
    onIdChanged(val, oldVal) {
      if (val !== oldVal) {
        this.unsubscribe();
        this.atsUnsubscribe();
        this.unsubscribe = this.getSubscription();
        this.atsUnsubscribe = this.getAtsSubscription();
      }
    }
  }

  export default JobDetails;
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
