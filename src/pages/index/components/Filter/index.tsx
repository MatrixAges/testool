import React, { memo } from 'react'
import { useIntl } from 'umi'
import { Select, Button, Form } from 'antd'
import styles from './index.less'

const { Option } = Select
const { useForm, Item } = Form

interface IParams {
	times?: number
	rate?: number
}

interface IProps {
	queryQa: (params: IParams) => void
	reset: () => void
}

const Index = (props: IProps) => {
	const { queryQa, reset } = props
	const [ form ] = useForm()
	const { resetFields, submit } = form
	const lang = useIntl()

	const onFinish = ({ times, rate }) => {
		if (!times && !rate) return

		queryQa({ times, rate })
	}

	return (
		<Form
			className={`${styles._local} filter_items w_100 border_box flex justify_between`}
			name='filter_form'
			form={form}
			onFinish={onFinish}
		>
			<div className='filter_items w_100 border_box flex'>
				<div className='filter_item mr_12'>
					<Item name='times'>
						<Select
							className='select_filter'
							placeholder={lang.formatMessage({
								id: 'index.filter.times.placeholder'
							})}
						>
							<Option value={4} key='4'>
								{lang.formatMessage({ id: 'index.filter.below' })} 4{' '}
								{lang.formatMessage({ id: 'index.filter.times' })}
							</Option>
							<Option value={16} key='10'>
								{lang.formatMessage({
									id: 'index.filter.below'
								})}{' '}
								10{' '}
								{lang.formatMessage({ id: 'index.filter.times' })}
							</Option>
							<Option value={16} key='16'>
								{lang.formatMessage({
									id: 'index.filter.below'
								})}{' '}
								16{' '}
								{lang.formatMessage({ id: 'index.filter.times' })}
							</Option>
						</Select>
					</Item>
				</div>
				<div className='filter_item mr_12'>
					<Item name='rate'>
						<Select
							className='select_filter'
							placeholder={lang.formatMessage({
								id: 'index.filter.rate.placeholder'
							})}
						>
							<Option value={4} key='4'>
								{lang.formatMessage({ id: 'index.filter.below' })} 4
							</Option>
							<Option value={3} key='3'>
								{lang.formatMessage({ id: 'index.filter.below' })} 3
							</Option>
							<Option value={2} key='2'>
								{lang.formatMessage({ id: 'index.filter.below' })} 2
							</Option>
						</Select>
					</Item>
				</div>
			</div>
			<div className='option_items flex'>
				<Button
					className='mr_12'
					onClick={() => {
						reset()
						resetFields()
					}}
				>
					{lang.formatMessage({ id: 'index.filter.reset' })}
				</Button>
				<Button type='primary' onClick={submit}>
					{lang.formatMessage({ id: 'index.filter.search' })}
				</Button>
			</div>
		</Form>
	)
}

export default memo(Index)
