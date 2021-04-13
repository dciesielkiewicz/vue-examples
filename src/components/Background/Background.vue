<template>
  <div class="background" data-testid="background">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "Background",
};
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/main.sass'

.background
  background-color: map-get($grey, 'lighten-4')
  min-height: 100vh
</style>
