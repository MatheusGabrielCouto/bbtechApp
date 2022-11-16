import Button from 'components/Button'
import InputText from 'components/InputText'
import Pagination from 'components/Pagination'
import Table from 'components/Table'
import api from 'core/api'
import React, { useEffect, useState } from 'react'

import * as S from './styles'

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
}

interface Pages {
  from: number
  lastPage: number
}

export default function Books() {
  const [books, setBooks] = useState<[Book]>()
  const [pages, setPages] = useState<Pages>()
  const [book, setBook] = useState<Book>()
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [classification, setClassification] = useState<string>()
  const [author, setAuthor] = useState<string>()
  const [publisher, setPublisher] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [openEdit, setOpenEdit] = useState(false)

  const tableHead = [
    {
      title: 'Código',
      width: '20%'
    },
    {
      title: 'Nome',
      width: '30%'
    },
    {
      title: 'Status',
      width: '20%'
    },
    {
      title: 'Autor',
      width: '30%'
    }
  ]

  useEffect(() => {
    getbooks()
  }, [])

  const getbooks = async () => {
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
        setPages({
          from: resp.data.current_page,
          lastPage: resp.data.last_page
        })
      })
      .catch((error) => console.log(error))
  }

  const navigatePage = (page: number) => {
    api
      .get(`/books?page=${page}`, {
        params: {
          perPage: 6
        }
      })
      .then((resp) => {
        setBooks(resp.data.data)
        setPages({
          from: resp.data.current_page,
          lastPage: resp.data.last_page
        })
      })
      .catch((error) => console.log(error))
  }

  const openModalEdit = () => {
    setName(book?.name)
    setDescription(book?.description)
    setAuthor(book?.author)
    setAmount(book?.amount)
    setClassification(book?.classification)
    setPublisher(book?.publisher)
    setOpenEdit(true)
  }

  const editbook = async () => {
    api
      .post(`/books/${book?.id}?_method=PATCH`, {
        library_id: '1',
        name,
        description,
        classification,
        author,
        publisher,
        amount,
        avatar: null,
        status: true
      })
      .then((resp) => {
        console.log(resp.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <S.Container>
      <Pagination page="/books" />
      <S.PageContainer>
        <S.Header>
          <S.HeaderTitle>Livros</S.HeaderTitle>
        </S.Header>
        <S.ViewContainer>
          {books !== undefined && (
            <Table
              options={tableHead}
              setItem={setBook}
              itemSelect={book}
              navigatePage={navigatePage}
              books={books}
              pages={pages}
            />
          )}
          {book !== undefined && (
            <S.BookContainer>
              <S.BookCollum>
                <S.BookInformation>
                  <S.BookTitle>Código</S.BookTitle>
                  <S.BookDesc>{book.id}</S.BookDesc>
                </S.BookInformation>
                <S.BookInformation>
                  <S.BookTitle>Nome do livro</S.BookTitle>
                  <S.BookDesc>{book.name}</S.BookDesc>
                </S.BookInformation>
                <S.BookInformation>
                  <S.BookTitle>Status</S.BookTitle>
                  <S.BookDesc>
                    {book.status === 'active' ? 'Livre' : 'Locado'}
                  </S.BookDesc>
                </S.BookInformation>
              </S.BookCollum>
              <S.BookCollum>
                <S.BookInformation>
                  <S.BookTitle>Autor</S.BookTitle>
                  <S.BookDesc>{book.author}</S.BookDesc>
                </S.BookInformation>
                <S.BookInformation>
                  <S.BookTitle>Publicadora</S.BookTitle>
                  <S.BookDesc>{book.publisher}</S.BookDesc>
                </S.BookInformation>
                <S.BookInformation>
                  <S.BookTitle>Descrição</S.BookTitle>
                  <S.BookDesc>{book.description}</S.BookDesc>
                </S.BookInformation>
              </S.BookCollum>
              <S.BookCollum>
                <S.BookInformation>
                  <S.BookTitle>Histórico de locação</S.BookTitle>
                  <S.BookDesc>Não locado</S.BookDesc>
                </S.BookInformation>
              </S.BookCollum>
              <S.OpenButtonContainer onClick={openModalEdit}>
                <S.OpenButton src="icons/edit.svg" />
              </S.OpenButtonContainer>
            </S.BookContainer>
          )}
        </S.ViewContainer>
      </S.PageContainer>
      <S.ModalEditContainer
        style={{ display: openEdit === true ? 'flex' : 'none' }}
      >
        <S.ModalClose onClick={() => setOpenEdit(false)} />
        <S.FormContainer>
          <S.FormTitle>Editar livro</S.FormTitle>
          <S.FormData>
            <InputText
              type="text"
              label="Nome do livro"
              value={name}
              onChange={setName}
              placeholder="Digite o nome"
            />
          </S.FormData>
          <S.FormData>
            <InputText
              type="text"
              label="Descrição"
              value={description}
              onChange={setDescription}
              placeholder="Digite a descrição"
            />
          </S.FormData>
          <S.FormData>
            <InputText
              type="text"
              label="Classificação"
              value={classification}
              onChange={setClassification}
              placeholder="Digite aqui"
            />
          </S.FormData>
          <S.FormData>
            <InputText
              type="text"
              label="Autor"
              value={author}
              onChange={setAuthor}
              placeholder="Digite aqui"
            />
          </S.FormData>
          <S.FormData>
            <InputText
              type="text"
              label="Publicadora"
              value={publisher}
              onChange={setPublisher}
              placeholder="Digite aqui"
            />
          </S.FormData>
          <S.FormData>
            <InputText
              type="number"
              label="Quantidade"
              value={amount}
              onChange={setAmount}
              placeholder="Digite aqui"
            />
          </S.FormData>
          <S.FormData>
            <Button
              disabled={false}
              loading={false}
              label="Salvar"
              onPress={editbook}
            />
          </S.FormData>
        </S.FormContainer>
      </S.ModalEditContainer>
    </S.Container>
  )
}
