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
        const userUid = user.uid;

        firestore.collection('Users')
          .doc(userUid)
          .get().then(doc => {
            const { Profile, Permissions } = doc.data();
            const formattedUser = Object.assign({
              id: userUid,
              displayName: formatDisplayName(Profile)
            }, user.Profile);

            commit(SET_USER, {
              isLoading: false,
              isLoggedIn: true,
              user: formattedUser,
              isAuthorized: Permissions.Authorized,
              isAdmin: Permissions.Administrator
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

function formatDisplayName(user) {
  return `${user.Firstname} ${user.Lastname}`;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
