import {Button, Col, Drawer, Form, Input, Row, Select, List} from 'antd'
import {FolderOutlined} from '@ant-design/icons'
import {FormInstance} from 'antd/lib/form'
import React, {useEffect, useRef, useState} from 'react'
import {useStores} from 'src/stores'
import {observer} from 'mobx-react-lite'

function CreateProject({visible, onClose}: {visible: boolean; onClose?: () => void}) {
  const [dir, dirAction] = useState<{type: string; name: string}[]>([])
  const formRef = useRef<FormInstance>(null)
  const {projectStore} = useStores()

  const onHandleFormChange = (value: any) => {}

  const searchDir = (e: any) => {
    getDirFileList()
  }

  const changePath = (name: string) => {
    const path = `${formRef.current?.getFieldValue('path') || ''}/${name}`
    formRef.current?.setFieldsValue({
      path,
    })
    getDirFileList()
  }

  const getDirFileList = async () => {
    const path = formRef.current?.getFieldValue('path')
    const data = await projectStore.getDirFileList({path})
    dirAction(data)
  }

  useEffect(() => {
    projectStore.getTemplates()
  }, [])

  return (
    <Drawer
      title="创建项目"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}>
          <Button onClick={onClose} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={onClose} type="primary">
            创建
          </Button>
        </div>
      }>
      <Form layout="vertical" onValuesChange={onHandleFormChange} ref={formRef}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="template" label="选择模版" rules={[{required: true, message: 'Please enter user name'}]}>
              <Select
                showSearch
                placeholder="选择模版"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {projectStore.templates.map(item => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="projectName" label="项目名" rules={[{required: true, message: 'Please enter url'}]}>
              <Input style={{width: '100%'}} placeholder="输入项目名" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="path" label="选择目录" rules={[{required: true, message: 'Please enter url'}]}>
              <Input style={{width: '100%'}} placeholder="输入项目名" onPressEnter={searchDir} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={dir}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<FolderOutlined />}
              title={<div onClick={() => changePath(item.name)}>{item.name}</div>}
            />
          </List.Item>
        )}
      />
      ,
    </Drawer>
  )
}

export default observer(CreateProject)
