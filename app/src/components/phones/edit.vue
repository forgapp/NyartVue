<template>
  <div>
    <div class="field has-addons" v-for="(phone, index) in phones">
      <p class="control">
        <Selectbox
          placeholder="Type"
          type="PhoneType"
          :value="phone.Type"
          @input="changeType(index, $event)"
        />
      </p>
      <p class="control is-expanded">
        <input class="input" :value="phone.Number" @change="changeNumber(index, $event)"/>
      </p>
      <p class="control">
        <button class="button is-danger" @click.prevent="deletePhone(index)">
          <i class="fa fa-trash"></i>
        </button>
      </p>
    </div>

    <div class="field ">
      <div class="control">
        <button
          @click="addNewPhone"
          class="button is-text"
        >
          Add a phone
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PhonesEdit',
    props: [ 'phones' ],
    methods: {
      changeType: function (index, value) {
        const phone = Object.assign({}, this.phones[index], {
          Type: value
        });
        const phones = [
          ...this.phones.slice(0, index),
          phone,
          ...this.phones.slice(index + 1, this.phones.length)
        ];

        this.$emit('phoneChanged', phones);
      },
      changeNumber: function (index, event) {
        const phone = Object.assign({}, this.phones[index], {
          Number: event.target.value
        });
        const phones = [
          ...this.phones.slice(0, index),
          phone,
          ...this.phones.slice(index + 1, this.phones.length)
        ];

        this.$emit('phoneChanged', phones);
      },
      deletePhone: function (index) {
        const phones = [
          ...this.phones.slice(0, index),
          ...this.phones.slice(index + 1, this.phones.length)
        ];

        this.$emit('phoneChanged', phones);
      },
      addNewPhone: function () {
        const phones = this.phones || [];
        const newPhones = [ ...phones, { Type: '', Number: '' } ];
        this.$emit('phoneChanged', newPhones);
      }
    }
  };
</script>
