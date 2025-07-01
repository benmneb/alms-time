module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,ico,webp,png,html,json}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^source/
	]
};