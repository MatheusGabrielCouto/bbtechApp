import React, { useState } from 'react'
import * as S from './style'

interface IProps {
  placeholder: string
  value: string | undefined
  onChange: (e: string) => void
  label?: string
  type: 'password' | 'text' | 'number'
  allCategories: [Category] | undefined
  keyPress?: (key: string) => void
}

interface Category {
  id: number
  name: string
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
  label,
  type,
  allCategories,
  keyPress
}: IProps) {
  const [openModal, setOpenModal] = useState(false)
  const [filtered, setFiltered] = useState<Category[] | undefined>()

  const filterCategories = (value: string) => {
    const filteredCategories = allCategories?.filter((category: Category) =>
      category.name.includes(value)
    )
    setFiltered(filteredCategories)
  }

  return (
    <S.InputContainer>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        value={value}
        type={type}
        onKeyDown={(key) => {
          if (keyPress) {
            keyPress(key.key)
          }
        }}
        onChange={({ target }) => {
          onChange(target.value)
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
            filtered?.map((category: Category) => (
              <S.SearchItem
                onClick={() => {
                  onChange(category.name)
                  setOpenModal(false)
                }}
                key={category.id}
              >
                {category.name}
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
