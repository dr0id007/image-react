import React from 'react'
import styles from './card.module.css'
import { Image } from 'antd'

export default class ImageCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = { spans: 0, render: false }
		this.imageRef = React.createRef()
		this.divRef = React.createRef()
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (this.state.render) {
	// 		console.log('false called...', this.props.index)
	// 		return false
	// 	} else {
	// 		return true
	// 	}
	// }

	// componentDidMount() {
	// 	if (this.imageRef.current) {
	// 		console.log('index', this.props.index)
	// 		this.imageRef.current.addEventListener('load', this.setSpans)
	// 	}
	// }

	// setSpans = () => {
	// 	if (this.imageRef.current) {
	// 		const height = this.imageRef.current.clientHeight
	// 		// this.divRef.current.style.height = height / 10
	// 		const spans = Math.ceil(height / 20)
	// 		console.log('span', spans)
	// 		this.setState({ spans: spans, render: true })
	// 	}
	// }

	render() {
		let url = `https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}.jpg`

		return (
			<div
			// ref={this.divRef}
			// style={{ gridRowEnd: `span ${this.state.spans}` }}
			>
				<button
					className={styles.btn}
					// onClick={() => this.props?.handlePreview({ src: url })}
				>
					<Image
						// ref={this.imageRef}
						className={`img`}
						src={url}
					/>
				</button>
			</div>
		)
	}
}
