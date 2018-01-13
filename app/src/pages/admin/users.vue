<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Email</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Username</th>
        <th>Authorized</th>
        <th>Administrator</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <user-row v-for="(user, id) in users" :user="user" :id="id" :key="id" @change="updateInformation" @save="save" @revert="revert" />
    </tbody>
  </table>
</template>


<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import UserRow from '@/components/userRow';

  @Component({
    components: { UserRow }
  })
  class Users extends Vue {
    users = {}
    originalUsers = {}

    beforeMount() {
      this.unsubscribe = this.getSubscription();
    }

    beforeDestroy() {
      this.unsubscribe();
    }

    getSubscription() {
      return firestore.collection('Users')
        .onSnapshot(snapshot => {
          snapshot.docChanges.forEach(this.setUser);
        });
    }

    setUser(change) {
      const { type, doc } = change;

      if (type !== 'removed') {
        this.users = Object.assign({}, this.users, { [doc.id]: doc.data() });
        this.originalUsers = Object.assign({}, this.users, { [doc.id]: doc.data() });
      }
    }

    updateInformation({ id, user }) {
      this.users = Object.assign({}, this.users, { [id]: user });
    }

    save(userId) {
      const { Profile, Permissions } = this.users[userId];

      firestore.collection('Users')
        .doc(userId)
        .update({ Profile, Permissions });
    }

    revert(userId) {
      this.users = Object.assign({}, this.users, { [userId]: this.originalUsers[userId] });
    }
  }

  export default Users;
</script>
