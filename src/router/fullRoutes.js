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
				children: [

				]
			},
			{
				path: 'games',
				name: 'games',
				component: () => import('@/views/origin/games'),
				children: [
					{
						path: 'snake',
						name: 'snake',
						component: () => import('@/views/origin/games/_snake'),
					},
				]
			}
		]
	},

];
