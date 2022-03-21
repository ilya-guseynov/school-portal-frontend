<script>
import TheHeader from './components/layout/the-header.vue'
import TheMain from './components/layout/the-main.vue'

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

