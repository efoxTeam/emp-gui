import React from 'react'
import {Link} from 'react-router-dom'
import {TitleInfo, Theme} from 'src/types'
import './LogoBox.less'
const defaultTitleInfo: TitleInfo = {
  logo: 'https://setmefree.yy.com/Joyy.png',
  text: (
    <>
      EMP ANTD <span style={{fontSize: '12px'}}>by Efox</span>
    </>
  ),
}
const LogoBox = ({titleInfo}: {titleInfo?: TitleInfo}) => {
  titleInfo = titleInfo || defaultTitleInfo
  const Text: any = titleInfo?.text
  return (
    <>
      {titleInfo ? (
        <div
          className={`logo-box logo light`}
          style={{cursor: titleInfo?.link ? 'pointer' : 'default'}}
          onClick={() => {
            if (typeof titleInfo?.link === 'string') {
              window.location.href = titleInfo.link
            } else if (typeof titleInfo?.link === 'function') {
              titleInfo.link && titleInfo.link()
            }
          }}>
          {titleInfo.logo ? <img src={titleInfo.logo} alt="logo" /> : null}
          <div>{Text}</div>
        </div>
      ) : null}
    </>
  )
}

export default LogoBox
