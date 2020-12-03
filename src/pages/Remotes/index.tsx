import React from 'react'
import {SForm} from '@emp-antd/base/components/common/crud'
import CardList from 'src/components/CardList'
import {SearchOutlined} from '@ant-design/icons'
import {Card, Row, Col} from 'antd'

const Com = () => {
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
        cardDom={item => <Card>111231211</Card>}
      />
    </>
  )
}

export default Com
