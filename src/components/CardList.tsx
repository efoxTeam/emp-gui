import React from 'react'
import {Pagination, Card, Row, Col, Spin, List} from 'antd'
import {PaginationProps} from 'antd/lib/pagination'
export interface CardListProps {
  list: any
  loading?: boolean
  page: number
  pageSize: number
  count: number
  span?: number
  nextPage: (d: any) => void
  pagination?: React.ReactNode
  footer?: React.ReactNode
  paginationJustify?: 'start' | 'end' | 'center'
  paginationOpt?: PaginationProps
  cardDom: (item: any, index: number) => React.ReactNode
  layout?: 'row' | 'flex'
  header?: React.ReactNode
}
const justifyContent = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
}
export default ({
  layout = 'row',
  paginationJustify = 'start',
  cardDom,
  list,
  loading = false,
  span = 6,
  page = 1,
  pageSize = 20,
  count,
  nextPage,
  pagination,
  footer,
  paginationOpt,
  header,
}: CardListProps) => {
  return (
    <>
      <Card>
        <Spin spinning={loading}>
          {layout === 'row' ? (
            <List
              dataSource={list}
              header={header}
              renderItem={(item, index) => {
                return <List.Item>{cardDom(item, index)}</List.Item>
              }}
            />
          ) : (
            <List
              grid={{gutter: 16, column: 4}}
              dataSource={list}
              header={header}
              renderItem={(item, index) => (
                <List.Item>
                  <Col className="gutter-row" span={span}>
                    {cardDom(item, index)}
                  </Col>
                </List.Item>
              )}
            />
          )}
          <div style={{display: 'flex', justifyContent: justifyContent[paginationJustify]}}>
            {footer}
            {typeof pagination === 'undefined' ? (
              <Pagination
                {...{
                  total: count,
                  pageSize,
                  current: page,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50'],
                  ...paginationOpt,
                  onChange: (page, pageSize) => {
                    pageSize = pageSize || 20
                    nextPage({page, pageSize})
                  },
                  onShowSizeChange(page, pageSize) {
                    nextPage({page: 1, pageSize})
                  },
                }}
              />
            ) : (
              pagination
            )}
          </div>
        </Spin>
      </Card>
    </>
  )
}
