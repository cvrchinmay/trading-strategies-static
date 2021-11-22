<template>
  <div class="filter">
    <div v-if="isCurrentViewParam">
      <param-view></param-view>
    </div>
    <div v-else>
      <stock-filter></stock-filter>
    </div>
  </div>
</template>

<script>
import StockFilter from './StockFilter.vue'
import ParamView from './ParamView.vue'
import { FILTER_PARAM, FILTER, isFilterRoute, isParamRoute, createRouteArrays } from '../../utils/utils'
import {mapState, mapMutations, mapGetters} from 'vuex';
export default {
  name: "FilterView",
  components: {
    StockFilter,
    ParamView
  },
  computed: {
    ...mapState('portfolio', ['filters']),
    ...mapGetters('portfolio', ['filterAndParamDetails', 'isCurrentViewParam']),
  },
  mounted() {
    this.getStarted()
  },
  methods: {
    ...mapMutations('portfolio', { 
      setCurrentFilter: 'SET_CURRENT_FILTER_INDEX', 
      setCurrentView: 'SET_CURRENT_VIEW', 
      setCurrentParamLink: 'SET_CURRENT_PARAM_LINK', 
      setCurrentParamValue:'SET_CURRENT_PARAM_VALUE'
    }),
    getStarted () {
      createRouteArrays()
      const route = this.$route.params.filter || this.$route.params.link;
      if(isFilterRoute(route)) {
        this.setCurrentView(FILTER)
        this.setCurrentFilter(this.filters.findIndex((filter) => filter.link === route))
        this.$router.push({name: 'stockFilter', params: {filter: route}})
      }
      else if(isParamRoute(route)) {
        this.setCurrentView(FILTER_PARAM)
        this.setCurrentParamLink(route)
        this.setCurrentFilter(this.filterAndParamDetails.filterIndex)
        this.setCurrentParamValue(this.filterAndParamDetails.paramValue)
        this.$router.push({name: 'paramView', params: {link: route}})
      }
      else {
          this.$router.push({name: 'home'})
      }
    }
  },
  watch: {
    '$route' (to, from) {
      /*
        If Path is changed but the router is same then vue does not re-render entire component,
        hence re-rendering explicitly here.
      */
      if (to.path !== from.path) {
        this.getStarted()
      }
    }
  }
}
</script>

<style scoped>
</style>