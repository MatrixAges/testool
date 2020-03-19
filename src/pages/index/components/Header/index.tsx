import React, { memo } from 'react'
import { useIntl } from 'umi'
import { Button, Tooltip } from 'antd'
import { RedoOutlined, FileSyncOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

interface IProps {
	name: string
	onClearGroup: () => void
	onAddGroup: () => void
	onFilter: () => void
	onAddQa: () => void
}

const Index = (props: IProps) => {
	const { name, onClearGroup, onAddGroup, onFilter, onAddQa } = props
	const lang = useIntl()

	return (
		<div className={`${styles._local} w_100 flex align_center justify_between`}>
			<span className='name'>{name}</span>
			<div className='right'>
				<Tooltip
					title={lang.formatMessage({ id: 'index.header.tooltip.clear_group' })}
				>
					<Button
						className='mr_12'
						icon={<RedoOutlined />}
						onClick={onClearGroup}
					/>
				</Tooltip>
				<Tooltip title={lang.formatMessage({ id: 'index.header.tooltip.group' })}>
					<Button
						className='mr_12'
						icon={<FileSyncOutlined />}
						onClick={onAddGroup}
					/>
				</Tooltip>
				<Tooltip title={lang.formatMessage({ id: 'index.header.tooltip.filter' })}>
					<Button
						className='mr_12'
						icon={<FilterOutlined />}
						onClick={onFilter}
					/>
				</Tooltip>
				<Tooltip title={lang.formatMessage({ id: 'index.header.tooltip.add_qa' })}>
					<Button icon={<PlusOutlined />} onClick={onAddQa} />
				</Tooltip>
			</div>
		</div>
	)
}

export default memo(Index)
