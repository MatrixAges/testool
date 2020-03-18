import React, { memo } from 'react'
import { connect } from 'umi'
import { Modal, Select } from 'antd'
import styles from './index.less'

const { Option } = Select

interface IProps {
	group: any
	visible: boolean
	onOk: () => void
	onCancel: () => void
	modal_type: string
}

const Index = (props: IProps) => {
	const { group, visible, onOk, onCancel, modal_type } = props

	const props_modal = {
		visible,
		onOk,
		onCancel,
		footer: null,
		centered: true,
		maskClosable: true,
		destroyOnClose: true
	}

	if (modal_type === 'group') {
		return (
			<Modal className={styles._local} {...props_modal}>
				<Select style={{ width: 200 }}>
					{group.map((item) => (
						<Option value={item.name} key={item.name}>
							{item.name}
						</Option>
					))}
				</Select>
			</Modal>
		)
	}
}

export default memo(Index)
