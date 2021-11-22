import { FILTER_PARAM, FILTER } from '../../utils/utils';
const state = {
  currentFilterIndex: 0,
  currentParamLink: null,
  currentParamValue: -1,
  currentParamIndex: -1,
  currentView: FILTER,
  filters: [],
};

const mutations = {
  SET_CURRENT_FILTER_INDEX(state, index) {
    state.currentFilterIndex = index;
  },
  SET_CURRENT_VIEW(state, view) {
    state.currentView = view;
  },
  SET_CURRENT_PARAM_VALUE(state, paramValue) {
    state.currentParamValue = paramValue;
  },
  SET_CURRENT_PARAM_LINK(state, paramLink) {
    state.currentParamLink = paramLink;
  },
  SET_FILTERS(state, filters) {
    state.filters = filters;
  },
};

const actions = {
  setFilters({ commit }, filters) {
    commit('SET_FILTERS', filters);
  },
};

const getters = {
  currentFilter(state) {
    return state.filters[state.currentFilterIndex];
  },
  isCurrentViewParam(state) {
    return state.currentView === FILTER_PARAM;
  },
  currentParam(state) {
    return state.currentParamValue;
  },
  filterAndParamDetails(state) {
    for (let iter in state.filters) {
      const criteria = state.filters[iter].criteria;
      for (const index in criteria) {
        const variable = criteria[index].variable;
        if (variable) {
          for (const key in variable) {
            if (variable[key].link === state.currentParamLink) {
              return {
                filterIndex: +iter,
                paramValue: key,
                criteriaIndex: index,
              };
            }
          }
        }
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
