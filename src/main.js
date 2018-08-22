import Vue from 'vue';
import moment from 'moment'
import nodemailer from 'nodemailer'
import VueRouter from 'vue-router';
//import store from './store'
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import ApproveReq from './components/ApproveReq.vue'
import RejectReq from './components/RejectReq.vue'

import LoginComponent from "./components/login.vue"

const routes = [
  {
        name: 'CreateItem',
        path: '/create/item',
        component: CreateItem
    },
    {
            name: 'EditItem',
            path: '/edit/:id',
            component: EditItem
      },
/*      {
            name:'sendMail',
            path:'/',
            component:DisplayItem
      },*/
      {
            name: 'DisplayItem',
            path: '/DisplayItem',
            component: DisplayItem
      },
      {
            name: 'secure',
            path: '/secure',
            component: DisplayItem
     },
     {
            path: '/',
            redirect: {
              name: "login"
            }
      },
      {
          path: "/login",
          name: "login",
          component: LoginComponent
      },
      {
            name: 'ApproveReq',
            path: '/ApproveReq',
            component: ApproveReq
        },
        {
              name: 'RejectReq',
              path: '/RejectReq',
              component: RejectReq
          }

];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
