import React from 'react'
import Loader from 'react-loader-spinner'

const Loading = () => {
	return (
		<section className='bg-white' style={{ height: '100vh', width: '100%' }}>
			<Loader
				// style={{ position: 'absolute', top: '50%', left: '50%' }}
				style={{ textAlign: 'center' }}
				type='TailSpin'
				color='#1a1a1a'
				height={50}
				width={50}
			/>
		</section>
	)
}

export default Loading
