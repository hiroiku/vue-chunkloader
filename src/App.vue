<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<template>
  <div id="app">
    <ul :class="$style.list" v-chunk v-for="row in 8" :key="row">
      <li v-for="id in 4" :key="id">
        <img :data-src="`https://picsum.photos/id/${row * 4 + id}/1280`" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    flex: 1;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}
</style>
