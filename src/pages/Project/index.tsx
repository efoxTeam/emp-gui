import React, {useEffect} from 'react'
import {Descriptions, Card, Button} from 'antd'

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
      </Card>
    </>
  )
}

export default Com
