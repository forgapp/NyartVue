import { firestore } from '@/lib/firebase';

const SET_PICKLIST = 'setPicklist';

const state = {
  picklist: {}
};

const mutations = {
  [SET_PICKLIST](state, { type, values }) {
    state.picklist = { ...state.picklist, [type]: values };
  }
};

const getters = {
  getPicklistByType: (state, getters) => (type) => {
    return state.picklist[type];
  }
};

const actions = {
  getPicklistValues({ commit }, type) {
    firestore.collection('Picklist')
      .doc(type)
      .get().then(doc => {
        const { Values } = doc.data();

        commit(SET_PICKLIST, { type, values: Values });
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
