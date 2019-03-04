{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}  //vuex为true的时候就会写入这些
import Vuex from 'vuex'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import store from  './store/store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
Vue.use(Vuex){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}

import { apiHttp } from './util/api/index';
import 'normalize.css';
import './assets/iconfont/iconfont.css';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

Vue.config.productionTip = false;
Vue.prototype.$apiHttp = apiHttp;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
	{{/router}}
	{{#vuex}}
	store,
	{{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
