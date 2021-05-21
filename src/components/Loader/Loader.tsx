import React from 'react'
import { Container } from 'react-bootstrap'
import loaderSvg from '../../assets/loader.svg'
import styles from './loader.module.css'

const Loader: React.FC = () => {
  return (
    <Container className={styles.loaderContainer} fluid>
      <img src={loaderSvg} alt='Loader' />
    </Container>
  )
}

export default Loader
