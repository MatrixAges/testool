import React, { memo, useState, useEffect } from 'react'
import { useIntl } from 'umi'
import { Modal, Select, Input, Button, Form, Tag, message } from 'antd'
import { CheckOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { IQas } from '@/db/models/Qas'
import styles from './index.less'

const { Option } = Select
const { TextArea } = Input
const { confirm } = Modal
const { useForm, Item } = Form

interface IProps {
	title: string
	groups: Array<string>
	current_group: string
	current_item: IQas
	visible: boolean
	modal_type: string
	onCancel: () => void
	onAddGroup: (name: string) => void
	onChangeCurrentGroup: (v: string) => void
	onAddQa: (params: IQas) => void
	onDelQa: () => void
	onPutQa: (params: IQas) => void
}

const Index = (props: IProps) => {
	const {
		title,
		groups,
		current_group,
		current_item,
		visible,
		modal_type,
		onCancel,
		onAddGroup,
		onChangeCurrentGroup,
		onAddQa,
		onDelQa,
		onPutQa
	} = props
	const lang = useIntl()
	const [ form ] = useForm()
	const { validateFields, setFieldsValue } = form

	const [ state_tags, setStateTags ] = useState([])
	const [ state_tags_input, setStateTagsInput ] = useState('')
	const [ state_group_input, setStateGroupInput ] = useState('')
	const [ state_tags_input_visible, setStateTagsInputVisible ] = useState(false)

	useEffect(
		() => {
			if (modal_type === 'rate_log') return

			if (current_item.tags) {
				setStateTags(current_item.tags)

				setFieldsValue({
					question: current_item.question,
					answer: current_item.answer
				})
			}
		},
		[ current_item ]
	)

	useEffect(() => {
		if (modal_type) {
			setStateTags(current_item.tags)
		}
	}, [])

	const delTag = (tag: string) => {
		setStateTags(state_tags.filter((item) => item !== tag))
	}

	const onComfirmAddTag = () => {
		setStateTagsInput('')
		setStateTagsInputVisible(false)

		if (state_tags.length > 4) {
			message.warn(lang.formatMessage({ id: 'index.modal.add_qa.tags.count.warn' }))

			return
		}

		if (state_tags_input.length > 12) {
			message.warn(lang.formatMessage({ id: 'index.modal.add_qa.tags.length.warn' }))

			return
		}

		if (state_tags_input && state_tags.indexOf(state_tags_input) === -1) {
			setStateTags([ ...state_tags, state_tags_input ])
		}
	}

	const props_modal = {
		title,
		visible,
		centered: true,
		maskClosable: true,
		destroyOnClose: true,
		onCancel () {
			setStateTags([])

			if (modal_type === 'edit_qa') {
				setFieldsValue({
					question: null,
					answer: null
				})
			}

			onCancel()
		}
	}

	const onOk = async () => {
		const { question, answer } = await validateFields()

		if (modal_type === 'add_qa') {
			onAddQa({
				question,
				answer,
				tags: state_tags
			})
		}

		if (modal_type === 'edit_qa') {
			onPutQa({
				question,
				answer,
				tags: state_tags
			})
		}
	}

	const onDelete = () => {
		confirm({
			centered: true,
			title: lang.formatMessage({ id: 'common.confirm' }),
			content: lang.formatMessage({ id: 'index.modal.edit_qa.delete.confirm' }),
			onOk () {
				onDelQa()
			}
		})
	}

	let _footer: object = {}

	if (modal_type === 'edit_qa') {
		_footer = {
			footer: (
				<div className='w_100 flex justify_between'>
					<Button type='danger' icon={<DeleteOutlined />} onClick={onDelete}>
						{lang.formatMessage({ id: 'common.btn_delete' })}
					</Button>
					<div className='right'>
						<Button onClick={onCancel}>
							{lang.formatMessage({ id: 'common.btn_cancel' })}
						</Button>
						<Button type='primary' onClick={onOk}>
							{lang.formatMessage({ id: 'common.btn_ok' })}
						</Button>
					</div>
				</div>
			)
		}
	}
	if (modal_type === 'add_group') {
		return (
			<Modal className={styles._local} {...props_modal} width='360px' footer={null}>
				<Select
					style={{ width: '100%' }}
					placeholder={lang.formatMessage({
						id: 'index.modal.add_group.placeholder'
					})}
					dropdownRender={(options) => (
						<div className='w_100 border_box flex flex_column'>
							{options}
							<div className='w_100 border_box flex border_box p_10'>
								<Input
									onChange={(e) => {
										setStateGroupInput(e.target.value)
									}}
								/>
								<Button
									className='ml_12'
									icon={<CheckOutlined />}
									onClick={() => {
										if (state_group_input) {
											onAddGroup(state_group_input)
										}
									}}
								/>
							</div>
						</div>
					)}
					defaultValue={current_group}
					onChange={onChangeCurrentGroup}
				>
					{groups.map((item) => (
						<Option value={item} key={item}>
							{item}
						</Option>
					))}
				</Select>
			</Modal>
		)
	}

	if (modal_type === 'rate_log') {
		return (
			<Modal className={styles._local} {...props_modal} footer={null}>
				<ResponsiveContainer width='100%' height={120}>
					<LineChart data={current_item.rates}>
						<XAxis
							hide
							dataKey={(item) => new Date(item.create_at).toISOString()}
						/>
						<YAxis dataKey='rate' domain={[ 0, 5 ]} hide />
						<Tooltip />
						<Line dataKey='rate' type='monotone' stroke='#000' />
					</LineChart>
				</ResponsiveContainer>
			</Modal>
		)
	}

	if (modal_type === 'add_qa' || modal_type === 'edit_qa') {
		return (
			<Modal
				className={styles._local}
				{...props_modal}
				{..._footer}
				onOk={onOk}
				getContainer={false}
			>
				<Form name='qa_form' form={form}>
					<Item
						name='question'
						rules={[
							{
								required: true,
								message: lang.formatMessage({
									id: 'index.modal.add_qa.question.placeholder'
								})
							}
						]}
					>
						<Input
							placeholder={lang.formatMessage({
								id: 'index.modal.add_qa.question.placeholder'
							})}
						/>
					</Item>
					<Item
						name='answer'
						rules={[
							{
								required: true,
								message: lang.formatMessage({
									id: 'index.modal.add_qa.answer.placeholder'
								})
							}
						]}
					>
						<TextArea
							className='answer'
							allowClear
							placeholder={lang.formatMessage({
								id: 'index.modal.add_qa.answer.placeholder'
							})}
						/>
					</Item>
					{state_tags && (
						<div className='flex flex_wrap'>
							{state_tags.map((tag) => (
								<Tag key={tag} closable onClose={() => delTag(tag)}>
									{tag}
								</Tag>
							))}
							{state_tags_input_visible && (
								<Input
									type='text'
									size='small'
									style={{ width: '100px' }}
									value={state_tags_input}
									onChange={(e) => {
										setStateTagsInput(e.target.value)
									}}
									onBlur={onComfirmAddTag}
									onPressEnter={onComfirmAddTag}
								/>
							)}
							{!state_tags_input_visible && (
								<Button
									size='small'
									icon={<PlusOutlined />}
									onClick={() => {
										setStateTagsInputVisible(true)
									}}
								/>
							)}
						</div>
					)}
				</Form>
			</Modal>
		)
	}
}

export default memo(Index)
