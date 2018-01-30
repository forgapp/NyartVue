<template>
  <spinner v-if="isLoading" />
  <div v-else class="box">
    <article class="media">
      <figure class="media-left">
        <span v-if="isActive" class="icon is-large has-text-success">
          <i class="fa fa-2x fa-users"></i>
        </span>
        <span v-else class="icon is-large">
          <span class="fa-stack fa-lg">
            <i class="fa fa-users fa-stack-1x"></i>
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
            </div>
          </nav>
        </div>
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
                <a :class="statusLinkClass.offLimit" @click.prevent="changeStatus('Off-Limit')">
                  Set Off-Limit
                </a>
                <a :class="statusLinkClass.active" @click.prevent="changeStatus('Active')">
                  Set Active
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

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
                    This client contact is off-limit.<br />
                    Please, do not client contact.
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </v-pane>
      <v-pane title="Jobs">
        <div class="columns">
          <div class="column is-half" v-for="job in jobs" :key="job.id">
            <job-card :id="job.id" :record="job" />
          </div>
        </div>
      </v-pane>
    </v-tab>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import { DisplayLanguages } from '@/components/languages';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import JobCard from '../cards/job';

  @Component({
    components: {
      JobCard,
      DisplayLanguages,
      PhonesDisplay,
      EmailsDisplay,
      AddressesDisplay
    }
  })
  class ClientContactDetails extends Vue {
    @Prop() id
    record = {}
    jobs = []
    isLoading = true

    beforeMount() {
      this.unsubscribe = this.getSubscription();
      this.jobUnsubscribe = this.getJobsSubcription();
    }

    beforeDestroy() {
      this.unsubscribe();
      this.jobUnsubscribe();
    }

    get isActive() {
      return this.record.Status === 'Active';
    }

    get statusLinkClass() {
      return {
        offLimit: { 'dropdown-item': true, 'is-hidden': !this.isActive },
        active: { 'dropdown-item': true, 'is-hidden': this.isActive }
      };
    }

    get flagImageUrl() {
      const nationalityCode = this.record.NationalityCode;
      const flag = nationalityCode ? nationalityCode.toLowerCase() : '';

      return nationalityCode && require(`../../assets/flags/${flag}.svg`);
    }

    get links() {
      return {
        company: this.record.Company ? `/details/company/${this.record.Company.id}` : ''
      };
    }

    changeStatus(status) {
      firestore.collection('ClientContact')
        .doc(this.id)
        .update({ Status: status });
    }

    getSubscription() {
      this.isLoading = true;

      return firestore.collection('ClientContact')
        .doc(this.id)
        .onSnapshot(doc => {
          this.record = doc.data();
          this.isLoading = false;
        });
    }

    getJobsSubcription() {
      return firestore.collection('Job')
        .where('ClientContact.ref', '==', firestore.collection('ClientContact').doc(this.id))
        .onSnapshot(querySnapshot => {
          let jobs = [];

          querySnapshot.forEach(function (doc) {
            const job = {
              id: doc.id,
              ...doc.data()
            };
            jobs = [
              ...jobs,
              job
            ];
          });

          this.jobs = jobs;
        });
    }

    @Watch('id')
    onIdChanged(val, oldVal) {
      if (val !== oldVal) {
        this.unsubscribe();
        this.jobUnsubscribe();
        this.unsubscribe = this.getSubscription();
        this.jobUnsubscribe = this.getJobsSubcription();
      }
    }
  }

  export default ClientContactDetails;
</script>

<style scoped>
  .flag {
    border: 1px solid hsla(0, 0%, 75%, 1);
  }
</style>
