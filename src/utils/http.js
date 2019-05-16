import baseUrl from './config.js'
class http{
	post (params,url) {
	
		uni.request({
			url: baseUrl+url,
			method:POST,
			data: params,
			dataType:json,
			success: (res) => {
				return res
			},
			erroe: () => {
				
			}
	});
	}
	get (params,url) {
		uni.request({
			url: baseUrl+url,
			data: params,
			dataType:json,
			success: (res) => {
				return res
			},
			erroe: () => {
				
			}
	});
}
}
module.exports = http