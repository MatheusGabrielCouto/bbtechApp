import React, { useContext, useEffect, useState } from 'react'
import Pagination from 'components/Pagination'
import * as S from './style'
import { UserContext } from 'context/UserContext'
import api from 'core/api'
import Button from 'components/Button'
import StudentInput from 'components/StudentInput'
import { toast } from 'react-toastify'
import BookInput from 'components/BookInput'
import InputText from 'components/InputText'

interface Aluno {
  institution_id: string
  id: 1
  name: string
  username: string
  email: string
  type: 'main' | 'super' | 'library'
  status: string
  is_admin: '1' | '0'
}

interface Book {
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

export default function Home() {
  const { setAuth, setLoading, setUserData } = useContext(UserContext)
  const [openModal, setOpenModal] = useState(false)
  const [alunos, setAlunos] = useState<[Aluno]>()
  const [aluno, setAluno] = useState<Aluno>()
  const [books, setBooks] = useState<[Book]>()
  const [book, setBook] = useState<Book>()
  const [days, setDays] = useState<string>()

  useEffect(() => {
    const tokenLocal: string | null = localStorage.getItem('token')
    getStudets()
    getCategory()
    if (tokenLocal !== null) {
      verifyToken(tokenLocal)
    } else {
      setAuth(false)
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifyToken = (tokenLocal: string | null) => {
    api
      .get('auth/me', {
        headers: {
          Authorization: `Bearer ${tokenLocal}`
        }
      })
      .then((resp) => {
        setAuth(true)
        setLoading(false)
        setUserData(resp.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getStudets = () => {
    const token = localStorage.getItem('token')
    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`
    }
    api
      .get('/users', {
        params: {
          perPage: 99
        }
      })
      .then((resp) => {
        setAlunos(resp.data.data)
      })
      .catch((error) =>
        toast.error(
          error.response.data.message || 'Tivemos um erro ao buscar os alunos'
        )
      )
  }

  const getCategory = () => {
    const token = localStorage.getItem('token')
    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`
    }
    api
      .get('/books', {
        params: {
          perPage: 6
        }
      })
      .then((resp) => {
        setBooks(resp.data.data)
      })
      .catch((error) =>
        toast.error(
          error.response.data.message || 'Tivemos um erro ao buscar os livros'
        )
      )
  }

  const createLocation = () => {
    api
      .post('/rents', {
        book_id: book?.id,
        user_id: aluno?.id,
        days
      })
      .then(() => {
        setOpenModal(false)
        setAluno(undefined)
        setBook(undefined)
        setDays(undefined)
        toast.success('Locação criada')
      })
      .catch((error) => {
        toast.error(error.response.data.message || 'Erro ao criar locação')
      })
  }

  return (
    <S.Container>
      <Pagination page="/home" />
      <S.PageContainer>
        <S.Header>
          <S.HeaderTitle>Página Inicial</S.HeaderTitle>
        </S.Header>
        <S.ViewContainer>
          <S.ButtonContainer>
            <Button
              disabled={false}
              label="Criar locação"
              loading={false}
              onPress={() => {
                setAluno(undefined)
                setBook(undefined)
                setDays(undefined)
                setOpenModal(true)
              }}
            />
          </S.ButtonContainer>
        </S.ViewContainer>
      </S.PageContainer>
      {openModal === true && (
        <S.ModalEditContainer>
          <S.FormContainer>
            <S.FormTitle>Criar locação de Livro</S.FormTitle>
            <S.FormData>
              <StudentInput
                type="text"
                label="Aluno"
                allCategories={alunos}
                value={aluno}
                onChange={setAluno}
                placeholder="Digite aqui"
              />
            </S.FormData>
            <S.FormData>
              <BookInput
                type="text"
                label="Livro"
                allCategories={books}
                value={book}
                onChange={setBook}
                placeholder="Digite aqui"
              />
            </S.FormData>
            <S.FormData style={{ width: '30%' }}>
              <InputText
                type="number"
                label="Quantidade de dias"
                value={days}
                onChange={setDays}
                placeholder="Digite aqui"
              />
            </S.FormData>
            <S.FormData style={{ width: '30%', margin: 'auto' }}>
              <Button
                disabled={false}
                label="Criar locação"
                loading={false}
                onPress={createLocation}
              />
            </S.FormData>
          </S.FormContainer>
          <S.ModalClose onClick={() => setOpenModal(false)} />
        </S.ModalEditContainer>
      )}
    </S.Container>
  )
}
