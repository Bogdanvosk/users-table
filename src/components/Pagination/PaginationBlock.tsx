import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import Pagination from 'react-bootstrap/Pagination'

// types
import { Store } from '../../store/types'

// actions
import { setCurrentPage } from '../../store/actions/actions'

const PaginationBlock: React.FC = () => {
  const dispatch = useDispatch()
  const { currentPage, pages } = useSelector((state: Store) => state)

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  return (
    <Pagination>
      {pages &&
        pages.map(page => {
          return (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => onChangePage(page)}>
              {page + 1}
            </Pagination.Item>
          )
        })}
    </Pagination>
  )
}

export default PaginationBlock
