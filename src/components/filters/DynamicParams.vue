<template>
    <div class="d-flex">
      <div v-for="(text, index) of texts"
        :key="index">
        {{text}}
        <span v-if="isSpanTextAvailable(index)"
          @click="selectParam(e, index)">
          <router-link :to="{name: 'paramView', params: {link: links[index]}}" append>
            ({{spanTexts[index]}})
          </router-link>
        </span>
      </div>
    </div>
</template>

<script>

import {mapMutations} from 'vuex';
import {FILTER_PARAM} from '../../utils/utils'
export default {
  name: "DynamicParams",
  data () {
    return {
      currentIndex: -1
    }
  },
  props: {
    params: {
      type: Object
    }
  },
  computed: {
    spanTexts () {
      return this.params.spanTexts
    },
    texts () {
      return this.params.texts
    },
    links () {
      return this.params.links
    },
    paramID () {
      return this.params.paramID
    }
  },
  methods: {
    ...mapMutations('portfolio', {setCurrentView: 'SET_CURRENT_VIEW', setCurrentParamValue: 'SET_CURRENT_PARAM_VALUE'}),
    isSpanTextAvailable (index) {
      return this.spanTexts[index] !== undefined
    },
    selectParam(e, index) {
      this.setCurrentView(FILTER_PARAM)
      this.setCurrentParamValue(this.paramID[index])
    }
  }
}
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-direction: row
}
span {
  margin-right: 4px;
  color: #337ab7;
  text-decoration: none;
}
</style>