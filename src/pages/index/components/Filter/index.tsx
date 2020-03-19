import React, { memo } from 'react'
import { useIntl } from 'umi'
import { Select } from 'antd'
import styles from './index.less'

const { Option } = Select

const Index = () => {
	const lang = useIntl()

	return (
		<div className={`${styles._local} filter_items w_100 border_box flex`}>
			<div className='filter_item mr_12'>
				<Select
					placeholder={lang.formatMessage({
						id: 'index.filter.times.placeholder'
					})}
					style={{ width: '160px' }}
				>
					<Option value='1-4' key='1-4'>
						1 - 4 {lang.formatMessage({ id: 'index.filter.times' })}
					</Option>
					<Option value='4-8' key='4-8'>
						4 - 8 {lang.formatMessage({ id: 'index.filter.times' })}
					</Option>
					<Option value='9-12' key='9-12'>
						9 - 12 {lang.formatMessage({ id: 'index.filter.times' })}
					</Option>
				</Select>
			</div>
			<div className='filter_item mr_12'>
				<Select
					placeholder={lang.formatMessage({
						id: 'index.filter.rate.placeholder'
					})}
					style={{ width: '160px' }}
				>
					<Option value='1-4' key='1-4'>
						{lang.formatMessage({ id: 'index.filter.rate.below' })} 4
					</Option>
					<Option value='4-8' key='4-8'>
						{lang.formatMessage({ id: 'index.filter.rate.below' })} 3
					</Option>
					<Option value='9-12' key='9-12'>
						{lang.formatMessage({ id: 'index.filter.rate.below' })} 2
					</Option>
				</Select>
			</div>
		</div>
	)
}

export default memo(Index)
