import React from 'react'

// components
import { Form, ListGroup } from 'react-bootstrap'

// styles
import styles from './details.module.css'

// types
import { User } from '../../store/types'

interface UserDetailsProps {
  user: User
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <ListGroup>
        <ListGroup.Item>
          Выбран пользователь:{' '}
          <b>
            {user.firstName} {user.lastName}
          </b>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>Описание:</span>
          <Form.Control
            as='textarea'
            rows={3}
            value={user.description}
            className={styles.description}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Адрес проживания : <b>{user.address.streetAddress}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Город: <b>{user.address.city}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Провинция/штат: <b>{user.address.state}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Индекс: <b>{user.address.zip}</b>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}

export default UserDetails
