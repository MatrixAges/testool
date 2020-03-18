import React, { memo } from 'react'
import styles from './index.less'

const Index = () => {
	return (
		<div
			className={`${styles._local} h_100vh w_100vw flex flex_column justify_center align_center`}
		>
			<div className='inner' />
			<div className='text'>loading</div>
		</div>
	)
}

export default memo(Index)
