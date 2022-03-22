<script>
import TheHeader from './layout/the-header.vue'
import TheMain from './layout/the-main.vue'

export default {
  name: 'App',

  components: {
    TheHeader,
    TheMain,
  },
}
</script>

<template>
  <div>
    <TheHeader />
    <TheMain />
  </div>
</template>

