import React from 'react'
import { Image } from 'antd'
import styles from './card.module.css'

const Card = ({ data }) => {
	const { farm: farmId, server: serverId, id, secret } = data

	return (
		<div className={styles.card}>
			<Image
				className={styles.img}
				src={`https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`}
			/>
		</div>
	)
}

export default Card
