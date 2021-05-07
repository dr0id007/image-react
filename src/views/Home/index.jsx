import React, { useState, useEffect, useRef } from 'react'
import Card from '../../components/Card'
import Search from '../../components/Search'
import {
	getBulkImages,
	searchImage as searchImageApi,
	getImageSize as getImageSizeApi
} from '../../api/images'
import Loader from '../../components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import { addLocalStorage } from '../../utils/helpers'
import './home.css'
import ImagePreview from '../../components/Preview'

const Home = (props) => {
	const [search, setSearch] = useState('')
	const [imagesList, setImagesList] = useState([])
	const [notfound, setNotFound] = useState(false)
	const [preview, setPreview] = useState(false)
	const [previewImage, setPreviewImage] = useState(false)
	const [page, setPage] = useState(1)
	let defaultValue = 'nature'
	const didMount = useRef(false)

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

	var timer = null

	useEffect(() => {
		if (!didMount.current) {
			didMount.current = true
		} else {
			clearTimeout(timer)
			timer = setTimeout(() => searchImage(), 1000)
			// searchImage()
		}
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

	const handlePreview = ({ src }) => {
		setPreviewImage(src)
		setPreview(true)
	}

	const handleClose = () => {
		setPreview(false)
	}

	return (
		<>
			{preview ? <ImagePreview src={previewImage} handleClose={handleClose} /> : null}

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
						<div className='image-grid' style={{ marginTop: '30px' }}>
							{imagesList.map((image, index) => {
								const { farm, server, id, secret } = image
								return (
									<Card
										index={index}
										key={index}
										farm={farm}
										server={server}
										id={id}
										secret={secret}
										handlePreview={handlePreview}
										updateLimit={imagesList.length - 9}
									/>
								)
							})}
						</div>
					</InfiniteScroll>
				)}
			</div>
		</>
	)
}

export default Home
