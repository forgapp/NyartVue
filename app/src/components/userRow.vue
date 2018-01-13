<template>
  <tr>
   <td>{{ user.Profile.email }}</td>
   <td>
     <div class="field">
       <p class="control">
         <input class="input is-small" type="text" name="Profile.Firstname" :value="user.Profile.Firstname" @change.lazy="handleChange" />
       </p>
     </div>
   </td>
   <td>
     <div class="field">
       <p class="control">
         <input class="input is-small" type="text" name="Profile.Lastname" :value="user.Profile.Lastname" @change.lazy="handleChange" />
       </p>
     </div>
   </td>
   <td>
     <div class="field">
       <p class="control">
         <input class="input is-small" type="text" name="Profile.Username" :disabled="user.Profile.Username" :value="user.Profile.Username" @change.lazy="handleChange" />
       </p>
     </div>
   </td>
   <td class="has-text-centered">
     <label class="checkbox">
       <input type="checkbox" name="Permissions.Authorized" :checked="user.Permissions.Authorized" @change.lazy="handleCheck" />
     </label>
   </td>
   <td class="has-text-centered">
     <label class="checkbox">
       <input type="checkbox" name="Permissions.Administrator" :checked="user.Permissions.Administrator" @change.lazy="handleCheck" />
     </label>
   </td>
   <td>
     <div :class="buttonGroupClass">
       <p class="control">
         <button type="button" @click="handleSave" class="button is-primary is-small">
           Save
         </button>
       </p>
       <p class="control">
         <button type="button" @click="handleRevert" class="button is-small">
           revert
         </button>
       </p>
     </div>
   </td>
 </tr>

</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { set } from '@/lib/immutable';

  @Component({})
  class UserRow extends Vue {
    @Prop({}) user
    @Prop({}) id

    handleChange(event) {
      const { name, value } = event.target;
      const user = set(
        set(this.user, name, value),
        'isChanged',
        true
      );

      this.$emit('change', { id: this.id, user });
    }

    get buttonGroupClass() {
      return {
        'field': true,
        'is-grouped': true,
        'is-invisible': !this.user.isChanged
      };
    }

    handleCheck(event) {
      const { name, checked } = event.target;
      const user = set(
        set(this.user, name, checked),
        'isChanged',
        true
      );

      this.$emit('change', { id: this.id, user });
    }

    handleSave(event) {
      this.$emit('save', this.id);
    }

    handleRevert(event) {
      this.$emit('revert', this.id);
    }
  }

  export default UserRow;

// import { h, Component } from 'preact';

// const User = ({ id, user, onChange, onSave, onRevert }) => {
//   console.log(id, user)
//   const handleChange = (event) => {
//     onChange(
//       id,
//       event.target.name,
//       event.target.value
//     );
//   };

//   const handleCheck = (event) => {
//     onChange(
//       id,
//       event.target.name,
//       event.target.checked
//     );
//   };

//   const handleSave = (event) => {
//     event.preventDefault();

//     onSave(id);
//   };

//   const handleRevert = (event) => {
//     event.preventDefault();

//     onRevert(id);
//   };

//   return (<tr>
//     <td>{ user.Profile.email }</td>
//     <td>
//       <div class="field">
//         <p class="control">
//           <input class="input is-small" type="text" name="Profile.Firstname" value={ user.Profile.Firstname || '' }  onChange={ handleChange }/>
//         </p>
//       </div>
//     </td>
//     <td>
//       <div class="field">
//         <p class="control">
//           <input class="input is-small" type="text" name="Profile.Lastname" value={ user.Profile.Lastname || '' } onChange={ handleChange }/>
//         </p>
//       </div>
//     </td>
//     <td>
//       <div class="field">
//         <p class="control">
//           <input class="input is-small" type="text" name="Profile.Username" disabled={ user.Profile.Username } value={ user.Profile.Username || '' } onChange={ handleChange }/>
//         </p>
//       </div>
//     </td>
//     <td class="has-text-centered">
//       <label class="checkbox">
//         <input type="checkbox" name="Permissions.Authorized" checked={ user.Permissions.Authorized || false } onChange={ handleCheck }/>
//       </label>
//     </td>
//     <td class="has-text-centered">
//       <label class="checkbox">
//         <input type="checkbox" name="Permissions.Administrator" checked={ user.Permissions.Administrator || false } onChange={ handleCheck } />
//       </label>
//     </td>
//     <td>
//       { user.isChanged && <div class="field is-grouped">
//         <p class="control">
//           <button type="button" onClick={ handleSave } class="button is-primary is-small">
//             Save
//           </button>
//         </p>
//         <p class="control">
//           <button type="button" onClick={ handleRevert } class="button is-small">
//             revert
//           </button>
//         </p>
//       </div> }
//     </td>
//   </tr>);
// };

// export default User;
</script>


