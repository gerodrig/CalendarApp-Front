module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}'
	],
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ], //commented due to an error
	swDest: 'build/sw.js',
	swSrc: 'src/sw-template.js', //generateSW doesnt work with this property
};