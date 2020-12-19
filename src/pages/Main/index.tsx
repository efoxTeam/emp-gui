import React, {useEffect, useState} from 'react'
import Header from 'src/pages/Main/components/Header'
import {
  SearchOutlined,
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import {Button, Card, Input, Select, Modal} from 'antd'
import {useStores} from 'src/stores'
import style from './index.module.scss'
import CardList from 'src/components/CardList'
import {ModalForm} from 'src/components/common/crud'

const PROJECTS = [
  {
    id: 1,
    name: 'react-base',
    type: 'react-base',
    img:
      'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
    description: '描述',
    fullPath: '/User/project/react-base',
  },
  {
    id: 2,
    name: 'vue-base',
    type: 'vue-base',
    img: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png',
    description: '描述',
    fullPath: '/Users/project/vue-base',
  },
]

const TEMPLATES = [
  {id: 1, name: 'react-base'},
  {id: 2, name: 'react-project'},
]

const Main = () => {
  // 项目列表
  const [projectList, projectListAction] = useState(PROJECTS)
  // 模版列表
  const [templates, templatesAction] = useState(TEMPLATES)
  const [showCreateModal, showCreateModalAction] = useState(false)
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const {demoStore} = useStores()
  useEffect(() => {
    demoStore.getDemoinfo({id: 1606796764967}).then((res: any) => {
      console.log('demo-get-info-from-db', res)
    })
  }, [])

  const onAdd = async () => {
    const id = +new Date()
    const name = 'projectname' + id
    const res = await demoStore.setDemoInfo({id, name})
    console.log('===done===', res)
    alert('done')
  }

  const onSearch = async (value: string) => {
    alert(value)
  }

  const onShowCreateModal = async () => {
    showCreateModalAction(true)
    if (inputFileRef.current !== null) {
      inputFileRef.current.setAttribute('directory', 'true')
      inputFileRef.current.setAttribute('webkitdirectory', 'true')
    }
  }

  const onDeleteProject = () => {
    Modal.confirm({
      title: '确定删除该项目?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  React.useEffect(() => {
    console.log(1111, inputFileRef.current)
    if (inputFileRef.current !== null) {
      inputFileRef.current.setAttribute('directory', 'true')
      inputFileRef.current.setAttribute('webkitdirectory', 'true')
    }
  }, [inputFileRef])

  return (
    <div className={style.Main}>
      {/* 创建弹窗 */}
      <ModalForm
        title={'新建项目'}
        visible={showCreateModal}
        name={'createModalForm'}
        fromItems={[
          {
            type: 'Select',
            label: '模版',
            name: 'template',
            data: templates.map(item => ({label: item.name, value: item.id})),
            rules: [{required: true, message: ''}],
          },
          {
            type: 'Input',
            label: '项目名称',
            name: 'projectName',
            rules: [{required: true, message: '请输入项目名称'}],
          },
          {
            type: 'Input',
            label: '选择位置',
            name: 'projectPath',
            options: {
              // enterButton: <input type="file" ref={inputFileRef} onChange={(e: any) => console.log(e.target)} />,
              // onSearch: () => browseFolder('projectPath'),
            },
            rules: [{required: true, message: '请输入项目名称'}],
          },
        ]}
        onCancel={() => showCreateModalAction(false)}
      />
      <Header
        rightProps={() => (
          <>
            <div className={style.Header_RightChild}>
              <Button type="primary" htmlType="submit" className={style.Button_Import}>
                导入项目
              </Button>
            </div>
            <div className={style.Header_RightChild}>
              <Button type="primary" htmlType="submit" onClick={onShowCreateModal}>
                创建项目
              </Button>
            </div>

            <div className={style.Header_RightChild}>
              <Input.Search placeholder="搜索项目" onSearch={onSearch} style={{width: 200, margin: '0 10px'}} />
            </div>
          </>
        )}></Header>

      <div className={style.Content}>
        <div className={style.Project_List}>
          <CardList
            list={projectList}
            nextPage={() => {}}
            page={1}
            pageSize={10}
            count={projectList.length}
            paginationOpt={{
              showSizeChanger: false,
            }}
            cardDom={(item: {
              img: string | undefined
              name: React.ReactNode
              type: React.ReactNode
              fullPath: React.ReactNode
              description: React.ReactNode
            }) => (
              <Card
                style={{margin: '0 10px 10px'}}
                cover={
                  <a href={'/project'} className={style.cardCover}>
                    <img src={item.img} />
                  </a>
                }
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="ellipsis" onClick={() => onDeleteProject()} />,
                ]}>
                <Card.Meta
                  title={
                    <div className={style.cardMeta}>
                      <span>{item.name}</span>
                      <span className={style.cardMetaType}>{item.type}</span>
                    </div>
                  }
                  description={
                    <>
                      <div className={style.Project_FullPath}>{item.fullPath}</div>
                      <div className={style.description}>{item.description}</div>
                    </>
                  }
                />
              </Card>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Main
