import React, {useState} from 'react'
import {SForm} from '@emp-antd/base/components/common/crud'
import CardList from 'src/components/CardList'
import {SearchOutlined} from '@ant-design/icons'
import {Card, Button, Drawer, Descriptions, Divider, List, Typography} from 'antd'
import style from './index.module.scss'
const {Meta} = Card
const {Title} = Typography
const Com = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)
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
                },
              ],
            },
          ]}
        />
      </Card>
      <CardList
        list={[1, 2, 3, 4, 5, 6, 7, 8]}
        nextPage={() => {}}
        page={1}
        pageSize={10}
        count={1000}
        layout="flex"
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
                  <span>react-base</span>
                  <Button type={'link'} onClick={() => setDrawerVisible(true)}>
                    查看
                  </Button>
                </div>
              }
              description={
                <>
                  地址：
                  <a href="https://github.com/efoxTeam/emp-react-template.git">
                    https://github.com/efoxTeam/emp-react-template.git
                  </a>
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
    </>
  )
}

export default Com
