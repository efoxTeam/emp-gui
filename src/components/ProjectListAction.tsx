import React, {useEffect, useState} from 'react'
import CardList from 'src/components/CardList'
import CreateProject from 'src/components/CreateProject'
import {useStores} from '@emp-antd/base/stores'
import {TprojectList, TprojectListParam} from 'src/stores/project/projectStore'
import {useObserver} from 'mobx-react-lite'
import {Dropdown, Card, Avatar, Button} from 'antd'
import envStorage from 'src/helpers/envStorage'
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
  const {getProjectList, getProjectInfo, setProjectInfo, projectInfo} = projectStore
  const [createProjectShow, createProjectShowAction] = useState(false)
  const getProjectListAct = async (param?: TprojectListParams) => {
    setInfo({
      ...info,
      ...param,
    })
    const res = await getProjectList(info)
    setProjectList(res.list)
    setTotal(res.total)
  }
  useEffect(() => {
    ;(async () => {
      let prodId = envStorage.get('prodId')
      if (!prodId) {
        const res = await getProjectList({page: 1, pageSize: 10})
        if (res.list.length > 0) {
          prodId = res.list[0].id
        } else {
          createProjectShowAction(true)
          return
        }
      }
      const project = await getProjectInfo(prodId)
      setProjectInfo(project)
    })()
  }, [])

  return useObserver(() => (
    <>
      {JSON.stringify(projectInfo) !== '{}' ? (
        <Dropdown
          onVisibleChange={visible => {
            visible && getProjectListAct({page: 1})
          }}
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
                  <Card style={{margin: '0 0 10px'}}>
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
                  <div style={{flex: 1}}>
                    <Button type="primary" onClick={() => createProjectShowAction(true)}>
                      创建项目
                    </Button>
                  </div>
                }
              />
            </div>
          }
          trigger={['click']}
          placement="topRight">
          <a style={{color: '#fff'}} href="javascript:;">
            {projectInfo.name}
          </a>
        </Dropdown>
      ) : (
        <a style={{color: '#fff'}} href="javascript:;" onClick={() => createProjectShowAction(true)}>
          创建项目
        </a>
      )}
      <CreateProject visible={createProjectShow} onClose={() => createProjectShowAction(false)} />
    </>
  ))
}

export default ProjectListComp
