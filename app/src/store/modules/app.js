import { auth, firestore } from '@/lib/firebase';

const SET_USER = 'setUser';

const state = {
  isLoading: true,
  isLoggedIn: false,
  isAuthorized: null,
  isAdmin: null,
  user: null
};

const mutations = {
  [SET_USER](state, { isLoading, isLoggedIn, user, isAuthorized, isAdmin }) {
    state.isLoading = isLoading;
    state.isLoggedIn = isLoggedIn;
    state.user = user;
    state.isAuthorized = isAuthorized;
    state.isAdmin = isAdmin;
  }
};

const actions = {
  login({ commit }) {
    auth.onAuthStateChanged(user => {
      if (user) {
        // requestMessagingToken(user);
        const { uid } = user;
        const userRef = firestore.collection('Users')
          .doc(uid);
        const permissionsRef = userRef.collection('Permissions');

        Promise.all([
          userRef.get(),
          permissionsRef.get()
        ]).then(([ userDoc, permisionsShot ]) => {
          const user = extractUser(userDoc);
          const permissions = extractPermissions(permisionsShot);

          commit(SET_USER, {
            isLoading: false,
            isLoggedIn: true,
            user: user,
            isAuthorized: permissions.includes('authorized'),
            isAdmin: permissions.includes('administrator'),
            permissions
          });
        });
      } else {
        commit(SET_USER, {
          isLoading: false,
          isLoggedIn: false,
          user: null,
          isAuthorized: null,
          isAdmin: null
        });
      }
    });
  }
};

function extractUser(doc) {
  if (!doc.exists) {
    throw new Error('No User!');
  }

  const user = doc.data();

  return {
    id: doc.id,
    displayName: formatDisplayName(user),
    ...user
  };
}

function extractPermissions(querySnapshot) {
  let permissions = [];

  querySnapshot.forEach(doc => {
    const { allow } = doc.data();

    if (allow) {
      permissions = [ ...permissions, doc.id ];
    }
  });

  return permissions;
}

function formatDisplayName(user) {
  return `${user.Firstname} ${user.Lastname}`;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
