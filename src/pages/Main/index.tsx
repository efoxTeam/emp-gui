import {Button, Card} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import CreateProjectForm, {TcRef} from 'src/components/CreateProject/createProjectForm'
import {useStores} from 'src/stores'
import style from './index.module.scss'
const Main = () => {
  const formRef = useRef<TcRef>()
  const {projectStore} = useStores()
  useEffect(() => {
    projectStore.getTemplates()
    formRef.current?.searchDir()
  }, [])
  return (
    <>
      <Card className={style.createProjectBox}>
        <CreateProjectForm cRef={formRef} />
        <Button
          style={{zIndex: 2, position: 'absolute', right: '10px', top: '10px'}}
          onClick={() => formRef.current?.submit()}>
          创建
        </Button>
      </Card>
    </>
  )
}

export default Main
