import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

// components
import FormPage from './pages/FormPage/FormPage'
import HomePage from './pages/HomePage/HomePage'
import TablePage from './pages/TablePage/TablePage'

// actions
import { setPages } from './store/actions/actions'

// types
import { Store } from './store/types'

// utils
import { splitData } from './utils'

// Количество пользователей на одной странице
const PAGE_SIZE = 50

const App: React.FC = () => {
  const dispatch = useDispatch()

  const {
    users,
    isLoading,
    sortBy,
    sortType,
    filteredUsers,
    activeUser,
    currentPage
  } = useSelector((state: Store) => state)

  // Если есть отфильтрованные пользователи, то возвращаются отфильтрованные,иначе все
  const currentUsers = filteredUsers.length !== 0 ? filteredUsers : users

  // Расчет страниц исходя из количества пользователей
  React.useEffect(() => {
    dispatch(setPages(currentUsers, PAGE_SIZE))
  }, [currentUsers])

  // Разделение массива пользователей на массив подмассивов (реализация пагинации)
  const usersChunk =
    currentUsers && splitData(currentUsers, PAGE_SIZE)[currentPage]

  return (
    <BrowserRouter>
      <Route path='/' component={HomePage} exact />
      <Route path='/form' component={FormPage} />
      <Route
        path='/table'
        component={() => (
          <TablePage
            users={usersChunk}
            isLoading={isLoading}
            sortBy={sortBy}
            sortType={sortType}
            activeUser={activeUser}
          />
        )}
      />
    </BrowserRouter>
  )
}

export default App
