import React, {useEffect, useState} from 'react'
import CardList from 'src/components/CardList'
import CreateProject from 'src/components/CreateProject'
import {useStores} from 'src/stores'
import {TprojectList, TprojectListParam} from 'src/api/project'
import {observer, useObserver} from 'mobx-react-lite'
import {Dropdown, Card, Avatar, Button, Input} from 'antd'
import envStorage from 'src/helpers/envStorage'
import {getProjectList} from 'src/api/project'
import style from './index.module.scss'
export interface TprojectListParams extends Partial<TprojectListParam> {
  page?: number
  pageSize?: number
}
const {Meta} = Card
const ProjectListComp = () => {
  const [info, setInfo] = useState<TprojectListParam>({
    page: 1,
    pageSize: 10,
  })
  const [total, setTotal] = useState(0)
  const [projectList, setProjectList] = useState<TprojectList>([])
  const {projectStore} = useStores()
  const [showDrowdown, showDrowdownAction] = useState(false)
  const {getProjectInfo, showCreateProjectAction, projectInfo} = projectStore
  const getProjectListAct = async (param?: TprojectListParams, name?: string) => {
    setInfo({
      ...info,
      ...param,
    })
    const {code, data} = await getProjectList({...info, name})
    setProjectList(data.list)
    setTotal(data.total)
  }
  useEffect(() => {
    ;(async () => {
      let prodId = envStorage.get('prodId')
      if (!prodId || prodId === 'undefined') {
        const {code, data} = await getProjectList({page: 1, pageSize: 10})
        if (data.list.length > 0) {
          prodId = data.list[0].id
        } else {
          showCreateProjectAction(true)
          return
        }
      }
      await getProjectInfo({id: prodId})
    })()
  }, [])

  return useObserver(() => (
    <>
      <Dropdown
        onVisibleChange={visible => {
          visible && getProjectListAct({page: 1})
          showDrowdownAction(visible)
        }}
        trigger={['click']}
        visible={showDrowdown}
        overlay={
          <div style={{width: '400px'}}>
            <CardList
              list={projectList || []}
              nextPage={e => {
                getProjectListAct(e)
              }}
              span={24}
              page={info.page}
              pageSize={info.pageSize}
              count={total}
              paginationOpt={{showSizeChanger: false}}
              paginationJustify={'end'}
              cardDom={item => (
                <Card
                  style={{margin: '0 0 10px', width: '100%'}}
                  onClick={() => {
                    item.id !== projectInfo.id && getProjectInfo({id: item.id})
                    showDrowdownAction(false)
                  }}
                  className={style.projectCard}>
                  <Meta
                    avatar={
                      <Avatar
                        src={
                          'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png'
                        }
                      />
                    }
                    title={item.name}
                    description={`地址：${item.path}`}
                  />
                </Card>
              )}
              footer={
                <div style={{flex: 1, marginRight: '20px'}}>
                  <Input.Search
                    placeholder="搜索项目"
                    enterButton
                    onSearch={value => getProjectListAct({page: 1}, value)}
                  />
                </div>
              }
            />
          </div>
        }>
        <Button onClick={() => showDrowdownAction(true)}>项目列表</Button>
      </Dropdown>
    </>
  ))
}

export default observer(ProjectListComp)
