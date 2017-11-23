<template>
  <div class="field-body">
    <lookup
      index="record"
      type="Company"
      placeholder="Company Name"
      v-model="inputCompany"
      :formatLabel="item => item.Name"
      :formatInputValue="item => item.Name"
      :formatItem="formatCompanyObject"
    />
    <div class="field">
       <p class="control is-expanded">
        <div class="control">
          <div class="select is-fullwidth">
            <select :value="contact.id" @change.prevent="handleContactSelect">
              <option value="">Client Contact</option>
              <option v-for="contact in contacts" :key="contact.value" :value="contact.value">{{contact.label}}</option>
            </select>
          </div>
        </div>
      </p>
    </div>
  </div>
</template>

<script>
  import lookup from './lookup';
  import { firestore } from '@/lib/firebase';

  export default {
    name: 'companyLookup',
    components: { lookup },
    props: ['company', 'contact'],
    data() {
      return {
        contacts: []
      };
    },
    computed: {
      inputCompany: {
        get() {
          return this.company;
        },
        set(v) {
          this.$emit('companyChanged', v);
        }
      }
    },
    methods: {
      formatCompanyObject: item => ({
        id: item._id,
        Name: item._source.Name,
        ref: item._id ? firestore.collection('Company').doc(item._id) : ''
      }),
      handleContactSelect(event) {
        const { value } = event.target;
        const contact = this.contacts.find(contact => contact.value === value);

        this.$emit('contactChanged', {
          id: contact.value,
          Name: contact.label,
          ref: contact ? firestore.collection('ClientContact').doc(contact.value) : ''
        });
      }
    },
    watch: {
      company: function (val) {
        if (val) {
          firestore.collection('ClientContact')
            .where('Company.ref', '==', firestore.collection('Company').doc(val.id))
            .get()
            .then(querySnapshot => {
              let results = [];

              querySnapshot.forEach(doc => {
                const contact = doc.data();

                results = [
                  ...results, {
                    label: `${contact.Firstname} ${contact.Lastname}`,
                    value: doc.id
                  }
                ];
              });

              this.contacts = results;
            })
            .catch(error => {
              console.log('Error getting documents: ', error);
            });
        }
      }
    }
  };
</script>
