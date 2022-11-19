import Pagination from 'components/Pagination'
import Table from './components/Table'
import api from 'core/api'
import React, { useEffect, useState } from 'react'

import * as S from './styles'
import Button from 'components/Button'
import { toast } from 'react-toastify'

interface Rent {
  id: number
  due_date: string
  rented_by: string
  book: {
    id: number
    library_id: string
    name: string
    description: string
    classification: string
    author: string
    publisher: string
    amount: string
    avatar: string
    status: string
    category: string
    place: {
      shelf: string
      row: string
      collum: string
    }
  }
  user: {
    institution_id: string
    id: number
    name: string
    username: string
    email: string
    type: string
    status: string
    is_admin: boolean
  }
}

interface Pages {
  from: number
  lastPage: number
}

export default function Locations() {
  const [rents, setRents] = useState<[Rent]>()
  const [rent, setRent] = useState<Rent>()
  const [pages, setPages] = useState<Pages>()
  const [openEdit, setOpenEdit] = useState(false)

  const tableHead = [
    {
      title: 'Código',
      width: '20%'
    },
    {
      title: 'Nome do livro',
      width: '30%'
    },
    {
      title: 'Nome aluno',
      width: '30%'
    },
    {
      title: 'Vencimento',
      width: '20%'
    }
  ]

  useEffect(() => {
    getRents()
  }, [])

  const getRents = () => {
    const token = localStorage.getItem('token')
    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`
    }
    api
      .get('/rents', {
        params: {
          perPage: 10
        }
      })
      .then((resp) => {
        console.log(resp.data.data)
        setRents(resp.data.data)
        setPages({
          from: resp.data.current_page,
          lastPage: resp.data.last_page
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const openModal = () => {
    setOpenEdit(true)
  }

  const navigatePage = (page: number) => {
    api
      .get(`/rents?page=${page}`, {
        params: {
          perPage: 10
        }
      })
      .then((resp) => {
        setRents(resp.data)
        setPages({
          from: resp.data.current_page,
          lastPage: resp.data.last_page
        })
      })
      .catch((error) => console.log(error))
  }

  const deleteLocation = () => {
    api
      .post(`/rents/${rent?.id}/return`)
      .then(() => {
        setOpenEdit(false)
        setRent(undefined)
        getRents()
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ||
            'Tivemos um erro ao finalizar a locação!'
        )
      })
  }

  const returnDate = (value: string) => {
    const date = new Date(value)
    const fullYear = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    return `${day}/${month}/${fullYear}`
  }

  return (
    <S.Container>
      <Pagination page="/locations" />
      <S.PageContainer>
        <S.Header>
          <S.HeaderTitle>Alunos</S.HeaderTitle>
        </S.Header>
        <S.ViewContainer>
          {rents !== undefined && (
            <Table
              options={tableHead}
              setItem={setRent}
              itemSelect={rent}
              navigatePage={navigatePage}
              items={rents}
              pages={pages}
            />
          )}
          {rent !== undefined && (
            <S.StudentContainer>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>Identificação</S.StudentTitle>
                  <S.StudentDesc>{rent.id}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Nome do livro</S.StudentTitle>
                  <S.StudentDesc>{rent.book.name}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Nome do aluno</S.StudentTitle>
                  <S.StudentDesc>{rent.user.name}</S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>E-mail do aluno</S.StudentTitle>
                  <S.StudentDesc>{rent.user.email}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Nome de usuário</S.StudentTitle>
                  <S.StudentDesc>{rent.user.username}</S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>Data de vencimento</S.StudentTitle>
                  <S.StudentDesc>{returnDate(rent.due_date)}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Locador</S.StudentTitle>
                  <S.StudentDesc>{rent.rented_by}</S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.OpenButtonContainer onClick={() => openModal()}>
                <S.OpenButton src="icons/edit.svg" />
              </S.OpenButtonContainer>
            </S.StudentContainer>
          )}
        </S.ViewContainer>
      </S.PageContainer>
      <S.ModalEditContainer
        style={{ display: openEdit === true ? 'flex' : 'none' }}
      >
        <S.CreateCategoryContainer>
          <S.CreateCategoryTitle>
            Deseja encerrar a locação?
          </S.CreateCategoryTitle>
          <S.CreateCategoryButtons>
            <div style={{ width: '49%' }}>
              <Button
                style={{ backgroundColor: '#2E2E2E' }}
                disabled={false}
                loading={false}
                label="Não"
                onPress={() => setOpenEdit(false)}
              />
            </div>
            <div style={{ width: '49%' }}>
              <Button
                disabled={false}
                loading={false}
                label="Sim"
                onPress={() => deleteLocation()}
              />
            </div>
          </S.CreateCategoryButtons>
        </S.CreateCategoryContainer>
      </S.ModalEditContainer>
    </S.Container>
  )
}
