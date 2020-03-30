import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface IProps {
	language?: string
	value: string
}

const Index = (props: IProps) => {
	const { language, value } = props

	return (
		<SyntaxHighlighter language={language} style={prism}>
			{value}
		</SyntaxHighlighter>
	)
}

export default Index
