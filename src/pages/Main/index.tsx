import React, {useEffect, useState} from 'react'
import Header from 'src/pages/Main/components/Header'
import {SearchOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined} from '@ant-design/icons'
import {Button, Card, Input, Select} from 'antd'
import {useStores} from '@emp-antd/base/stores'
import style from './index.module.scss'
import CardList from 'src/components/CardList'
import {ModalForm} from '@emp-antd/base/components/common/crud'
import {browseFolder} from 'src/helpers/utils'

const {Option} = Select

const Main = () => {
  const {demoStore} = useStores()
  // 项目列表
  const [projectList, projectListAction] = useState([])
  // 模版列表
  const [templates, templatesAction] = useState([{id: 1, name: 'react-base'}])
  const [showCreateModal, showCreateModalAction] = useState(false)
  const inputFileRef = React.useRef<HTMLInputElement>(null)

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
              <Button type="ghost" htmlType="submit">
                导入项目
              </Button>
            </div>
            <div className={style.Header_RightChild}>
              <Button type="primary" htmlType="submit" onClick={onShowCreateModal}>
                创建项目
              </Button>
            </div>

            <div className={style.Header_RightChild}>
              <Input.Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{width: 200, margin: '0 10px'}}
              />
            </div>
          </>
        )}></Header>

      <div className={style.Content}>
        <CardList
          list={[1, 2, 3, 4]}
          nextPage={() => {}}
          page={1}
          pageSize={10}
          count={1000}
          span={4}
          cardDom={item => (
            <Card
              style={{margin: '0 10px 10px'}}
              cover={
                <div className={style.cardCover}>
                  <img src={require('src/assets/img/remotes-icon.png')} />
                </div>
              }
              actions={[<EditOutlined key="edit" />, <DeleteOutlined key="ellipsis" />]}>
              <Card.Meta
                title={
                  <div className={style.cardMeta}>
                    <span>项目名称</span>
                    <span className={style.cardMetaType}>模版类型</span>
                  </div>
                }
                description="This is the description"
              />
            </Card>
          )}
        />
      </div>
    </div>
  )
}

export default Main
