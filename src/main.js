import Vue from 'vue';
import moment from 'moment'
import nodemailer from 'nodemailer'
import VueRouter from 'vue-router';
//import store from './store'
Vue.use(VueRouter);

import VueSession from 'vue-session'
Vue.use(VueSession)

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import ApproveReq from './components/ApproveReq.vue'
import RejectReq from './components/RejectReq.vue'
import ApproveAdmin from './components/Approve.vue'

import LoginComponent from "./components/login.vue"
import LogoutComponent from "./components/logout.vue"

const routes = [
  {
        name: 'CreateItem',
        path: '/create/item',
        component: CreateItem
    },
    {
        name: 'Approve',
        path: '/Approve',
        component: ApproveAdmin
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
          path: "/logout",
          name: "logout",
          component: LogoutComponent
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
          },
          {
            name: 'signup',
            path: '/signup'
          }

];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');
