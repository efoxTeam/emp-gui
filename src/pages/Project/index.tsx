import React, {useEffect} from 'react'
import {Descriptions, Card, Button, List, Divider, Typography} from 'antd'
import {useObserver} from 'mobx-react-lite'
import {useStores} from 'src/stores'
const {Title} = Typography
const Com = () => {
  const {projectStore} = useStores()

  return useObserver(() => (
    <>
      <Card>
        <Descriptions title="项目名称">
          <Descriptions.Item label="模版类型">{projectStore.projectInfo.name}</Descriptions.Item>
          <Descriptions.Item label="项目地址">
            <a href={projectStore.projectInfo.path}>{projectStore.projectInfo.path}</a>
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
          dataSource={projectStore.projectInfo.remotes}
          renderItem={item => <List.Item>{item?.alias}</List.Item>}
        />
      </Card>
    </>
  ))
}

export default Com
