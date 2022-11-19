import React, { useState } from 'react'
import * as S from './style'

interface IProps {
  placeholder: string
  value: Aluno | undefined
  onChange: (d: Aluno) => void
  label?: string
  type: 'password' | 'text' | 'number'
  allCategories: [Aluno] | undefined
  keyPress?: (key: string) => void
}

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
  const [filtered, setFiltered] = useState<Aluno[] | undefined>()
  const [name, setName] = useState<string | undefined>(value?.name)

  const filterCategories = (value: string) => {
    const filteredCategories = allCategories?.filter((category: Aluno) =>
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
            filtered?.map((aluno: Aluno) => (
              <S.SearchItem
                onClick={() => {
                  onChange(aluno)
                  setName(aluno.name)
                  setOpenModal(false)
                }}
                key={aluno.id}
              >
                {aluno.name}
              </S.SearchItem>
            ))
          ) : (
            <S.SearchItem>
              Não encontramos nenhum aluno com esse nome
            </S.SearchItem>
          )}
        </S.SearchContainer>
      )}
    </S.InputContainer>
  )
}
