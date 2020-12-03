import React, {useEffect} from 'react'
import {Descriptions, Card, Button, List, Divider, Typography} from 'antd'
const {Title} = Typography
const Com = () => {
  return (
    <>
      <Card>
        <Descriptions title="项目名称">
          <Descriptions.Item label="模版类型">react-base</Descriptions.Item>
          <Descriptions.Item label="项目地址">
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
      </Card>
    </>
  )
}

export default Com
