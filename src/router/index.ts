import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloView from '@/views/HelloView.vue'
import AboutView from '@/views/AboutView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
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
		
	],
});

export default router
