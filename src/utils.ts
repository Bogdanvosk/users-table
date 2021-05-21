import _ from 'lodash'

// types
import { User } from './store/types'

// Заполнение числами
export const fillPagesArray = (totalUsers: number, pageSize: number) => {
  const array = []
  const totalPages = Math.ceil(totalUsers / pageSize)
  for (let i = 0; i < totalPages; i++) {
    array.push(i)
  }
  return array
}

// Сортировка массива
export const sortArray = (array: User[], sortField: string, sortType: any) =>
  _.orderBy(array, sortField, sortType)

// Фильтрация массива
export const filterUsers = (users: User[], filterVal: any) => {
  if (!filterVal) {
    return
  }
  const filteredUsers = users.filter(user => {
    return (
      user.firstName.toLowerCase().includes(filterVal.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filterVal.toLowerCase()) ||
      user.email.toLowerCase().includes(filterVal.toLowerCase()) ||
      user.id === +filterVal ||
      user.phone === filterVal
    )
  })

  return filteredUsers
}

// Разделение массива на подмассивы
export const splitData = (array: User[], pageSize: number) => {
  return _.chunk(array, pageSize)
}
