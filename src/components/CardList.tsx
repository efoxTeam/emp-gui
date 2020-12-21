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
  listStyle?: React.CSSProperties
  style?: React.CSSProperties
  listClassName?: string
  className?: string
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
  className,
  paginationOpt,
  style,
  listStyle,
  listClassName,
  header,
}: CardListProps) => {
  return (
    <>
      <Card className={className} style={style}>
        <Spin spinning={loading}>
          {layout === 'row' ? (
            <List
              className={listClassName}
              style={listStyle}
              dataSource={list}
              header={header}
              renderItem={(item, index) => {
                return <List.Item style={{padding: 0}}>{cardDom(item, index)}</List.Item>
              }}
            />
          ) : (
            <List
              className={listClassName}
              style={listStyle}
              grid={{column: 3}}
              dataSource={list}
              header={header}
              renderItem={(item, index) => (
                <List.Item style={{padding: 0}}>
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
