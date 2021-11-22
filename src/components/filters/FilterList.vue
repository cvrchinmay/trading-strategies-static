<template>
<div>
  <ul class="header">
    <li class="dotted_border" @click="selectFilter(e, index)"
      v-for="(filter, index) of filters" :key=filter.id >
        <router-link :to="{name: 'stockFilter', params: {filter: filter.link}}">
          <a class="links">
            <filter-summary :name="filter.name" :tag="filter.tag" :tagColor="filter.color"></filter-summary>
          </a>
        </router-link>
    </li>
  </ul>
</div>
</template>

<script>
import FilterSummary from './FilterSummary.vue';
import { isFilterRoute, isParamRoute, FILTER } from '../../utils/utils'
import {mapState, mapMutations} from 'vuex';
export default {
  name: "FilterList",
  components: {
    FilterSummary
  },
  computed: {
    ...mapState('portfolio', ['filters'])
  },
  methods: {
    ...mapMutations('portfolio', {setCurrentFilter: 'SET_CURRENT_FILTER_INDEX', setCurrentView: 'SET_CURRENT_VIEW'}),
    selectFilter (e, index) {
      this.setCurrentFilter(index)
      this.setCurrentView(FILTER)
    }
  }
}
</script>

<style scoped>
.dotted_border {
  padding: 10px;
  border-bottom: 1px dotted whitesmoke;
} 

.links {
  color: whitesmoke;
}

a:hover { 
  text-decoration: none;
}

.header {
  padding-left: 5px !important;
}
</style>