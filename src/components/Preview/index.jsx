import React from 'react'
import styles from './preview.module.css'
import { Modal } from 'antd'

const Preview = ({ src, alt, handleClose }) => {
	return (
		<>
			<Modal visible={true} closable={true} footer={null} onCancel={handleClose}>
				<img style={{ minWidth: '150px' }} src={src} alt={alt} />
			</Modal>
		</>
	)
}

export default Preview
