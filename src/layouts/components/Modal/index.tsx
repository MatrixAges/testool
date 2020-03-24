import React, { memo, useState, useEffect } from 'react'
import { useIntl, getLocale, setLocale } from 'umi'
import { Modal, Switch, Select } from 'antd'
import { PieChartOutlined, ImportOutlined, ExportOutlined, ClearOutlined } from '@ant-design/icons'
import store from 'store'
import styles from './index.less'

const { Option } = Select

interface IProps {
	groups: Array<string>
	visible: boolean
	onCancel: () => void
	onDeleteGroup: (group: string) => void
}

const Index = (props: IProps) => {
	const { groups, visible, onCancel, onDeleteGroup } = props
	const lang = useIntl()
	const [ state_modal_type, setStateModalType ] = useState('settings')
	const [ state_group_selected, setStateGroupSelected ] = useState('')

	useEffect(
		() => {
			setStateModalType('settings')
		},
		[ visible ]
	)

	const props_modal = {
		visible,
		onCancel,
		centered: true,
		maskClosable: true,
		destroyOnClose: true,
		title: lang.formatMessage({ id: 'layout.modal.title' })
	}

	const onChangeLang = (v: boolean): void => {
		if (v) {
			setLocale('en-US', false)
		} else {
			setLocale('zh-CN', false)
		}
	}

	const onChangeTheme = (v: boolean): void => {
		if (v) {
			store.set('theme', 'light')
		} else {
			store.set('theme', 'dark')
		}
	}

	const onChangeLoadway = (v: boolean): void => {
		if (v) {
			store.set('loadway', 'scroll')
		} else {
			store.set('loadway', 'page')
		}
	}

	const onChangeModalType = (type: string): void => {
		setStateModalType(type)
	}

	if (state_modal_type === 'settings') {
		return (
			<Modal className={styles._local} {...props_modal} footer={null}>
				<div className='option_items w_100 border_box flex'>
					<div
						className='option_item flex flex_column align_center cursor_point transition_normal'
						onClick={() => onChangeModalType('analysis')}
					>
						<PieChartOutlined style={{ fontSize: '24px' }} />
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_analysis'
							})}
						</span>
					</div>
					<div
						className='option_item flex flex_column align_center cursor_point transition_normal'
						onClick={() => onChangeModalType('import')}
					>
						<ImportOutlined style={{ fontSize: '24px' }} />
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_import'
							})}
						</span>
					</div>
					<div
						className='option_item flex flex_column align_center cursor_point transition_normal'
						onClick={() => onChangeModalType('export')}
					>
						<ExportOutlined style={{ fontSize: '24px' }} />
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_export'
							})}
						</span>
					</div>
					<div
						className='option_item flex flex_column align_center cursor_point transition_normal'
						onClick={() => onChangeModalType('clear')}
					>
						<ClearOutlined style={{ fontSize: '24px' }} />
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_clear'
							})}
						</span>
					</div>
				</div>
				<div className='setting_items w_100 border_box flex flex_column'>
					<div className='setting_item w_100 border_box flex justify_between align_center'>
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_language'
							})}
						</span>
						<Switch
							checkedChildren='en'
							unCheckedChildren='中'
							checked={getLocale() === 'en-US'}
							onClick={onChangeLang}
						/>
					</div>
					<div className='setting_item w_100 border_box flex justify_between align_center'>
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_theme'
							})}
						</span>
						<Switch
							checkedChildren={lang.formatMessage({
								id: 'layout.modal.theme_light'
							})}
							unCheckedChildren={lang.formatMessage({
								id: 'layout.modal.theme_dark'
							})}
							defaultChecked={store.get('theme') !== 'dark'}
							onChange={onChangeTheme}
						/>
					</div>
					<div className='setting_item w_100 border_box flex justify_between align_center'>
						<span className='name'>
							{lang.formatMessage({
								id: 'layout.modal.name_loadway'
							})}
						</span>
						<Switch
							checkedChildren={lang.formatMessage({
								id: 'layout.modal.loadway_scroll'
							})}
							unCheckedChildren={lang.formatMessage({
								id: 'layout.modal.loadway_page'
							})}
							defaultChecked={store.get('loadway') !== 'page'}
							onChange={onChangeLoadway}
						/>
					</div>
				</div>
			</Modal>
		)
	}

	if (state_modal_type === 'clear') {
		return (
			<Modal
                        className={styles._local}
				{...props_modal}
				width='360px'
				title={lang.formatMessage({
					id: 'layout.modal.name_clear'
				})}
				onOk={() => onDeleteGroup(state_group_selected)}
			>
				<div className='clear_wrap w_100 border_box'>
					<Select
						className='w_100'
						placeholder={lang.formatMessage({
							id: 'layout.modal.clear.select.placeholder'
						})}
						onChange={(v) => {
							setStateGroupSelected(String(v))
						}}
					>
						{groups.map((item) => (
							<Option value={item} key={item}>
								{item}
							</Option>
						))}
					</Select>
				</div>
			</Modal>
		)
	}
}

export default memo(Index)
