import {Spin} from 'antd'
import React from 'react'
import './LoadingCompStyle.less'

type TLoadingComp = {
  fullScreen?: boolean
}

const LoadingComp = (props: TLoadingComp) => {
  const {fullScreen} = props || {}

  return (
    <div className={`loadingComp ${fullScreen && 'fullScreen'}`}>
      <Spin />
    </div>
  )
}
export default LoadingComp
