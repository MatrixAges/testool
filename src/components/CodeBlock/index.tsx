import React, { memo } from 'react'
import { connect } from 'umi'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism, atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface IProps {
	language?: string
	value: string
	theme: any
}

const Index = (props: IProps) => {
	const { language, value, theme } = props

	return (
		<SyntaxHighlighter language={language} style={theme === 'dark' ? atomDark : prism}>
			{value}
		</SyntaxHighlighter>
	)
}

export default memo(connect(({ app: { theme } }: any) => ({ theme }))(Index))
