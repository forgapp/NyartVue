<template>
  <div class="address">
    <div class="columns is-multiline" v-for="(address, index) in addresses" :key="index">
      <div class="column is-12">
        <div class="field is-grouped" >
          <p class="control">
            <Selectbox
              placeholder="Type"
              type="AddressType"
              :value="address.Type"
              @input="changeType(index, $event)"
            />
          </p>

          <p class="control">
            <button class="button is-danger" @click.prevent="deleteAddress(index)">
              <i class="fa fa-trash"></i>
            </button>
          </p>
        </div>
      </div>

      <div class="column is-12-mobile is-half">
        <label class="label is-small">Street</label>
        <div class="field" >
          <p class="control is-expanded">
            <input class="input" name="Street" :value="address.Street" @change="changeAddress(index, $event)"/>
          </p>
        </div>
      </div>
      <div class="column is-12-mobile is-half">
        <label class="label is-small">Complement</label>
        <div class="field" >
          <p class="control is-expanded">
            <input class="input" name="Complement" :value="address.Complement" @change="changeAddress(index, $event)"/>
          </p>
        </div>
      </div>
      <div class="column is-12-mobile is-half">
        <label class="label is-small">City</label>
        <div class="field" >
          <p class="control is-expanded">
            <input class="input" name="City" :value="address.City" @change="changeAddress(index, $event)"/>
          </p>
        </div>
      </div>
      <div class="column is-12-mobile is-half">
        <label class="label is-small">State</label>
        <div class="field">
          <p class="control is-expanded">
            <input class="input" name="State" :value="address.State" @change="changeAddress(index, $event)"/>
          </p>
        </div>
      </div>
      <div class="column is-12">
        <label class="label is-small">Country</label>
        <div class="field" >
          <p class="control is-expanded">
            <input class="input" name="Country" :value="address.Country" @change="changeAddress(index, $event)"/>
          </p>
        </div>
      </div>
    </div>
    <div class="field ">
      <div class="control">
        <button @click="addNewAddress" class="button is-text">
          Add an address
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

  @Component({})
  class AddressesEdit extends Vue {
    @Prop() addresses

    changeType(index, value) {
      const address = Object.assign(
        {},
        this.addresses[index],
        { Type: value }
      );
      const addresses = [
        ...this.addresses.slice(0, index),
        address,
        ...this.addresses.slice(index + 1, this.addresses.length)
      ];

      this.addressChanged(addresses);
    }

    changeAddress(index, event) {
      const { name, value } = event.target;
      console.log(index, name, value);
      const address = Object.assign({}, this.addresses[index], {
        [name]: value
      });
      const addresses = [
        ...this.addresses.slice(0, index),
        address,
        ...this.addresses.slice(index + 1, this.addresses.length)
      ];

      this.addressChanged(addresses);
    }

    deleteAddress(index) {
      const addresses = [
        ...this.addresses.slice(0, index),
        ...this.addresses.slice(index + 1, this.addresses.length)
      ];

      this.addressChanged(addresses);
    }

    addNewAddress() {
      const addresses = [ ...this.addresses, { Type: '', Street: '', Complement: '', City: '', State: '', Country: 'Japan' } ];
      this.addressChanged(addresses);
    }

    @Emit()
    addressChanged(address) {}
  }

  export default AddressesEdit;
</script>

<style scoped>
  .address .column {
    padding: 0.25rem;
  }
</style>