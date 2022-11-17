import React, { useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'

import Button from 'components/Button'
import InputText from 'components/InputText'
import Pagination from 'components/Pagination'
import Table from 'components/Table'
import api from 'core/api'

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
  place: {
    shelf: string
    row: string
    collum: string
  }
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
  const [shelf, setShelf] = useState<string>()
  const [row, setRow] = useState<string>()
  const [collum, setCollum] = useState<string>()
  const [typeModal, setTypeModal] = useState<'add' | 'edit'>()
  const [openEdit, setOpenEdit] = useState(false)
  const maxNumber = 69

  const [images, setImages] = React.useState([])

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

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex)
    setImages(imageList as never[])
  }

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

  const openModal = (type: 'edit' | 'add') => {
    if (type === 'edit') {
      setName(book?.name)
      setShelf(book?.place?.shelf)
      setRow(book?.place?.row)
      setCollum(book?.place?.collum)
      setDescription(book?.description)
      setAuthor(book?.author)
      setAmount(book?.amount)
      setClassification(book?.classification)
      setPublisher(book?.publisher)
      setTypeModal('edit')
      setOpenEdit(true)
    } else {
      setShelf('')
      setRow('')
      setCollum('')
      setName('')
      setTypeModal('add')
      setDescription('')
      setAuthor('')
      setAmount('')
      setClassification('')
      setPublisher('')
      setOpenEdit(true)
    }
  }

  const editbook = async () => {
    if (typeModal === 'edit') {
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
    } else {
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
              openModal={openModal}
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
              <S.OpenButtonContainer onClick={() => openModal('edit')}>
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
          <S.FormTitle>
            {typeModal === 'add' ? 'Adicionar livro' : 'Editar livro'}
          </S.FormTitle>
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <S.FormData style={{ width: '30%' }}>
              <InputText
                type="text"
                label="Classificação"
                value={classification}
                onChange={setClassification}
                placeholder="Digite aqui"
              />
            </S.FormData>
            <S.FormData style={{ width: '68%' }}>
              <InputText
                type="text"
                label="Autor"
                value={author}
                onChange={setAuthor}
                placeholder="Digite aqui"
              />
            </S.FormData>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <S.FormData style={{ width: '49%' }}>
              <InputText
                type="text"
                label="Publicadora"
                value={publisher}
                onChange={setPublisher}
                placeholder="Digite aqui"
              />
            </S.FormData>
            <S.FormData style={{ width: '49%' }}>
              <InputText
                type="number"
                label="Quantidade"
                value={amount}
                onChange={setAmount}
                placeholder="Digite aqui"
              />
            </S.FormData>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <S.FormDataRow>
              <InputText
                type="text"
                label="Prateleira"
                value={shelf}
                onChange={setShelf}
                placeholder="Digite aqui"
              />
            </S.FormDataRow>
            <S.FormDataRow>
              <InputText
                type="text"
                label="Fileira"
                value={row}
                onChange={setRow}
                placeholder="Digite aqui"
              />
            </S.FormDataRow>
            <S.FormDataRow>
              <InputText
                type="text"
                label="Coluna"
                value={collum}
                onChange={setCollum}
                placeholder="Digite aqui"
              />
            </S.FormDataRow>
          </div>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps
            }) => (
              <>
                {imageList.length === 0 && (
                  <S.ImageDragContanier>
                    <S.ImageDrag
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Aperte ou arraste a imagem aqui
                    </S.ImageDrag>
                  </S.ImageDragContanier>
                )}
                {imageList.map((image, index) => (
                  <S.ImageContainer key={index} className="image-item">
                    <S.ImageSelected src={image.dataURL} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </S.ImageContainer>
                ))}
              </>
            )}
          </ImageUploading>
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
