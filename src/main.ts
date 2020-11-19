import Vue from 'vue';
import App from '@/App.vue';
import VueChunkLoader from '@/plugins';

Vue.config.productionTip = false;
Vue.use(VueChunkLoader);

new Vue({
  render: h => h(App),
}).$mount('#app');
