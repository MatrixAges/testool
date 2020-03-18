import React, { memo } from 'react'
import { Button } from 'antd'
import { FileSyncOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

const Index = (props: any) => {
	return (
		<div className={`${styles._local} w_100 flex align_center justify_between`}>
			<span className='name'>webpack</span>
			<div className='right'>
				<Button className='mr_12' icon={<FileSyncOutlined />} />
				<Button className='mr_12' icon={<FilterOutlined />} />
				<Button icon={<PlusOutlined />} />
			</div>
		</div>
	)
}

export default memo(Index)
