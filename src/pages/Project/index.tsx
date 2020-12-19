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
        <Descriptions title="基础信息">
          <Descriptions.Item label="模版类型">{projectStore.projectInfo.name}</Descriptions.Item>
          <Descriptions.Item label="储存位置">
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
              <Title level={5}>共享资源</Title>
            </Typography>
          }
          dataSource={Object.entries(projectStore.projectInfo.exposes)}
          renderItem={item => <List.Item>{`${item[0]}`}</List.Item>}
        />
      </Card>
    </>
  ))
}

export default Com
