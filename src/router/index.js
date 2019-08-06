import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

Vue.use(Router);


function initRouter() {
	return new Router({
		routes: store.state.router.routes,
	})
}

const router = initRouter();


function cleanRouter() {
	router.matcher = new Router({}).matcher;
}

export function updateRouter(routes) {
	cleanRouter();
	router.addRoutes(routes);
	return router;
}

router.beforeEach(((to, from, next) => {
	if (to.matched.length > 0) {
		next();
	} else {
		next(from);
	}
}));

export default router;
