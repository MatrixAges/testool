import React, { memo } from 'react'
import { useIntl, getLocale, setLocale } from 'umi'
import { Modal, Switch } from 'antd'
import { PieChartOutlined, ImportOutlined, ExportOutlined, ClearOutlined } from '@ant-design/icons'
import store from 'store'
import styles from './index.less'

interface IProps {
	visible: boolean
	onCancel: () => void
}

const Index = (props: IProps) => {
	const { visible, onCancel } = props
	const lang = useIntl()

	const props_modal = {
		visible,
		onCancel,
		footer: null,
		centered: true,
		maskClosable: true,
		destroyOnClose: true,
		title: lang.formatMessage({ id: 'layout.modal.title' })
	}

	const onChangeLang = (v) => {
		if (v) {
			setLocale('en-US', false)
		} else {
			setLocale('zh-CN', false)
		}
	}

	const onChangeTheme = (v) => {
		if (v) {
			store.set('theme', 'light')
		} else {
			store.set('theme', 'dark')
		}
	}

	const onChangeLoadway = (v) => {
		if (v) {
			store.set('loadway', 'scroll')
		} else {
			store.set('loadway', 'page')
		}
	}

	return (
		<Modal className={styles._local} {...props_modal}>
			<div className='option_items w_100 border_box flex'>
				<div className='option_item flex flex_column align_center cursor_point transition_normal'>
					<PieChartOutlined style={{ fontSize: '24px' }} />
					<span className='name'>
						{lang.formatMessage({
							id: 'layout.modal.name_analysis'
						})}
					</span>
				</div>
				<div className='option_item flex flex_column align_center cursor_point transition_normal'>
					<ImportOutlined style={{ fontSize: '24px' }} />
					<span className='name'>
						{lang.formatMessage({
							id: 'layout.modal.name_import'
						})}
					</span>
				</div>
				<div className='option_item flex flex_column align_center cursor_point transition_normal'>
					<ExportOutlined style={{ fontSize: '24px' }} />
					<span className='name'>
						{lang.formatMessage({
							id: 'layout.modal.name_export'
						})}
					</span>
				</div>
				<div className='option_item flex flex_column align_center cursor_point transition_normal'>
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
						{lang.formatMessage({ id: 'layout.modal.name_language' })}
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
						{lang.formatMessage({ id: 'layout.modal.name_theme' })}
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
						{lang.formatMessage({ id: 'layout.modal.name_loadway' })}
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

export default memo(Index)
