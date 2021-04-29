import React, { useState, useEffect } from 'react'
import Card from '../../components/Card'
import Search from '../../components/Search'
import { getBulkImages, searchImage as searchImageApi } from '../../api/images'
import Loader from '../../components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { addLocalStorage } from '../../utils/helpers'
import './home.css'

const Home = (props) => {
	const [search, setSearch] = useState('')
	const [imagesList, setImagesList] = useState([])
	const [notfound, setNotFound] = useState(false)
	const [page, setPage] = useState(1)
	let defaultValue = 'nature'

	const saveSearchHistory = (value) => {
		addLocalStorage(value)
	}

	const fetchData = async () => {
		const res = await getBulkImages({ page })
		if (res.data) {
			setImagesList(res.data.photos.photo)
			setPage(1)
			setNotFound(false)
		} else {
			setNotFound(true)
		}
	}

	const searchImage = async () => {
		setImagesList([])
		if (search === '') {
			fetchData()
		} else {
			const res = await searchImageApi({ tags: search, page })
			if (res.data) {
				if (res?.data?.photos?.photo.length > 0) {
					setImagesList(res.data.photos.photo)
					// save on local storage.
					saveSearchHistory(search)
					setPage(1)
					setNotFound(false)
				} else {
					setNotFound(true)
				}
			}
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		searchImage()
	}, [search])

	const showMoreResults = async () => {
		let s = search !== '' ? search : defaultValue
		const res = await searchImageApi({ tags: s, page })
		if (res.data) {
			setImagesList(res.data.photos.photo)
			const newList = imagesList.concat(res.data.photos.photo)
			setImagesList(newList)
			setPage(page + 1)
			setNotFound(false)
		} else {
			setNotFound(true)
		}
	}

	return (
		<>
			<div className='top-banner'>
				<Search setSearch={setSearch} />
			</div>
			<div className='container'>
				{notfound ? (
					<h4>No results Found</h4>
				) : (
					<InfiniteScroll
						dataLength={imagesList.length}
						next={showMoreResults}
						hasMore={true}
						loader={
							<h4>
								<Loader />
							</h4>
						}
					>
						<div className='cardlist'>
							{imagesList.map((image, index) => {
								return <Card key={index} data={image} />
							})}
						</div>
					</InfiniteScroll>
				)}
			</div>
		</>
	)
}

export default Home
