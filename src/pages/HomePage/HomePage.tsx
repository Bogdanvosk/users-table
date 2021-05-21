import React from 'react'
import { useDispatch } from 'react-redux'
import { getBigUsersData, getSmallUsersData } from '../../store/actions/actions'
import { useHistory } from 'react-router'
import { Button, Container } from 'react-bootstrap'
import styles from './homePage.module.css'

const HomePage: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  // Получение маленького обьема данных и редирект к таблице с пользователями
  const getSmallData = () => {
    dispatch(getSmallUsersData())
    history.push('/table')
  }

  // Получение большого обьема данных и редирект к таблице с пользователями
  const getBigData = () => {
    dispatch(getBigUsersData())
    history.push('/table')
  }

  return (
    <Container className={styles.homeContainer}>
      <Button
        variant='primary'
        onClick={getSmallData}
        className={styles.homeButton}>
        Маленький набор данных
      </Button>
      <Button
        variant='primary'
        onClick={getBigData}
        className={styles.homeButton}>
        Большой набор данных
      </Button>
    </Container>
  )
}

export default HomePage
