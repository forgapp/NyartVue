import { firestore } from '@/lib/firebase';

const SET_CODES = 'setCodes';

const state = {
  codes: {}
};

const mutations = {
  [SET_CODES](state, { type, codes }) {
    const newCodes = codes.reduce((aggr, current) => {
      const currentCodes = aggr[current.Category] || [];
      const categoryCodes = [ ...currentCodes, current.Code ];

      return Object.assign({}, aggr, { [current.Category]: categoryCodes });
    }, {});

    state.codes = { ...state.codes, [type]: newCodes };
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
      .get().then(documentSnapshots => {
        const codes = documentSnapshots.docs.map(doc => doc.data());

        console.log(codes);

        commit(SET_CODES, { type, codes });
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
