import {Button, Drawer, notification} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {useStores} from 'src/stores'
import {useObserver, observer} from 'mobx-react-lite'
import CreateProjectForm, {TcRef} from './createProjectForm'

function CreateProject({visible, onClose}: {visible: boolean; onClose?: () => void}) {
  const formRef = useRef<TcRef>()
  const {projectStore} = useStores()
  const onDrawerClose = () => {
    // console.log(projectStore.projectInfo.id)
    // if (!projectStore.projectInfo.id) {
    //   return notification.warning({
    //     message: '提示',
    //     description: '请先创建您的第一个项目喔～',
    //     duration: 1.5,
    //     key: 'key',
    //   })
    // }
    // 重置表单
    formRef.current?.resetFields()
    onClose?.()
  }

  useEffect(() => {
    if (visible) {
      projectStore.getTemplates()
      formRef.current?.searchDir()
    }
  }, [visible])

  return useObserver(() => (
    <Drawer
      title="创建项目"
      width={720}
      onClose={onDrawerClose}
      visible={visible}
      closable={false}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}>
          <Button onClick={onDrawerClose} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={() => formRef.current?.submit()} type="primary">
            创建
          </Button>
        </div>
      }>
      <CreateProjectForm cRef={formRef} />
    </Drawer>
  ))
}

export default observer(CreateProject)
