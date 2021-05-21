import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// styles
import styles from './table.module.css'
import arrowDown from '../../assets/arrow-down.svg'

// components
import Loader from '../../components/Loader/Loader'
import UserDetails from '../../components/UserDetail/UserDetails'
import { Button, Container, Table } from 'react-bootstrap'
import Filter from '../../components/Filter/Filter'
import PaginationBlock from '../../components/Pagination/PaginationBlock'

// types
import { User, UserData } from '../../store/types'

// actions
import {
  setActiveUser,
  setSortby,
  setSortType,
  sortArray
} from '../../store/actions/actions'

interface TablePageProps {
  users: User[]
  isLoading: boolean
  sortBy: string
  sortType: string
  activeUser: User | null
}

const TablePage: React.FC<TablePageProps> = ({
  users,
  isLoading,
  sortBy,
  sortType,
  activeUser
}) => {
  const dispatch = useDispatch()

  
  // Формирование строк с данными
  const rows: UserData[] =
    users &&
    users.map(user => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      }
    })

  const onSort = (sortField: string) => {
    dispatch(setSortby(sortField))
    dispatch(setSortType())
    dispatch(sortArray())
  }


  // Отображение выбранного пользователя
  const onSelectUser = (selectedUser: UserData) => {
    const userDetails = users.find(
      (user: User) => user.id === selectedUser.id
    ) as User
    dispatch(setActiveUser(userDetails))
  }

  return (
    <Container fluid>
      <h6>Если строка поиска пустая, отобразятся все пользователи</h6>
      {isLoading && <Loader />}
      <Filter />
      <Button color='primary'>
        <Link to='/form'>Добавить пользователя</Link>
      </Button>
      {rows ? (
        <Table bordered hover>
          <thead>
            <tr>
              <th className={styles.heading} onClick={onSort.bind(null, 'id')}>
                id
                <img
                  src={arrowDown}
                  alt='Arrow down'
                  className={
                    sortBy === 'id' && sortType === 'asc' ? styles.rotated : ''
                  }
                />
              </th>
              <th
                className={styles.heading}
                onClick={onSort.bind(null, 'firstName')}>
                firstName
                <img
                  src={arrowDown}
                  alt='Arrow down'
                  className={
                    sortBy === 'firstName' && sortType !== 'asc'
                      ? styles.rotated
                      : ''
                  }
                />
              </th>
              <th
                className={styles.heading}
                onClick={onSort.bind(null, 'lastName')}>
                lastName
                <img
                  src={arrowDown}
                  alt='Arrow down'
                  className={
                    sortBy === 'lastName' && sortType !== 'asc'
                      ? styles.rotated
                      : ''
                  }
                />
              </th>
              <th
                className={styles.heading}
                onClick={onSort.bind(null, 'email')}>
                email
                <img
                  src={arrowDown}
                  alt='Arrow down'
                  className={
                    sortBy === 'email' && sortType !== 'asc'
                      ? styles.rotated
                      : ''
                  }
                />
              </th>
              <th
                className={styles.heading}
                onClick={onSort.bind(null, 'phone')}>
                phone
                <img
                  src={arrowDown}
                  alt='Arrow down'
                  className={
                    sortBy === 'phone' && sortType === 'asc'
                      ? styles.rotated
                      : ''
                  }
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.map(row => (
                <tr
                  className={styles.row}
                  key={`${row.id}_${row.firstName}_${row.lastName}`}
                  onClick={onSelectUser.bind(null, row)}>
                  <td>{row.id}</td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <h1>Пользователи закончились!</h1>
      )}
      {activeUser ? <UserDetails user={activeUser} /> : null}
      <PaginationBlock />
    </Container>
  )
}

export default TablePage
