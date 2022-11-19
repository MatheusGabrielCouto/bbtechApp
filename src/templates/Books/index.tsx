import React, { useEffect, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'

import Button from 'components/Button'
import InputText from 'components/InputText'
import Pagination from 'components/Pagination'
import Table from 'components/Table'
import api from 'core/api'

import * as S from './styles'
import { toast } from 'react-toastify'
import SearchInput from 'components/SearchInput'

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

interface Pages {
  from: number
  lastPage: number
}

interface Category {
  id: number
  name: string
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
  const [category, setCategory] = useState<string>()
  const [shelf, setShelf] = useState<string>()
  const [row, setRow] = useState<string>()
  const [collum, setCollum] = useState<string>()
  const [typeModal, setTypeModal] = useState<'add' | 'edit'>()
  const [openEdit, setOpenEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openModalCategory, setOpenModalCategory] = useState(false)
  const [allCategories, setAllCategories] = useState<[Category]>()
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
    getCategories()
  }, [])

  const onChange = (imageList: ImageListType) => {
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
      .catch(() => toast.error('Tivemos um erro ao buscar os livros'))
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
      setCategory(book?.category)
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
      setCategory('')
      setOpenEdit(true)
    }
  }

  const editbook = async () => {
    setLoading(true)
    if (typeModal === 'edit') {
      api
        .post(`/books/${book?.id}?_method=PATCH`, {
          library_id: 1,
          name,
          description,
          classification,
          author,
          publisher,
          amount: Number(amount),
          place: {
            shelf,
            row,
            column: collum
          },
          category: 1
        })
        .then(() => {
          setLoading(false)
          getbooks()
          setOpenEdit(false)
          toast.success('Livro alterado com sucesso!')
        })
        .catch(() => {
          toast.error('Tivemos um problema ao alterar os dados do livro!')
          setLoading(false)
        })
    } else {
      const data = {
        library_id: 1,
        name,
        description,
        classification,
        author,
        publisher,
        amount: Number(amount),
        place: {
          shelf,
          row,
          column: collum
        },
        category: 1
      }
      api
        .post(`/books`, data)
        .then(() => {
          toast.success('Livro criado com sucesso!')
          getbooks()
          setLoading(false)
          setOpenEdit(false)
        })
        .catch(() => {
          toast.error('Tivemos um problema ao criar o livro!')
          setLoading(false)
        })
    }
  }

  const getCategories = async () => {
    api
      .get('/categories')
      .then((resp) => {
        setAllCategories(resp.data.data)
      })
      .catch(() => {
        toast.error('Tivemos um erro ao buscar as categorias')
      })
  }

  const createCategory = async (key: string) => {
    if (key === 'Enter') {
      setOpenModalCategory(true)
    } else if (key === 'save') {
      api
        .post('/categories', {
          name: category
        })
        .then(() => {
          getCategories()
          setOpenModalCategory(false)
          toast.success('Categoria criada com sucesso')
        })
        .catch(() => {
          setOpenModalCategory(false)
          toast.error('Tivemos um erro ao criar as categorias')
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
              <S.Label>Classificação</S.Label>
              <S.InputSelect
                onChange={({ target }) => {
                  setClassification(target.value)
                }}
              >
                <S.InputOption disabled selected>
                  Selecione um tipo
                </S.InputOption>
                <S.InputOption value="municipal">Municipal</S.InputOption>
                <S.InputOption value="state">Estadual</S.InputOption>
              </S.InputSelect>
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
          <S.FormData>
            <SearchInput
              type="text"
              label="Categoria"
              allCategories={allCategories}
              value={category}
              onChange={setCategory}
              placeholder="Digite aqui"
              keyPress={createCategory}
            />
          </S.FormData>
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
              loading={loading}
              label="Salvar"
              onPress={editbook}
            />
          </S.FormData>
        </S.FormContainer>
      </S.ModalEditContainer>
      {openModalCategory === true && (
        <S.ModalCreateCategory>
          <S.CreateCategoryContainer>
            <S.CreateCategoryTitle>
              Não existe essa categoria, deseja criar uma?
            </S.CreateCategoryTitle>
            <S.CreateCategoryButtons>
              <div style={{ width: '49%' }}>
                <Button
                  style={{ backgroundColor: '#2E2E2E' }}
                  disabled={false}
                  loading={loading}
                  label="Não"
                  onPress={() => setOpenModalCategory(false)}
                />
              </div>
              <div style={{ width: '49%' }}>
                <Button
                  disabled={false}
                  loading={loading}
                  label="Sim"
                  onPress={() => createCategory('save')}
                />
              </div>
            </S.CreateCategoryButtons>
          </S.CreateCategoryContainer>
        </S.ModalCreateCategory>
      )}
    </S.Container>
  )
}
