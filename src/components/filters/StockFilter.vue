<template>
  <div class="filter-params">
    <filter-summary class="block" :name="currentFilter.name" :tag="currentFilter.tag" :tagColor="currentFilter.color"></filter-summary>
    <filter-params class="params" :params="currentFilter.criteria"></filter-params>
  </div>
</template>

<script>

import FilterSummary from './FilterSummary.vue';
import FilterParams from './FilterParams.vue';
import ParamView from './ParamView.vue';
import {mapGetters} from 'vuex';

export default {
  name: 'StockFilter',

  components: {
    FilterSummary,
    FilterParams,
    ParamView
  },

  computed: {
    ...mapGetters('portfolio', ['currentFilter'])
  },
}
</script>

<style scoped>
.filter-params {
  color: whitesmoke;
}

.block {
  min-height: 60px;
  background-color: #1686b0;
  padding: 10px;
}

.params {
  padding: 10px;
}
</style>