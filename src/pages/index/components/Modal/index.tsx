import React, { memo, useState } from 'react'
import { useIntl } from 'umi'
import { Modal, Select, Input, Button, Form, Tag, message } from 'antd'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.less'

const { Option } = Select
const { TextArea } = Input
const { useForm, Item } = Form

interface IProps {
	title: string
	groups: Array<string>
	current_group: string
	visible: boolean
	modal_type: string
	onOk: () => void
	onCancel: () => void
	onAddGroup: (name: string) => void
	onChangeCurrentGroup: (v: string) => void
}

const Index = (props: IProps) => {
	const {
		title,
		groups,
		current_group,
		visible,
		modal_type,
		onOk,
		onCancel,
		onAddGroup,
		onChangeCurrentGroup
	} = props
	const lang = useIntl()
	const [ form ] = useForm()

	const [ state_tags, setStateTags ] = useState([])
	const [ state_tags_input, setStateTagsInput ] = useState('')
	const [ state_tags_input_visible, setStateTagsInputVisible ] = useState(false)

	const delTag = (tag) => {
		setStateTags(state_tags.filter((item) => item !== tag))
	}

	const onComfirmAddTag = () => {
		setStateTagsInput('')
		setStateTagsInputVisible(false)

		if (state_tags.length > 5) {
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

	const [ state_group_input, setStateGroupInput ] = useState('')

	const props_modal = {
		title,
		visible,
		onOk,
		onCancel,
		centered: true,
		maskClosable: true,
		destroyOnClose: true
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

	if (modal_type === 'add_qa') {
		return (
			<Modal className={styles._local} {...props_modal}>
				<Form form={form}>
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
				</Form>
			</Modal>
		)
	}
}

export default memo(Index)
