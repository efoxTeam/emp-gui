import React, {useEffect, useRef, useState} from 'react'
import {ModalForm, SForm} from 'src/components/common/crud'
import CardList from 'src/components/CardList'
import {SearchOutlined} from '@ant-design/icons'
import {Card, Button, Drawer, Descriptions, Divider, List, Typography, message} from 'antd'
import style from './index.module.scss'
import {FormInstance} from 'antd/lib/form'
import {addRemote} from 'src/api/remote'
import {useStores} from 'src/stores'
import {useObserver} from 'mobx-react-lite'
const {Meta} = Card
const {Title} = Typography
const Com = () => {
  const {projectStore} = useStores()
  const {remotes} = projectStore.projectInfo
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const createRemoteForm = useRef<FormInstance>(null)

  const onSubmitCreateRemote = async () => {
    const values = createRemoteForm.current?.getFieldsValue()
    const {data, code, msg} = await addRemote({...values, id: projectStore.projectInfo.id})
    const success = code === 0
    message[success ? 'success' : 'error'](msg)
    if (success) {
      setShowCreateModal(false)
    }
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
            {
              type: 'Input',
              label: '',
              name: 'Input',
              options: {
                placeholder: '远程基站别名',
                suffix: <SearchOutlined />,
              },
              // rules: [{required: true, message: '请输入远程基站别名'}],
            },
            {
              type: 'Button',
              label: '',
              formItemOptions: {style: {flex: 1}},
              data: [
                {
                  htmlType: 'submit',
                  label: '查找',
                  value: 'search',
                },
                {
                  label: '引入远程基站',
                  value: 'add',
                  onClick: () => setShowCreateModal(true),
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
        layout="row"
        cardDom={(item: {aliasUrl: {split: (arg0: string) => [any, any]}; alias: React.ReactNode}) => {
          const [name, url] = item.aliasUrl.split('@')
          return (
            <Card
              style={{width: '250px', margin: '0 10px 10px'}}
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
                    <a href={url}>{url}</a>
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
      <ModalForm
        title={'引入远程基站'}
        visible={showCreateModal}
        name={'createModalForm'}
        dataRef={createRemoteForm}
        fromItems={[
          // {
          //   type: 'Select',
          //   label: '远程基站别名',
          //   name: 'name',
          //   data: templates.map(item => ({label: item.name, value: item.id})),
          //   rules: [{required: true, message: ''}],
          // },
          {
            type: 'Input',
            label: '基站名称',
            name: 'alias',
            options: {
              placeholder: '请输入基站名称：package.json的name',
            },
            rules: [{required: true, message: '请输入基站名称'}],
          },
          {
            type: 'Input',
            label: '基站别名',
            name: 'projectName',
            rules: [{required: true, message: '请输入基站别名'}],
          },
          {
            type: 'Input',
            label: '基站远程路径',
            name: 'path',
            options: {
              placeholder: '',
            },
            rules: [{required: true, message: '请输入基站远程路径'}],
            // rules: [{required: true, message: '请输入项目名称'}],
          },
        ]}
        onSubmit={onSubmitCreateRemote}
        onCancel={() => setShowCreateModal(false)}
      />
    </>
  ))
}

export default Com
