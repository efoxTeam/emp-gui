import marked from 'marked'
import hljs from 'highlight.js'
import style from './markdown-box.module.scss'
import React from 'react'
import {Card} from 'antd'
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code: string) => {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  // tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})
const MarkdownBox = ({md}: {md: string}) => {
  return (
    // <Card>
    <pre className={style['markdown-box']} dangerouslySetInnerHTML={{__html: marked(md)}} />
    // </Card>
  )
}
export default MarkdownBox
