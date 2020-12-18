import {Button, Col, Drawer, Form, Input, Row, Select, List, message} from 'antd'
import {FolderOutlined} from '@ant-design/icons'
import {FormInstance} from 'antd/lib/form'
import React, {useEffect, useRef, useState} from 'react'
import {useStores} from 'src/stores'
import {observer} from 'mobx-react-lite'
import style from './index.module.scss'
import envStorage from 'src/helpers/envStorage'
import {addProject, getDirFileList} from 'src/api/project'

const LOCALSTORAGE_CREATE_URL = 'empGui-CreateProject-url'

function CreateProject({visible, onClose}: {visible: boolean; onClose?: () => void}) {
  const [dir, dirAction] = useState<string[]>([])
  const formRef = useRef<FormInstance>(null)
  const {projectStore} = useStores()

  const onHandleFormChange = (value: any) => {}

  const onDrawerClose = () => {
    // 重置表单
    formRef.current?.resetFields()
    onClose?.()
  }

  /**
   * 输入框回车搜索
   */
  const searchDir = () => {
    const local = envStorage.get(LOCALSTORAGE_CREATE_URL)
    fetchDirFileList(formRef.current?.getFieldValue('path') || (local !== 'undefined' ? local : '') || '')
  }

  /**
   * 点击目录名后替换form path 值，并请求接口
   * @param name
   */
  const changePath = (name: string) => {
    const formPath = formRef.current?.getFieldValue('path').trim() || ''
    const path = `${formPath}${formPath[formPath.length - 1] !== '/' ? '/' : ''}${name}`
    fetchDirFileList(path)
  }

  const fetchDirFileList = async (path: string) => {
    const {data, code} = await getDirFileList({path})
    if (code === 0) {
      formRef.current?.setFieldsValue({
        path: data.path,
      })
      // 本地存储路径
      envStorage.set(LOCALSTORAGE_CREATE_URL, data.path)
      dirAction(data.dirs)
    }
  }

  /**
   * 创建项目
   */
  const onCreate = async () => {
    formRef.current?.submit()
    // const data = projectStore.addProject()
  }

  /**
   * 表单提交
   */
  const onFormFinish = async (values: any) => {
    const response = await addProject(values)
    const {code, msg, data} = response
    message.success(msg)
    if (code === 0) {
      // 请求一下
      await projectStore.getProjectInfo({id: data.id})
      onDrawerClose?.()
    }
  }

  useEffect(() => {
    if (visible) {
      projectStore.getTemplates()
      searchDir()
    }
  }, [visible])

  return (
    <Drawer
      title="创建项目"
      width={720}
      onClose={onDrawerClose}
      visible={visible}
      bodyStyle={{paddingTop: 0}}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}>
          <Button onClick={onDrawerClose} style={{marginRight: 8}}>
            取消
          </Button>
          <Button onClick={onCreate} type="primary">
            创建
          </Button>
        </div>
      }>
      <Form
        layout="vertical"
        onValuesChange={onHandleFormChange}
        ref={formRef}
        onFinish={onFormFinish}
        className={style.form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="选择模版" rules={[{required: true, message: '请选择模版'}]}>
              <Select
                showSearch
                placeholder="选择模版"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
              >
                {projectStore.templates.map(item => (
                  <Select.Option value={item.type} key={item.type}>
                    {item.type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="name" label="项目名" rules={[{required: true, message: '请输入项目名'}]}>
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
          <List.Item className={style.dirName}>
            <List.Item.Meta avatar={<FolderOutlined />} title={<div onClick={() => changePath(item)}>{item}</div>} />
          </List.Item>
        )}
      />
    </Drawer>
  )
}

export default observer(CreateProject)
