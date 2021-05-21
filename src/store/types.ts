export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: Adress
  description: string
}

type Adress = {
  streetAddress: string
  city: string
  state: string
  zip: string
}

export interface UserData {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface Store {
  users: User[]
  filteredUsers: User[]
  isLoading: boolean
  sortBy: string
  sortType: string
  currFilter: any
  activeUser: User | null,
  currentPage: number,
  pages: number[]
}
