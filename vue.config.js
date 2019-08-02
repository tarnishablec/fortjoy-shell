const resolve = dir => require('path').join(__dirname, dir);

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		? '/fortjoy-shell/'
		: '/',
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
	},

	devServer: {
		port: 8521,

	},
	runtimeCompiler: true
};
