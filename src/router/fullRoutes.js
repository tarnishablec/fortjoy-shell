export default [
	{
		path: '/',
		name: 'Origin',
		component: () => import('@/views/origin'),
		children: [
			{
				path: 'blog',
				name: 'Blog',
				component: () => import('@/views/origin/blog/index'),
				children: []
			}
		]
	},

];
