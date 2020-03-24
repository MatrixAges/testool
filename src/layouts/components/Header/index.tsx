import React, { memo, Fragment, useState, useEffect } from 'react'
import { connect, useIntl } from 'umi'
import { Input } from 'antd'
import { SearchOutlined, SettingOutlined } from '@ant-design/icons'
import Logo from '../Logo'
import Modal from '../Modal'
import styles from './index.less'

const Index = (props: any) => {
	const { dispatch, app: { groups } } = props
	const [ state_scrolled, setStateScrolled ] = useState(false)
	const [ state_modal_visible, setStateModalVisible ] = useState(false)
	const lang = useIntl()

	useEffect(() => {
		const setScrolled = (e) => {
			if (e.srcElement['documentElement'].scrollTop) {
				setStateScrolled(true)
			} else {
				setStateScrolled(false)
			}
		}

		window.addEventListener('scroll', setScrolled)

		return () => {
			window.removeEventListener('scroll', setScrolled)
		}
	}, [])

	const onDeleteGroup = (group: string) => {
		dispatch({
			type: 'app/deleteGroup',
			payload: {
				group,
				message_success: lang.formatMessage({
					id: 'layout.modal.clear.message_success'
				}),
				message_failed: lang.formatMessage({
					id: 'layout.modal.clear.message_failed'
				})
			}
		})

		setStateModalVisible(false)
	}

	return (
		<Fragment>
			<div
				className={`
                              ${styles._local} 
                              ${state_scrolled ? styles.scrolled : ''} 
                              fixed w_100vw border_box flex justify_between align_center transition_normal
                        `}
			>
				<div className='left flex align_center'>
					<Logo type='white' size={1} />
				</div>
				<Input
					placeholder={lang.formatMessage({ id: 'header.search.placeholder' })}
					prefix={<SearchOutlined style={{ color: 'white' }} />}
					allowClear={true}
					maxLength={36}
					size='large'
					style={{
						width: '680px',
						border: 'none'
					}}
				/>
				<div className='right flex align_center'>
					<div
						className='icon_wrap cursor_point flex justify_center align_center transition_normal'
						onClick={() => {
							setStateModalVisible(true)
						}}
					>
						<SettingOutlined style={{ fontSize: '20px' }} />
					</div>
				</div>
			</div>
			<div className={styles.placeholder} />
			<Modal
				groups={groups}
				visible={state_modal_visible}
				onCancel={() => {
					setStateModalVisible(false)
				}}
				onDeleteGroup={onDeleteGroup}
			/>
		</Fragment>
	)
}

export default memo(connect(({ app }: any) => ({ app }))(Index))
