import Router from 'vue-router';
import Vue from 'vue';

import Demo1 from '@/examples/demo1.vue';
import Demo2 from '@/examples/demo2.vue';
import Demo3 from '@/examples/demo3.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/demo2',
      name: 'Demo2',
      component: Demo2
    },
    {
      path: '/demo3',
      name: 'Demo3',
      component: Demo3
    }
  ]
});

export default router;