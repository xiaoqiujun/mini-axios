function dispatchRequest(config) {
	config.url = config.baseURL ? config.baseURL + config.url : config.url
	return new Promise((resolve, reject) => {
		if (!config.url) {
			throw new Error("[mini-axios] url地址不能为空")
		}
		wx.request({
			...config,
			success(response) {
				if (response.errMsg === 'request:ok') {
					resolve(response)
				}
			},
			fail(error) {
				reject(error)
			}
		})
	})
}

module.exports = dispatchRequest