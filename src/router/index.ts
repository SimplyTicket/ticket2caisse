import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloView from '@/views/HelloView.vue'
import AboutView from '@/views/AboutView.vue';
import BattleView from '@/views/BattleView.vue';

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/hello",
			name: "Hello",
			component: HelloView,
		},
		{
			path: "/about",
			name: "About",
			component: AboutView,
		},
				{
			path: "/battle",
			name: "Battle",
			component: BattleView,
		},
	],
});

export default router
