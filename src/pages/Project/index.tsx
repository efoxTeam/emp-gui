import React, {useEffect} from 'react'
import {Descriptions, Card, Button, List, Divider, Typography} from 'antd'
import {useObserver} from 'mobx-react-lite'
import {useStores} from 'src/stores'
import {openDir} from 'src/api/project'
import css from './index.module.scss'

const {Title} = Typography
const Com = () => {
  const {projectStore} = useStores()
  const projectPath = `${projectStore.projectInfo?.path}/${projectStore.projectInfo?.name}`

  return useObserver(() => (
    <>
      <Card>
        <Descriptions title="项目名称">
          <Descriptions.Item label="模版类型">{projectStore.projectInfo.name}</Descriptions.Item>
          <Descriptions.Item label="项目地址">
            <span onClick={() => openDir({path: projectPath})} className={css.projectPath}>
              {projectPath}
              <span className={css.projectPathTooltip}>点击打开系统文件夹目录</span>
            </span>
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
          dataSource={Object.keys(projectStore.projectInfo.exposes)}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Card>
    </>
  ))
}

export default Com
