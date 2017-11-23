<template>
  <div class="container is-fluid">
    <div class="box">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Select a type to create</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select is-fullwidth" >
                <select v-model="selectedType">
                  <option></option>
                  <option>Candidate</option>
                  <option value="ClientContact">Client Contact</option>
                  <option>Company</option>
                  <option>Job</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <candidate-form v-if="isType('Candidate')" @addRecord="addRecord" @cancel="cancel" :recruiter="user" :isSaving="isSaving" />
      <company-form v-if="isType('Company')" @addRecord="addRecord" @cancel="cancel" :recruiter="user" :isSaving="isSaving" />
      <client-contact-form v-if="isType('ClientContact')" @addRecord="addRecord" @cancel="cancel" :recruiter="user" :isSaving="isSaving" />
      <job-form v-if="isType('Job')" @addRecord="addRecord" @cancel="cancel" :recruiter="user" :isSaving="isSaving" />   
    </div>
  </div>
</template>

<script>
  import { CompanyForm, CandidateForm, ClientContactForm, JobForm } from '@/components/new';
  import { mapState } from 'vuex';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'new',
    components: { CompanyForm, CandidateForm, ClientContactForm, JobForm },
    data: () => ({
      selectedType: '',
      isSaving: false
    }),
    computed: mapState('app', ['user']),
    methods: {
      isType: function (type) {
        return this.selectedType === type;
      },
      addRecord: function (record) {
        this.isSaving = true;

        firestore.collection(this.selectedType)
          .add(record)
          .then(doc => {
            const { id } = doc;
            const type = this.selectedType.toLowerCase();
            const path = `/details/${type}/${id}`;

            this.$router.push({ path });
          });
      },
      cancel: function (event) {
        this.selectedType = '';
      }
    }
  };
</script>
