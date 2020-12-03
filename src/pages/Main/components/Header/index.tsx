import React from 'react'
import style from './index.module.scss'

const Header = ({rightProps}: {rightProps?: () => any}) => {
  return (
    <header className={style.Header}>
      <div className={style.Header_EmptySeat}></div>
      <div className={style.Header_Right}>{rightProps && rightProps()}</div>
    </header>
  )
}

export default Header
