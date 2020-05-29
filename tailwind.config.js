module.exports = {
	purge: [
		"./layouts/**/*.html"
	],
	theme: {
		extend: {
			transitionProperty: {
				"width": "width"
			},
			screens: {
				"xs": "480px"
			}
		}
	}
}
