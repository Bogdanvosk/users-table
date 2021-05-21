import { Action, Store } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { User, UserData } from '../types'

export const ADD_USER = 'ADD_USER'
export const SET_USERS = 'SET_USERS'
export const SET_LOADING = 'SET_LOADING'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SORT_ARRAY = 'SORT_ARRAY'
export const SET_SORT_TYPE = 'SET_SORT_TYPE'
export const SET_FILTER = 'SET_FILTER_VALUE'
export const FILTER_USERS = 'FILTER_USERS'
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_PAGES = 'SET_PAGES'
export const UPDATE_PAGES = 'UPDATE_PAGES'

export type ActionTypes =
  | { type: typeof ADD_USER; payload: UserData }
  | { type: typeof SET_USERS; payload: User[] }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof SET_SORT_BY; payload: string }
  | { type: typeof SET_SORT_TYPE }
  | { type: typeof SORT_ARRAY }
  | { type: typeof SET_FILTER; payload: any }
  | { type: typeof FILTER_USERS; payload: User[] }
  | { type: typeof SET_ACTIVE_USER; payload: User }
  | { type: typeof SET_CURRENT_PAGE; payload: number }
  | { type: typeof SET_PAGES; payload: { data: User[]; pageSize: number } }

export const addUser = (user: UserData) => ({ type: ADD_USER, payload: user })
export const setUsers = (users: User[]) => ({ type: SET_USERS, payload: users })
export const setIsLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading
})

export const setSortby = (sortBy: string) => ({
  type: SET_SORT_BY,
  payload: sortBy
})
export const setSortType = () => ({ type: SET_SORT_TYPE })
export const sortArray = () => ({ type: SORT_ARRAY })
export const setFilter = (filterValue: string) => ({
  type: SET_FILTER,
  payload: filterValue
})

export const filterUsers = () => ({ type: FILTER_USERS })
export const setActiveUser = (user: User) => ({
  type: SET_ACTIVE_USER,
  payload: user
})

export const setCurrentPage = (page: number) => ({
  type: SET_CURRENT_PAGE,
  payload: page
})

export const setPages = (data: User[], pageSize: number) => ({
  type: SET_PAGES,
  payload: {
    data,
    pageSize
  }
})

export const getSmallUsersData =
  (): ThunkAction<void, Store, unknown, Action<string>> => async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const res = await fetch(
        'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
      )
      const users: User[] = await res.json()
      dispatch(setUsers(users))
    } catch (error) {
      alert('Произошла ошибка, попробуйте еще раз!')
      console.log(error)
    }
    dispatch(setIsLoading(false))
  }

export const getBigUsersData =
  (): ThunkAction<void, Store, unknown, Action<string>> => async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const res = await fetch(
        'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D'
      )
      const users: User[] = await res.json()
      dispatch(setUsers(users))
    } catch (error) {
      alert('Произошла ошибка, попробуйте еще раз!')
      console.log(error)
    }
    dispatch(setIsLoading(false))
  }
