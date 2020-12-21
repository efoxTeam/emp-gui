import React, {useEffect, useRef, useState} from 'react'
import {SForm} from 'src/components/common/crud'
import CardList from 'src/components/CardList'
import {EditOutlined} from '@ant-design/icons'
import {Card, Drawer, Descriptions, Divider, List, Typography, message, Modal, Form, Input} from 'antd'
import style from './index.module.scss'
import {FormInstance} from 'antd/lib/form'
import {addRemote, updateRemote} from 'src/api/remote'
import {useStores} from 'src/stores'
import {observer, useObserver} from 'mobx-react-lite'

const {Meta} = Card
const {Title} = Typography
const Com = observer(() => {
  const {projectStore} = useStores()
  const {remotes} = projectStore.projectInfo
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [remoteModalType, remoteModalTypeAction] = useState<'create' | 'edit'>('create')
  const [remoteAlias, setRemoteAlias] = useState('')
  const createRemoteForm = useRef<FormInstance>(null)

  const handleCreateModalShow = (is: boolean, isEdit?: boolean) => {
    remoteModalTypeAction(isEdit ? 'edit' : 'create')
    setShowCreateModal(is)
  }

  const onSubmitCreateRemote = async () => {
    const values = createRemoteForm.current?.getFieldsValue()
    const {data, code, msg} = await addRemote({...values, id: projectStore.projectInfo.id})
    const success = code === 0
    message[success ? 'success' : 'error'](msg)
    if (success) {
      handleCreateModalShow(false)
      projectStore.getProjectInfo({id: projectStore.projectInfo.id})
    }
  }

  const onSubmitUpdateRemote = async () => {
    const values = createRemoteForm.current?.getFieldsValue()
    const {data, code, msg} = await updateRemote({...values, updateAlias: remoteAlias, id: projectStore.projectInfo.id})
    const success = code === 0
    message[success ? 'success' : 'error'](msg)
    if (success) {
      handleCreateModalShow(false)
      setRemoteAlias('')
      projectStore.getProjectInfo({id: projectStore.projectInfo.id})
    }
  }

  const onEditRemote = (info: any) => {
    setRemoteAlias(info.alias)
    handleCreateModalShow(true, true)
    setTimeout(() => {})
    createRemoteForm.current?.setFieldsValue(info)
  }

  return useObserver(() => (
    <>
      <Card style={{marginBottom: '20px'}}>
        <SForm
          className="ant-advanced-search-form"
          options={{layout: 'inline', style: {flex: 1}}}
          onFinish={e => {
            alert(e.Input)
          }}
          items={[
            // {
            //   type: 'Input',
            //   label: '',
            //   name: 'Input',
            //   options: {
            //     placeholder: '远程基站别名',
            //     suffix: <SearchOutlined />,
            //   },
            //   // rules: [{required: true, message: '请输入远程基站别名'}],
            // },
            {
              type: 'Button',
              label: '',
              formItemOptions: {style: {flex: 1}},
              data: [
                // {
                //   htmlType: 'submit',
                //   label: '查找',
                //   value: 'search',
                // },
                {
                  label: '引入远程基站',
                  value: 'add',
                  onClick: () => handleCreateModalShow(true),
                },
              ],
            },
          ]}
        />
      </Card>

      <CardList
        list={remotes}
        nextPage={() => {}}
        page={1}
        pageSize={10}
        count={remotes.length}
        layout="flex"
        pagination={<></>}
        header={
          <Typography>
            <Title level={5}>远程基站列表</Title>
          </Typography>
        }
        cardDom={item => {
          const [name, url] = item.aliasUrl.split('@')
          return (
            <Card
              style={{width: '250px'}}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => onEditRemote({alias: item.alias, projectName: name, path: url})}
                />,
              ]}
              cover={
                <div className={style.cardCover}>
                  <img src={require('src/assets/img/remotes-icon.png')} />
                </div>
              }>
              <Meta
                title={
                  <div className={style.cardMeta}>
                    <span>{item.alias}</span>
                    {/* <Button type={'link'} onClick={() => setDrawerVisible(true)}>
                      查看
                    </Button> */}
                  </div>
                }
                description={
                  <>
                    地址：
                    <a href={url} target="_blank" rel="noreferrer">
                      {url}
                    </a>
                  </>
                }
              />
            </Card>
          )
        }}
      />
      <Drawer
        width={500}
        title="react-base"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}>
        <Descriptions column={1} title="">
          <Descriptions.Item label="emp.js路径">
            <a href="https://github.com/efoxTeam/emp-react-template.git">
              https://github.com/efoxTeam/emp-react-template.git
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="d.ts路径">
            <a href="https://github.com/efoxTeam/emp-react-template.git">
              https://github.com/efoxTeam/emp-react-template.git
            </a>
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <List
          size="small"
          header={
            <Typography>
              <Title level={5}>共享资源列表</Title>
            </Typography>
          }
          dataSource={[
            'src/App',
            'src/stores',
            'src/stores/common/crud',
            'src/components/layout/FixSlideLayout',
            'src/components/layout/MarginLayout',
            'src/components/common/crud',
            'src/components/common/RouterComp',
            'src/components/common/socketConnectMask',
          ]}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Drawer>
      <Modal
        title={remoteModalType === 'create' ? '引入远程基站' : `${remoteAlias}远程基站修改`}
        visible={showCreateModal}
        forceRender={true}
        cancelText="取消"
        okText={remoteModalType === 'create' ? '确定' : '修改'}
        onCancel={() => handleCreateModalShow(false)}
        onOk={() => createRemoteForm.current?.submit()}>
        <Form
          ref={createRemoteForm}
          onFinish={remoteModalType === 'create' ? onSubmitCreateRemote : onSubmitUpdateRemote}>
          <Form.Item
            label="使用别名"
            name="alias"
            rules={[{required: true, message: '请输入基站名项目中package.json的name字段'}]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            label="唯一标识"
            name="projectName"
            rules={[{required: true, message: '请输入基站项目中emp.json的name字段'}]}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="基站路径" name="path" rules={[{required: true, message: '请输入基站远程路径'}]}>
            <Input placeholder="" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  ))
})

export default Com
