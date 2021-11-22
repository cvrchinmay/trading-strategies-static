<template>
  <div>
    <div v-if="isIndicator" class="white-text">
      <div class="study-type">{{studyType}}</div>
      <div class="set-param-text">Set Parameters</div>
      <div class="d-flex text-field">
        <div class="t-14">Period</div>
        <v-text-field :value="value"></v-text-field>
      </div>
    </div>
    <div v-else>
      <ul class="filter">
        <li class="dotted_border" v-for="(value, index) in sortedValues" :key="index">
          {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapState} from 'vuex';
import {VARIABLE_TYPES} from '../../utils/utils'
export default {
  name: "ParamView",
  props: {},
  computed: {
    ...mapState('portfolio', ['currentParamValue', 'currentParamIndex']),
    ...mapGetters('portfolio', ['currentFilter']),
    variableData () {
      const criteria = this.currentFilter.criteria
      for (const c of criteria) {
        const variable = c.variable
        for (const key in variable) {
          if (key === this.currentParamValue) {
            return variable[key]
          }
        }
      }
      return []
    },
    sortedValues () {
      return this.variableData.values.slice().sort((a, b) => Math.abs(a) - Math.abs(b))
    },
    isIndicator () {
      return this.variableData.type === VARIABLE_TYPES.indicator
    },
    studyType () {
      return this.isIndicator ? this.variableData.study_type.toUpperCase() : ''
    },
    value () {
      return this.isIndicator ? this.variableData.default_value : ''
    }
  },
}
</script>

<style scoped>
.filter {
  color: whitesmoke;
  padding-left: 5px !important;
  list-style: none;
}

.dotted_border {
  padding: 10px;
  border-bottom: 1px dotted whitesmoke;
} 

.text-field {
  position: relative;
  background-color: #fff;
  min-height: 60px;
  font-size: 14px;
  padding: 10px;
  justify-content: space-between;
  color: black;
}

.d-flex {
  display: flex;
  flex-direction: row
}

.t-14 {
  font-size: 14px;
}

.set-param-text {
  margin-bottom: 10px;
}

.study-type {
  margin-bottom: 10px;
  font-weight: bolder;
}

.white-text {
  color: whitesmoke;
}
</style>