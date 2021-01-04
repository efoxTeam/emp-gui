import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs'

const CodeBox = ({code}: {code: string}) => {
  return (
    <SyntaxHighlighter language={'jsx'} style={docco}>
      {code}
    </SyntaxHighlighter>
  )
}
export default CodeBox
