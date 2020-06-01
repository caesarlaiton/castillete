module.exports = {
	purge: {
    content: ["./layouts/**/*.html"],
    options: {
      whitelist: ["overflow-y-hidden"]
    }
  },
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
