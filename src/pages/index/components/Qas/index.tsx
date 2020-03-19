import React, { memo, useState } from 'react'
import { useIntl } from 'umi'
import { Tag, Rate, Button, Empty } from 'antd'
import {
	CheckOutlined,
	StarOutlined,
	EditOutlined,
	UpCircleOutlined,
	DownCircleOutlined,
	CheckCircleOutlined,
	PlusOutlined
} from '@ant-design/icons'
import styles from './index.less'

const Qa = () => {
	const [ state_answer_visible, setStateAnswerVisible ] = useState(false)
	const lang = useIntl()

	return (
		<div className={`${styles.qa_item} w_100 border_box flex flex_column`}>
			<div className='question w_100 border_box flex flex_column'>
				<div className='q_head q_item w_100 border_box flex justify_between'>
					<div className='left flex align_center'>
						<div className='head_item flex align_center mr_16'>
							<CheckOutlined />
							<span className='text ml_4'>8</span>
						</div>
						<div className='head_item flex align_center'>
							<StarOutlined />
							<span className='text ml_4'>3.5</span>
						</div>
					</div>
					<div className='right flex align_center'>
						<div className='icon_wrap flex justify_center align_center transition_normal cursor_point'>
							<EditOutlined />
						</div>
					</div>
				</div>
				<div className='q_body q_item w_100 border_box text_justify'>
					react 生命周期中，在新版本有些将被废弃，也新增了一些生命周期，讲一下？ react
					生命周期中，在新版本有些将被废弃，也新增了一些生命周期，讲一下？ react
					生命周期中，在新版本有些将被废弃，也新增了一些生命周期，讲一下？
				</div>
				<div className='q_foot q_item w_100 border_box flex justify_between align_center'>
					<div className='tags flex'>
						<Tag style={{ fontSize: '10px' }}>react</Tag>
						<Tag style={{ fontSize: '10px' }}>生命周期</Tag>
					</div>
					{state_answer_visible ? (
						<div
							className='icon_wrap flex justify_center align_center transition_normal cursor_point'
							onClick={() => {
								setStateAnswerVisible(false)
							}}
						>
							<DownCircleOutlined />
						</div>
					) : (
						<div
							className='icon_wrap flex justify_center align_center transition_normal cursor_point'
							onClick={() => {
								setStateAnswerVisible(true)
							}}
						>
							<UpCircleOutlined />
						</div>
					)}
				</div>
			</div>
			{state_answer_visible && (
				<div className='answer w_100 border_box flex flex_column'>
					<div className='content w_100 border_box text_justify'>132123</div>
					<div className='a_foot w_100 border_box flex justify_between align_center'>
						<div className='left'>
							<Rate allowHalf defaultValue={2.5} />
						</div>
						<Button type='primary' icon={<CheckCircleOutlined />}>
							{lang.formatMessage({ id: 'index.btn_pass' })}
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

const Index = () => {
	const lang = useIntl()

	return (
		<div className={`${styles._local} w_100`}>
			<div className='qa_items w_100 border_box flex flex_column'>
				<div className='empty_wrap flex flex_column justify_center align_center'>
					<Empty description={false} />
					<Button className='mt_12' type='primary' icon={<PlusOutlined />}>
						{lang.formatMessage({ id: 'index.btn_add' })}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default memo(Index)
