import produce from 'immer'
import { fillPagesArray, filterUsers, sortArray } from '../../utils'
import {
  ActionTypes,
  ADD_USER,
  FILTER_USERS,
  SET_ACTIVE_USER,
  SET_CURRENT_PAGE,
  SET_FILTER,
  SET_LOADING,
  SET_PAGES,
  SET_SORT_BY,
  SET_SORT_TYPE,
  SET_USERS,
  SORT_ARRAY
} from '../actions/actions'
import { Store, User } from '../types'

const initialState: Store = {
  users: [],
  filteredUsers: [],
  isLoading: false,
  sortBy: 'id',
  sortType: 'asc',
  currFilter: '',
  activeUser: null,
  currentPage: 0,
  pages: []
}

export const dataReducer = produce((draft: Store, action: ActionTypes) => {
  switch (action.type) {
    case SET_USERS:
      draft.users = action.payload
      break

    case ADD_USER:
      const newUser: User = {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        id: action.payload.id,
        email: action.payload.email,
        address: {
          streetAddress: 'Some street address',
          city: 'Some city',
          state: 'Some state',
          zip: 'some zip'
        },
        description: 'some description'
      }
      draft.users.unshift(newUser)
      break

    case SET_LOADING:
      draft.isLoading = action.payload
      break

    case SET_SORT_BY:
      draft.sortBy = action.payload
      break

    case SET_SORT_TYPE:
      draft.sortType === 'asc'
        ? (draft.sortType = 'desc')
        : (draft.sortType = 'asc')
      break

    case SORT_ARRAY:
      const newUsersArray = sortArray(draft.users, draft.sortBy, draft.sortType)
      draft.users = newUsersArray
      break

    case SET_FILTER:
      draft.currFilter = action.payload
      break

    case FILTER_USERS:
      const filteredData = filterUsers(draft.users, draft.currFilter)
      filteredData
        ? (draft.filteredUsers = filteredData)
        : (draft.filteredUsers = [])
      break

    case SET_ACTIVE_USER:
      draft.activeUser = action.payload
      break

    case SET_CURRENT_PAGE:
      draft.currentPage = action.payload
      break

    case SET_PAGES:
      const pagesArray = fillPagesArray(
        action.payload.data.length,
        action.payload.pageSize
      )
      draft.pages = pagesArray
      break
  }
}, initialState)
