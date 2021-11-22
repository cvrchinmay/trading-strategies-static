<template>
    <div :style="{'color': color}">
      {{ text }}
    </div>
</template>

<script>

export default {
  name: "FilterTag",
  props: {
    color: {
      type: String,
      default: 'green'
    },
    text: {
      type: String
    }
  }
}
</script>