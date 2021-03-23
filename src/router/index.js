import Vue from 'vue'
import Router from 'vue-router'
import landingPAge from '@/components/landingPAge'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Aeroplane from '@/components/admin/Aeroplane'
import Flight from '@/components/admin/Flight'
import Seat from '@/components/admin/Seat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPAge',
      component: landingPAge
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/aeroplanes',
      name: 'Aeroplane',
      component: Aeroplane
    },
    {
      path: '/flights',
      name: 'Flight',
      component: Flight
    },
    {
      path: '/seats',
      name: 'Seat',
      component: Seat
    }

  ]
})
