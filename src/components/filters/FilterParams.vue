<template>
    <div>
      <div v-for="(param, index) of params" :key="index">
        <div class="static-params">
          <div v-if="isPlainText(param.type)">
            {{param.text}}
          </div>
          <div v-if="isVariable(param.type)">
            <dynamic-params :params="getParams(index)"></dynamic-params>
          </div>
        </div>
        <div class="and" v-if="index < threshold">
          and
        </div>
      </div>
    </div>
</template>

<script>

import DynamicParams from './DynamicParams.vue';
import {PARAM_TYPES, VARIABLE_TYPES} from '../../utils/utils'
export default {
  name: "FilterParams",
  components: {
    DynamicParams
  },
  props: {
    params: {
      type: Array,
      default: []
    }
  },
  computed: {
    threshold() {
      return this.params.length - 1
    },
    summary(i) {
      this.params[i].text
    }
  },
  methods: {
    getParams (index) {
      let param = this.params[index];
      let { variable, text } = param;
      let texts = [];
      let spanTexts = [];
      let links = [];
      let paramID = [];
      for (const key in variable) {
        if (texts.length > 1) {
          texts.length = texts.length - 1;
        }
        texts = texts.concat(text.split(key));
        text = texts[texts.length - 1];
        const obj = variable[key]
        if (obj.type === VARIABLE_TYPES.value) {
          spanTexts.push(obj.values[0])
        } else if (obj.type === VARIABLE_TYPES.indicator) {
          spanTexts.push(obj.default_value)
        }
        links.push(obj.link)
        paramID.push(key)
      }
      return {texts, spanTexts, links, paramID}
    },
    isPlainText (type) {
      return type === PARAM_TYPES.plain_text
    },
    isVariable (type) {
      return type === PARAM_TYPES.variable
    }
  }
}
</script>

<style scoped>
.static-params {
  margin-bottom: 10px;
}

.and {
  font-size: 10px;
  margin-bottom: 10px;
}
</style>