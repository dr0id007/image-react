import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL
let key = process.env.REACT_APP_FLICKR_KEY
let cancelToken

export const getBulkImages = async ({ page }) => {
	if (typeof cancelToken != typeof undefined) {
		cancelToken.cancel('cancelling the token1..')
	}
	cancelToken = axios.CancelToken.source()

	return await axios.get(
		// `/?method=flickr.photos.getRecent&api_key=${key}&format=json&nojsoncallback=1&page=${page}&per_page=10&safe_search=3`,
		`/?method=flickr.photos.search&api_key=${key}&format=json&nojsoncallback=1&tags=Nature&page=${page}&per_page=10&safe_search=3`,
		{ cancelToken: cancelToken.token }
	)
}
export const searchImage = async ({ tags, page }) => {
	if (typeof cancelToken != typeof undefined) {
		cancelToken.cancel('cancelling the token2..')
	}
	cancelToken = axios.CancelToken.source()

	return await axios.get(
		`/?method=flickr.photos.search&api_key=${key}&format=json&nojsoncallback=1&tags=${tags}&page=${page}&per_page=10&safe_search=3`,
		{ cancelToken: cancelToken.token }
	)
}
