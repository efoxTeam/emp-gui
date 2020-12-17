import React, {useState} from 'react'
import {ModalForm, SForm} from 'src/components/common/crud'
import CardList from 'src/components/CardList'
import {SearchOutlined} from '@ant-design/icons'
import {Card, Button, Drawer, Descriptions, Divider, List, Typography} from 'antd'
import style from './index.module.scss'
const {Meta} = Card
const {Title} = Typography
const Com = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [remotesList, setRemotesList] = useState([
    {id: 1, name: 'emp-react-base', url: 'https://github.com/efoxTeam/emp-react-template.git'},
    {id: 2, name: 'emp-react-project', url: 'https://github.com/efoxTeam/emp-react-project-template.git'},
    {id: 3, name: 'emp-vue2-template', url: 'https://github.com/efoxTeam/emp-vue2-template.git'},
    {id: 2, name: 'emp-preact', url: 'https://github.com/efoxTeam/emp-preact-template.git'},
    {id: 3, name: 'emp-vue3-template', url: 'https://github.com/efoxTeam/emp-vue3-template.git'},
  ])
  return (
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
        list={remotesList}
        nextPage={() => {}}
        page={1}
        pageSize={10}
        count={1000}
        layout="row"
        cardDom={item => (
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
                  <span>{item.name}</span>
                  <Button type={'link'} onClick={() => setDrawerVisible(true)}>
                    查看
                  </Button>
                </div>
              }
              description={
                <>
                  地址：
                  <a href={item.url}>{item.url}</a>
                </>
              }
            />
          </Card>
        )}
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
        title={'新建项目'}
        visible={showCreateModal}
        name={'createModalForm'}
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
            label: '基站别名',
            name: 'name',
            rules: [{required: true, message: '请输入基站别名'}],
          },
          {
            type: 'Input',
            label: 'emp路径',
            name: 'empPath',
            rules: [{required: true, message: '请输入emp.js路径'}],
          },
          {
            type: 'Input',
            label: 'd.ts路径',
            name: 'tsPath',
            options: {
              placeholder: '默认获取基站默认生成index.d.ts文件',
            },
            // rules: [{required: true, message: '请输入项目名称'}],
          },
        ]}
        onCancel={() => setShowCreateModal(false)}
      />
    </>
  )
}

export default Com
