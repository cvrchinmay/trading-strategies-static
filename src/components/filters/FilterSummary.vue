<template>
    <div class="filter-summary">
      {{name}}
      <filter-tag
        class="t-10"
        :text="tag"
        :color="tagColor">
      </filter-tag>
    </div>
</template>

<script>
import FilterTag from './FilterTag.vue'
export default {
  name: "FilterSummary",
  components: {
    FilterTag
  },
  props: {
    name: {
      type: String
    },
    tagColor: {
      type: String,
      default: '#34B71F'
    },
    tag: {
      type: String
    }
  }
}
</script>

<style scoped>
.t-10 {
  font-size: 10px;
}

.filter-summary {
  color: whitesmoke;
  cursor: pointer;
}
</style>