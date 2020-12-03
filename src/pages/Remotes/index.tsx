import React, {useState} from 'react'
import {SForm} from '@emp-antd/base/components/common/crud'
import CardList from 'src/components/CardList'
import {SearchOutlined} from '@ant-design/icons'
import {Card, Button, Drawer} from 'antd'
import style from './index.module.scss'
const {Meta} = Card
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
        list={[1, 2, 3, 4]}
        nextPage={() => {}}
        page={1}
        pageSize={10}
        count={1000}
        layout="flex"
        cardDom={item => (
          <Card
            style={{margin: '0 10px 10px'}}
            cover={
              <div className={style.cardCover}>
                <img src={require('src/assets/img/remotes-icon.png')} />
              </div>
            }>
            <Meta
              title={
                <div className={style.cardMeta}>
                  <span>23424234</span>
                  <Button type={'link'} onClick={() => setDrawerVisible(true)}>
                    编辑
                  </Button>
                </div>
              }
              description="This is the description"
            />
          </Card>
        )}
      />
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export default Com
