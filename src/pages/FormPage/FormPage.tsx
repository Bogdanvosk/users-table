import React from 'react'

// hooks
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

// components
import { Formik } from 'formik'
import { Button, Card, Form } from 'react-bootstrap'
import InputMask from 'react-input-mask'

// actions
import { addUser } from '../../store/actions/actions'

// types
import { UserData } from '../../store/types'

// styles
import styles from './form.module.css'

// form validator yup
import * as yup from 'yup'

const FormPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    id: yup
      .number()
      .positive('Число должно быть положительным')
      .integer('Число должно быть целым')
      .typeError('Должно быть числом')
      .required('Обязательное поле!'),
    firstName: yup
      .string()
      .matches(/[A-Z, a-z, А-Я, а-я]\w/, 'Имя должно состоять из букв')
      .trim()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    lastName: yup
      .string()
      .matches(/[A-Z, a-z, А-Я, а-я]\w/, 'Фамилия должна состоять из букв')
      .trim()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    email: yup
      .string()
      .email('Введите корректный email')
      .trim()
      .typeError('Должно быть строкой')
      .required('Обязательное поле'),
    phone: yup
      .string()
      .trim()
      .strict()
      .typeError('Должно быть числом')
      .required('Обязательное поле!')
  })

  const onSubmitHandler = (values: UserData) => {
    console.log(values)
    dispatch(addUser(values))
    history.push('/table')
  }

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        }}
        onSubmit={onSubmitHandler}
        validateOnBlur>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty
        }) => {
          return (
            <div className={styles.formWrapper}>
              <div className={styles.form}>
                <Card body>
                  <h4 className={styles.title}>
                    Форма добавления пользователя
                  </h4>
                  <Form>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>id</Form.Label>
                      <Form.Control
                        name='id'
                        type='text'
                        placeholder='id'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.id}
                        isValid={touched.id && !errors.id}
                        isInvalid={touched.id && !!errors.id}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.id}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput1'>
                      <Form.Label>firstName</Form.Label>
                      <Form.Control
                        name='firstName'
                        type='text'
                        placeholder='firstName'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        isValid={touched.firstName && !errors.firstName}
                        isInvalid={touched.firstName && !!errors.firstName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput2'>
                      <Form.Label>lastName</Form.Label>
                      <Form.Control
                        name='lastName'
                        type='text'
                        placeholder='lastName'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        isValid={touched.lastName && !errors.lastName}
                        isInvalid={touched.lastName && !!errors.lastName}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput3'>
                      <Form.Label>email</Form.Label>
                      <Form.Control
                        name='email'
                        type='email'
                        placeholder='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='exampleForm.ControlInput3'>
                      <Form.Label>phone</Form.Label>
                      <Form.Control
                        name='phone'
                        as={InputMask}
                        mask='(999) 999-99-99'
                        type='text'
                        placeholder='phone'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        isValid={touched.phone && !errors.phone}
                        isInvalid={touched.phone && !!errors.phone}
                        alwaysShowMask
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.phone}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      color='primary'
                      disabled={!isValid || !dirty}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        handleSubmit()
                      }}
                      type='submit'>
                      Добавить
                    </Button>
                  </Form>
                </Card>
              </div>
            </div>
          )
        }}
      </Formik>
    </div>
  )
}

export default FormPage
