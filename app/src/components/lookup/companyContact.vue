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
        Name: item._source.Name
      }),
      handleContactSelect(event) {
        event.preventDefault();
      }
    },
    watch: {
      company: function (val) {
        console.log(val);
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

  /*

import { h, Component } from 'preact';
import { database } from '../../lib/firebase';
import Lookup from '../lookup';

class CompanyContactLookup extends Component {
  state = { contacts: [] }

  componentDidMount() {
    if(this.props.company && this.props.company.id !== '') {
      this.getClientContacts(this.props.company.id)
    }
  }

  componentWillReceiveProps(nextProps, _) {
    if(nextProps.company &&  nextProps.company.id !== '' && nextProps.company.id !== this.props.company.id) {
      this.getClientContacts(nextProps.company.id);
    }
  }

  getClientContacts(companyId) {
    const contactRef = database.ref("ClientContact")
      .orderByChild("Company/id")
      .equalTo(companyId);

    contactRef.once("value").then(snapshot => {
      const contacts = snapshot.val() || {};

      this.setState({ contacts });

      const contactKeys = Object.keys(contacts);
      if(contactKeys.length > 0) {
        this.props.handleContactSelect({
          id: contactKeys[0],
          value: `${contacts[contactKeys[0]].Firstname} ${contacts[contactKeys[0]].Lastname}`
        });
      }
    });
  }

  handleContactSelect(event) {
    this.props.handleContactSelect({
      id: event.target.value,
      value: event.target.dataset.label
    })
  }

  render({ company, contact, handleCompanySelect }, { contacts }) {
    const contactElements = Object.keys(contacts)
      .map(key => (<option value={ key } data-label={`${contacts[key].Firstname} ${contacts[key].Lastname}`}>
        { `${contacts[key].Firstname} ${contacts[key].Lastname}` }
      </option>));

    return (<div className="field-body">
      <Lookup
        index="record"
        type="Company"
        placeholder="Company Name"
        formatValue={ (item) => `${item.Name}` }
        handleClick={ handleCompanySelect }
        value={ company.Name }
      />
      <div className="field">
        <p className="control is-expanded">
          <div class="control">
            <div class="select is-fullwidth">
              <select value={ contact.id } onChange={ this.handleContactSelect.bind(this) }>
                <option value="">Client Contact</option> }
                { contactElements }
              </select>
            </div>
          </div>
        </p>
      </div>
    </div>);
  }
}

export default CompanyContactLookup;

curl -XPOST 'https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record/Company/LqaP2AuSppkxi3j3xa1n' -H 'Content-Type: application/json' -d '{ "id" : "LqaP2AuSppkxi3j3xa1n", "Name" : "test" }'

curl -XPOST https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record

curl -X PUT https://vr9dvohifl:tuvnkl9u48@first-cluster-8947855740.us-west-2.bonsaisearch.net/record -H 'Content-Type: application/json' -d '
  {
    'mappings': {
      'Company': {
        'properties': {
          'id' : { 'type' : 'text' },
          'Name' : { 'type' : 'text' }
        }
      }
    }
  }'
*/
</script>
