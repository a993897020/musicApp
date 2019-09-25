// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios"
import "lib-flexible/flexible"
import "../static/css/reset.css"
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueRouter from "vue-router"
import { routes } from "./routes"
import Toast from 'muse-ui-toast'
import './assets/font/material-icons.css'
import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';


Vue.config.productionTip = false
Vue.use(MuseUi);

Vue.use(Toast,{
  close:false
});

Vue.use(Message);

Vue.prototype.http=axios;
axios.defaults.baseURL="http://localhost:3000"
// axios.defaults.withCredentials =true;


Vue.use(VueRouter);
const router=new VueRouter({
  mode:"history",
  routes,
  linkActiveClass:"active"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
