import React, { memo } from 'react'
import styles from './index.less'

interface IProps {
	type?: 'main' | 'white'
	size?: number
}

const Index = (props: IProps) => {
	const { type = 'main', size = 1.6 } = props

	return (
		<div
			className={`${styles._local} ${styles[type]} border_box flex align_center`}
			style={{ fontSize: size + 'px' }}
		>
			<div className='left flex flex_column align_center justify_center'>
				<div className='line_item' />
				<div className='line_item' />
				<div className='line_item' />
			</div>
			<div className='center' />
			<div className='right flex flex_column align_center justify_center'>
				<div className='line_item' />
				<div className='line_item' />
				<div className='line_item' />
			</div>
		</div>
	)
}

export default memo(Index)
