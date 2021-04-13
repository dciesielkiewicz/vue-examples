import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home";
import { HOME_PATH, TODO_PATH } from "./paths";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: HOME_PATH,
    name: "Home",
    component: Home,
  },
  {
    path: TODO_PATH,
    name: "Todo",
    // route level code-splitting
    // this generates a separate chunk (todo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "todo" */ "../views/Todo"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
