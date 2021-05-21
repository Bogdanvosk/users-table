import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useDispatch } from 'react-redux'
import {
  filterUsers,
  setCurrentPage,
  setFilter
} from '../../store/actions/actions'

const Filter: React.FC = () => {
  const dispatch = useDispatch()
  const [input, setInput] = React.useState<any>('')

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const onSetFilter = () => {
    dispatch(setFilter(input))
    dispatch(setCurrentPage(0))
    dispatch(filterUsers())
  }

  return (
    <InputGroup className='mb-3'>
      <FormControl
        placeholder='Введите строку'
        aria-label='Введите строку'
        value={input}
        onChange={onChangeInput}
      />
      <InputGroup.Append>
        <Button variant='outline-secondary' onClick={onSetFilter}>
          Найти
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}

export default Filter
