import React from 'react'
import {Pagination, Card, Row, Col, Spin} from 'antd'
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
  paginationOpt?: PaginationProps
  cardDom: (item: any, index: number) => React.ReactNode
}
export default ({
  cardDom,
  list,
  loading = false,
  span = 6,
  page = 1,
  pageSize = 20,
  count,
  nextPage,
  pagination,
  paginationOpt,
}: CardListProps) => {
  return (
    <>
      <Card>
        <Spin spinning={loading}>
          <Row gutter={[16, 24]}>
            {list.map((item: any, index: number) => (
              <Col key={index} className="gutter-row" span={span}>
                {cardDom(item, index)}
              </Col>
            ))}
          </Row>
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
        </Spin>
      </Card>
    </>
  )
}
