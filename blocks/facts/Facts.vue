<template>
  <h4 v-for="fact in facts">{{ fact }}</h4>
</template>
<script>
import { toRefs } from "vue";
export default {
  name: "Facts",
  props: {
    factProp: Object,
  },
  setup(props) {
    const { factProp } = toRefs(props);
    return { facts: factProp.value.facts };
  },
};
</script>
