import { createMemoryHistory, createRouter } from 'vue-router'

import login from '../views/login.vue'
import main from '../views/main.vue'

const routes = [
    { path: '/', component: login},
    { path: '/user/:id', component: main}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router