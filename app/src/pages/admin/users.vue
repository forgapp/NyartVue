<template>
  <div class="columns has-white-background">
    <div class="column column is-4-widescreen">
      <nav class="panel">
        <p class="panel-heading">
          Users
        </p>
        <a :class="getPanelBlockClass(id)" v-for="(user, id) in users" :key="id" @click="selectUser(id)">
          <span class="panel-icon">
            <i class="fa fa-user"></i>
          </span>
          <div>
            <p>{{ user.Firstname }} {{ user.Lastname }}</p>
            <p class="heading">{{ user.email }}</p>
          </div>
        </a>
      </nav>
    </div>
    <div class="column">
      <user-form
        :user="user"
        :isSaving="isSaving"
        @change="updateInformation"
        @save="save"
        @cancel="cancel"
      />
    </div>
  </div>
</template>


<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { firestore } from '@/lib/firebase';
  import UserForm from '@/components/userForm';

  @Component({
    components: { UserForm }
  })
  class Users extends Vue {
    users = {}
    user = null;
    isSaving = false;

    beforeMount() {
      this.unsubscribe = this.getSubscription();
    }

    beforeDestroy() {
      this.unsubscribe();
    }

    getPanelBlockClass(id) {
      return {
        'panel-block': true,
        'is-active': this.user && this.user.id === id
      };
    }

    getSubscription() {
      return firestore.collection('Users')
        .onSnapshot(snapshot => {
          snapshot.docChanges.forEach(this.setUser);
        });
    }

    selectUser(id) {
      this.user = null;
      let permissions = {};

      firestore.collection('Users')
        .doc(id)
        .collection('Permissions')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const { allow } = doc.data();

            if (allow) {
              permissions = { ...permissions, [doc.id]: allow };
            }
          });

          this.user = {
            id,
            ...this.users[id],
            Permissions: permissions
          };
        });
    }

    setUser(change) {
      const { type, doc } = change;

      if (type !== 'removed') {
        this.users = Object.assign({}, this.users, { [doc.id]: doc.data() });
      }
    }

    updateInformation(user) {
      this.user = Object.assign({}, this.user, user);
    }

    save() {
      this.isSaving = true;

      const { id, isChanged, Permissions, ...rest } = this.user;
      const user = rest;
      const userRef = firestore.collection('Users').doc(id);
      const test = Object.keys(Permissions)
        .map(key => {
          return userRef.collection('Permissions')
            .doc(key)
            .set({ allow: Permissions[key] });
        });

      Promise.all([
        userRef.update(user),
        ...test
      ]).then(results => {
        this.isSaving = false;
        this.user = Object.assign({}, this.user, { isChanged: false });
      });
    }

    cancel() {
      this.user = null;
    }
  }

  export default Users;
</script>

<style scoped>
  .has-white-background {
    background: #fff;
  }
</style>