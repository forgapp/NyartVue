<template>
  <div class="box">
    <nav class="level">
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
          <div class="column is-4">
            <div id="information" class="columns is-multiline is-gapless is-mobile">
              <div class="column is-half column-label">Registration Date</div>
              <div class="column is-half">{{ record.RegistrationDate }}</div>
              <div class="column is-half column-label">Recruiter Name</div>
              <div class="column is-half">{{ record.Recruiter && record.Recruiter.Name }}</div>
              <div class="column is-half column-label">Source</div>
              <div class="column is-half">{{ record.Source }}</div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-desktop">
              <div class="column">
                <h1 class="title is-5">Industries</h1>
                <codes-display :codes="record.Industry" />
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="columns is-multiline is-mobile">
              <div class="column is-12-desktop is-one-third-mobile">
                <phones-display :phones="record.Phones" />
              </div>
              <div class="column is-12-desktop is-one-third-mobile">
                <emails-display :emails="record.Emails" />
              </div>
              <div class="column is-12-desktop is-one-third-mobile">
                <addresses-display :emails="record.Addresses" />
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <markdown label="Profile" :text="record.Profile" />
        </div>
      </v-pane>
      <v-pane title="Candidates"> Candidates</v-pane>
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

  export default {
    name: 'companyDetails',
    components: { CodesDisplay, PhonesDisplay, EmailsDisplay, AddressesDisplay, Markdown },
    props: [ 'id' ],
    data() {
      return {
        record: {},
        clientContacts: [],
        clientNumber: 0
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
          this.clientNumber = querySnapshot.size;
          console.log(querySnapshot);
          querySnapshot.forEach(function (doc) {
            console.log(doc.id, '=>', doc.data());
          });
        });
    },
    beforeDestroyed: function () {
      this.unsubscribe();
      this.unsubscribeClientContacts();
    },
    computed: {
      recordNumbers: function () {
        return {
          contacts: `Client Contacts (${this.clientNumber})`
        };
      },
      links: function () {
        return {
          editInformation: `/edit-info/Company/${this.id}`,
          editProfile: `/edit/Profile/Company/${this.id}`
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