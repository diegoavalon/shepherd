module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
	],
	env: {
		browser: true
	},
	rules: {
		'complexity': ['warn', 6],
		'max-lines': ['warn', {
			max: 250,
			skipBlankLines: true,
			skipComments: true
		}],
		'no-console': 'off'
	},
	overrides: [
		// node files
		{
			files: [
				'gulpfile.js',
				'karma.conf.js'
			],
			parserOptions: {
				sourceType: 'script',
				ecmaVersion: 2015
			},
			env: {
				browser: false,
				node: true
			}
		}
	]
};