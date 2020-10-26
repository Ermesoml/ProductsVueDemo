<template>
  <div id="app">
    <md-toolbar md-elevation="1">
      <h3 class="md-title" style="flex: 1">Helloprint Products</h3>
    </md-toolbar>

    <md-content class="md-transparent">
      <router-view/>
    </md-content>
  </div>
</template>

<style lang="scss">
  .md-toolbar + .md-toolbar {
    margin-top: 16px;
  }

  .md-content{
    padding: 0 2vh 0 2vh;
  }

  .md-content.md-theme-default {
    background-color: inherit;
  }

  html, body, #app {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }
</style>

<script>
  export default {
    name: 'App'
  }
</script>