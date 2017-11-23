<template>
  <div>
    <div class="field has-addons" v-for="(email, index) in emails">
      <p class="control">
        <Selectbox
          placeholder="Type"
          type="EmailType"
          :value="email.Type"
          @input="changeType(index, $event)"
        />
      </p>
      <p class="control is-expanded">
        <input class="input" :value="email.Address" @change="changeAddress(index, $event)"/>
      </p>
      <p class="control">
        <button class="button is-danger" @click.prevent="deleteEmail(index)">
          <i class="fa fa-trash"></i>
        </button>
      </p>
    </div>

    <div class="field ">
      <div class="control">
        <button
          @click="addNewEmail"
          class="button is-text"
        >
          Add an email
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EmailsEdit',
    props: [ 'emails' ],
    methods: {
      changeType: function (index, value) {
        const email = Object.assign({}, this.emails[index], {
          Type: value
        });
        const emails = [
          ...this.emails.slice(0, index),
          email,
          ...this.emails.slice(index + 1, this.emails.length)
        ];

        this.$emit('emailChanged', emails);
      },
      changeAddress: function (index, event) {
        const email = Object.assign({}, this.emails[index], {
          Address: event.target.value
        });
        const emails = [
          ...this.emails.slice(0, index),
          email,
          ...this.emails.slice(index + 1, this.emails.length)
        ];

        this.$emit('emailChanged', emails);
      },
      deleteEmail: function (index) {
        const emails = [
          ...this.emails.slice(0, index),
          ...this.emails.slice(index + 1, this.emails.length)
        ];

        this.$emit('emailChanged', emails);
      },
      addNewEmail: function () {
        const emails = [ ...this.emails, { Type: '', Address: '' } ];
        this.$emit('emailChanged', emails);
      }
    }
  };
</script>
