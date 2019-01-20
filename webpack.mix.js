const mix = require('laravel-mix');

mix
.js('src/js/text-revamp-client.js', 'dist/')
.sourceMaps();

mix.webpackConfig({
	output: {
		library: 'TextRevampClient',
		libraryTarget: 'umd',
		umdNamedDefine: true
	}
});