import React, {useEffect, useRef, useState} from 'react'
import CardList from 'src/components/CardList'
import CreateProject from 'src/components/CreateProject'
import {useStores} from 'src/stores'
import {TprojectList, TprojectListParam} from 'src/api/project'
import {observer, useObserver} from 'mobx-react-lite'
import {Dropdown, Card, Avatar, Button, Input, Form} from 'antd'
import envStorage from 'src/helpers/envStorage'
import {getProjectList} from 'src/api/project'
import style from './index.module.scss'
import {FormInstance} from 'antd/lib/form'
import {getFrontLogo} from 'src/helpers/utils'
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
  const searchForm = useRef<FormInstance>(null)
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

  const handleDrowdownShow = (is: boolean) => {
    if (!is) searchForm.current?.resetFields()
    showDrowdownAction(is)
  }

  useEffect(() => {
    ;(async () => {
      let prodId = projectInfo.id
      console.log(prodId)
      if (!prodId || prodId === 'undefined') {
        const {code, data} = await getProjectList({page: 1, pageSize: 10})
        if (data.list.length > 0) {
          prodId = data.list[0].id
        } else {
          showCreateProjectAction(true)
          return
        }
      }
      const response = await getProjectInfo({id: prodId})
      if (!response.id) showCreateProjectAction(true)
    })()
  }, [])

  return useObserver(() => (
    <>
      <Dropdown
        onVisibleChange={visible => {
          visible && getProjectListAct({page: 1})
          handleDrowdownShow(visible)
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
              listStyle={{maxHeight: '600px', overflowY: 'auto'}}
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
                    handleDrowdownShow(false)
                  }}
                  className={style.projectCard}>
                  <Meta
                    avatar={<Avatar src={getFrontLogo(item.name)} />}
                    title={item.name}
                    description={`地址：${item.path}`}
                  />
                </Card>
              )}
              footer={
                <div style={{flex: 1, marginRight: '20px'}}>
                  <Form onFinish={values => getProjectListAct({page: 1}, values.search)} ref={searchForm}>
                    <Form.Item name="search">
                      <Input.Search placeholder="搜索项目" enterButton onSearch={() => searchForm.current?.submit()} />
                    </Form.Item>
                  </Form>
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
