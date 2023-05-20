import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CalendarView from '../views/CalendarView.vue'
import FriendView from '../views/FriendView.vue'
import SearchView from '../views/SearchView.vue'
import HostView from '../views/HostView.vue'
import HostView_create from '../views/HostView_create.vue'
import HostView_search from '../views/HostView_search.vue'
import LoginView from '../views/LoginView.vue'
import itemSearchView from '../views/itemSearchView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/friend',
    name: 'friend',
    component: FriendView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    props: true,
  },
  {
    path: '/host',
    name: 'host',
    component: HostView
  },
  {
    path: '/host_create',
    name: 'host_create',
    component: HostView_create
  },
  {
    path: '/host_search',
    name: 'host_search',
    component: HostView_search,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path:'/search/id=:id',
    name: 'card',
    component: itemSearchView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
