import {Form, Row, Col, Select, Input, Button, List, message} from 'antd'
import React, {useImperativeHandle, useRef, useState} from 'react'
import {FolderOutlined} from '@ant-design/icons'
import {useStores} from 'src/stores'
import {useObserver} from 'mobx-react-lite'
import {addProject, getDirFileList} from 'src/api/project'
import envStorage from 'src/helpers/envStorage'
import {FormInstance} from 'antd/lib/form'
import style from './index.module.scss'
const LOCALSTORAGE_CREATE_URL = 'empGui-CreateProject-url'

export interface TcRef<Values = any> extends FormInstance {
  // onCreate: () => void
  searchDir: () => void
}

const creatDom = ({finishAction, cRef}: {finishAction?: (re: any) => any; cRef?: any}) => {
  const [dir, dirAction] = useState<string[]>([])
  const [createLoading, createLoadingAction] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const {projectStore} = useStores()
  let timer: NodeJS.Timeout
  const onHandleFormChange = (value: any) => {}
  useImperativeHandle(cRef, () => ({
    // onCreate: async () => {
    //   formRef.current?.submit()
    // },
    ...formRef.current,
    searchDir: searchDir,
  }))

  /**
   * 输入框回车搜索
   */
  const searchDir = () => {
    clearTimeout(timer)
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
   * 表单提交
   */
  const onFormFinish = async (values: any) => {
    if (createLoading) return

    createLoadingAction(true)
    const key = 'updateable'
    message.loading({
      content: '正在创建项目...',
      key,
    })
    const response = await addProject(values)
    const {code, msg, data} = response
    message.success({content: msg, key})
    createLoadingAction(false)

    if (code === 0) {
      // 请求一下
      const resp = await projectStore.getProjectInfo({id: data.id})
      finishAction?.(resp)
    }
  }
  // const searchDirTimer = (e: React.KeyboardEvent) => {
  const searchDirTimer = () => {
    // if (e.key === 'Enter') return
    clearTimeout(timer)
    if (formRef.current?.getFieldValue('path') !== '') {
      timer = setTimeout(() => {
        // SetIsSearching(false)
        searchDir()
      }, 1000)
    }
  }

  /**
   * 前往上一级目录
   */
  const onClickPrevDir = () => {
    const curDir = formRef.current?.getFieldValue('path')
    const splitDir = curDir
      .replace(/\/{1,}/, '/')
      .split('/')
      .filter((item: string) => item !== '')
    splitDir.pop()

    let newDir = '/'
    if (splitDir.length) {
      newDir += splitDir.join('/')
    }
    fetchDirFileList(newDir)
  }

  return useObserver(() => (
    <div className={style.drawContent}>
      <Form
        layout="vertical"
        onValuesChange={onHandleFormChange}
        ref={formRef}
        onFinish={onFormFinish}
        className={style.form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="type" label="选择模版" rules={[{required: true, message: '请选择模版'}]}>
              <Select showSearch placeholder="选择模版">
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
              <Input
                style={{width: '100%'}}
                placeholder="输入项目名"
                onPressEnter={searchDir}
                onChange={searchDirTimer}
                suffix={
                  <Button type="primary" onClick={onClickPrevDir}>
                    上一级
                  </Button>
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <List
        className={style.dirList}
        itemLayout="horizontal"
        dataSource={dir}
        renderItem={item => (
          <List.Item className={style.dirName}>
            <List.Item.Meta avatar={<FolderOutlined />} title={<div onClick={() => changePath(item)}>{item}</div>} />
          </List.Item>
        )}
      />
    </div>
  ))
}

export default creatDom
