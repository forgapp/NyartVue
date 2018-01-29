<template>
  <div class="box">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <div>
            <h3 class="title is-3 levelTitle">{{ record.Name }}</h3>
            <h4 class="subtitle is-5">{{ record.Type }}</h4>
          </div>
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
                <router-link class="dropdown-item" :to="links.editInformation">
                  Edit Information
                </router-link>
                <router-link class="dropdown-item" :to="links.editProfile">
                  Edit Company Profile
                </router-link>
                <a class="dropdown-item is-hidden">
                  Add Candidate
                </a>
                <a class="dropdown-item is-hidden">
                  Add Client Contact
                </a>
                <a class="dropdown-item is-hidden">
                  Add Job
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

     <v-tab>
      <v-pane title="Information">
        <div class="columns">
          <div class="column is-8">
            <div class="columns is-multiline">
              <div class="column is-half">
                <div id="information" class="columns is-multiline is-gapless is-mobile">
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

              <div class="column">
                <markdown label="Profile" :text="record.Profile" />
              </div>
            </div>
          </div>
          <div class="column">
            <h1 class="title is-5">Industries</h1>
            <codes-display :codes="record.Industry" />
          </div>
        </div>
      </v-pane>
      <v-pane title="Candidates">
        <div class="columns">
          <div class="column is-half" v-for="candidate in candidates" :key="candidate.id">
            <candidate-card :id="candidate.id" :record="candidate" />
          </div>
        </div>
      </v-pane>
      <v-pane title="Contacts">
        <div class="columns">
          <div class="column is-half" v-for="contact in clientContacts" :key="contact.id">
            <client-contact-card :id="contact.id" :record="contact" />
          </div>
        </div>
      </v-pane>
    </v-tab>
  </div>
</template>

<script>
  import { firestore } from '@/lib/firebase';
  import { CodesDisplay } from '../codes';
  import { PhonesDisplay } from '../phones';
  import { EmailsDisplay } from '../emails';
  import { AddressesDisplay } from '../addresses';
  import { Markdown } from '../markdown';
  import ClientContactCard from '../cards/clientContact';
  import CandidateCard from '../cards/candidate';

  export default {
    name: 'companyDetails',
    components: { CandidateCard, ClientContactCard, CodesDisplay, PhonesDisplay, EmailsDisplay, AddressesDisplay, Markdown },
    props: [ 'id' ],
    data() {
      return {
        record: {},
        candidates: [],
        clientContacts: []
      };
    },
    mounted: function () {
      this.unsubscribe = firestore.collection('Company')
        .doc(this.id)
        .onSnapshot(doc => {
          this.record = doc.data();
        });

      this.unsubscribeClientContacts = firestore.collection('ClientContact')
        .where('Company.ref', '==', firestore.collection('Company').doc(this.id))
        .onSnapshot(querySnapshot => {
          let contacts = [];

          querySnapshot.forEach(function (doc) {
            console.log(doc.id, '=>', doc.data());
            const contact = {
              id: doc.id,
              ...doc.data()
            };
            contacts = [
              ...contacts,
              contact
            ];
          });

          this.clientContacts = contacts;
        });

      this.unsubscribeCandidates = firestore.collection('Candidate')
        .where('Company.ref', '==', firestore.collection('Company').doc(this.id))
        .onSnapshot(querySnapshot => {
          let candidates = [];

          querySnapshot.forEach(function (doc) {
            const candidate = {
              id: doc.id,
              ...doc.data()
            };
            candidates = [
              ...candidates,
              candidate
            ];
          });

          this.candidates = candidates;
        });
    },
    beforeDestroyed: function () {
      this.unsubscribe();
      this.unsubscribeClientContacts();
      this.unsubscribeCandidates();
    },
    computed: {
      paneTitle: function () {
        return {
          client: `Contacts ${this.clientContacts.length}`
        };
      },
      recordNumbers: function () {
        return {
          contacts: `Client Contacts (${this.clientNumber})`
        };
      },
      links: function () {
        return {
          editInformation: `/edit-info/Company/${this.id}`,
          editProfile: `/edit-notes/Company/Profile/${this.id}`
        };
      }
    }
  };
</script>

<style scoped>
  .levelTitle{
    margin-bottom: 1.5rem;
  }
</style>
