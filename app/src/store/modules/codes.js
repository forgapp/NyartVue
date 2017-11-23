import { firestore } from '@/lib/firebase';

const SET_CODES = 'setCodes';

const state = {
  codes: {}
};

const mutations = {
  [SET_CODES](state, { type, values }) {
    state.codes = { ...state.codes, [type]: values };
  }
};

const getters = {
  getCodesByType: (state, getters) => (type) => {
    return state.codes[type];
  }
};

const actions = {
  getCodeValues({ commit }, type) {
    firestore.collection('Codes')
      .where('Type', '==', type)
      .get().then(doc => {
        console.log(doc, doc.exists);
        // const values = doc.exists ? doc.data().Values : [];
        //  const { Values } = doc.data();

        // commit(SET_CODES, { type, values });
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
