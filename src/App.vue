<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {}
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  border: 0;
}
#app {
  color: #333;
}

.image-pack {
  background-image: url("./assets/rectangle_2_1_replace.png");
}
</style>
