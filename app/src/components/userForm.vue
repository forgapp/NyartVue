<template>
  <div v-if="user == null">Select a user</div>
  <form v-else>
     <div class="field">
       <label class="label">Email</label>
       <p class="control">
         <input class="input is-small" type="text" :disabled="user.email" :value="user.email" />
       </p>
     </div>

    <div class="field">
      <label class="label">First name</label>
      <div class="control">
        <input class="input is-small" type="text" name="Firstname" :value="user.Firstname" @change="handleChange" />
      </div>
    </div>

    <div class="field">
      <label class="label">Last name</label>
       <p class="control">
         <input class="input is-small" type="text" name="Lastname" :value="user.Lastname" @change="handleChange" />
       </p>
     </div>


     <div class="field">
       <label class="label">Username</label>
       <p class="control">
         <input class="input is-small" type="text" name="Username" :disabled="user.Username" :value="user.Username" @change="handleChange" />
       </p>
     </div>

     <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" name="Permissions.authorized" :checked="user.Permissions.authorized" @change.lazy="handleCheck" />
          Authorized
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" name="Permissions.administrator" :checked="user.Permissions.administrator" @change.lazy="handleCheck" />
          Administrator
        </label>
      </div>
    </div>

   <!--<div class="has-text-centered">-->
   <!--  <label class="checkbox">-->
   <!--    <input type="checkbox" name="Permissions.Authorized" :checked="user.Permissions.Authorized" @change.lazy="handleCheck" />-->
   <!--  </label>-->
   <!--</div>-->
   <!--<div class="has-text-centered">-->
   <!--  <label class="checkbox">-->
   <!--    <input type="checkbox" name="Permissions.Administrator" :checked="user.Permissions.Administrator" @change.lazy="handleCheck" />-->
   <!--  </label>-->
   <!--</div>-->
     <div :class="buttonGroupClass">
       <p class="control">
         <button type="button" @click="handleSave" :disabled="isSaving" class="button is-primary">
           Save
         </button>
       </p>
       <p class="control">
         <button type="button" @click="handleCancel" :disabled="isSaving" class="button is-text">
           cancel
         </button>
       </p>
     </div>

 </form>

</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { set } from '@/lib/immutable';

  @Component({})
  class UserRow extends Vue {
    @Prop({}) user
    @Prop({}) id
    @Prop({}) isSaving

    handleChange(event) {
      const { name, value } = event.target;
      const user = set(
        set(this.user, name, value),
        'isChanged',
        true
      );

      this.$emit('change', user);
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

      this.$emit('change', user);
    }

    handleSave(event) {
      this.$emit('save');
    }

    handleCancel(event) {
      this.$emit('cancel');
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


