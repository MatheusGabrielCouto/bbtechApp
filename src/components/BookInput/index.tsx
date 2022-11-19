import React, { useState } from 'react'
import * as S from './style'

interface IProps {
  placeholder: string
  value: Book | undefined
  onChange: (d: Book) => void
  label?: string
  type: 'password' | 'text' | 'number'
  allCategories: [Book] | undefined
  keyPress?: (key: string) => void
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

export default function BookInput({
  placeholder,
  value,
  onChange,
  label,
  type,
  allCategories,
  keyPress
}: IProps) {
  const [openModal, setOpenModal] = useState(false)
  const [filtered, setFiltered] = useState<Book[] | undefined>()
  const [name, setName] = useState<string | undefined>(value?.name)

  const filterCategories = (value: string) => {
    const filteredCategories = allCategories?.filter((category: Book) =>
      category.name.includes(value)
    )
    setFiltered(filteredCategories)
  }

  return (
    <S.InputContainer>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        value={name}
        type={type}
        onKeyDown={(key) => {
          if (keyPress) {
            keyPress(key.key)
          }
        }}
        onChange={({ target }) => {
          setName(target.value)
          if (target.value.length > 0) {
            filterCategories(target.value)
            setOpenModal(true)
          } else {
            setOpenModal(false)
          }
        }}
        placeholder={placeholder}
      />

      {openModal === true && (
        <S.SearchContainer>
          {filtered && filtered?.length > 0 ? (
            filtered?.map((book: Book) => (
              <S.SearchItem
                onClick={() => {
                  onChange(book)
                  setName(book.name)
                  setOpenModal(false)
                }}
                key={book.id}
              >
                {book.name}
              </S.SearchItem>
            ))
          ) : (
            <S.SearchItem>Não encontramos nenhuma categoria</S.SearchItem>
          )}
        </S.SearchContainer>
      )}
    </S.InputContainer>
  )
}
