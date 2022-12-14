import { UserContext } from 'context/UserContext'
import api from 'core/api'
import Router from 'next/router'
import React, { useContext } from 'react'

import * as S from './styles'

interface IProps {
  page: string
}

export default function Pagination({ page }: IProps) {
  const { userData, setAuth, setUserData } = useContext(UserContext)

  const pages = [
    {
      title: 'Página inicial',
      page: '/home'
    },
    {
      title: 'Livros',
      page: '/books'
    },
    {
      title: 'Alunos',
      page: '/students'
    },
    {
      title: 'locações',
      page: '/locations'
    }
  ]

  const navigate = (link: string) => {
    Router.push(`${link}`)
  }

  const logout = async () => {
    const tokenLocal: string | null = await localStorage.getItem('token')
    api
      .post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenLocal}`
          }
        }
      )
      .then(() => {
        setAuth(false)
        localStorage.removeItem('token')
        Router.push('/login')
        const userData = {
          created_at: '',
          deleted_at: null,
          email: '',
          email_verified_at: null,
          id: 0,
          institution_id: '',
          is_admin: '',
          name: '',
          status: '',
          type: '',
          updated_at: '',
          username: ''
        }
        setUserData(userData)
      })
      .catch((error) => console.log(error))
  }

  return (
    <S.Container>
      <S.PerfilContainer>
        <S.PerfilImage src="/icons/book.svg" />
        <S.PerfilName>{userData?.name}</S.PerfilName>
      </S.PerfilContainer>
      {userData?.is_admin === '1' ? (
        pages.map((pagemap, index) => (
          <S.ItemContainer
            style={{
              backgroundColor: pagemap.page === page ? '#655EEE' : 'none'
            }}
            key={index}
            onClick={() => {
              navigate(pagemap.page)
            }}
          >
            <S.ItemImage src="/icons/book-open.svg" />
            <S.ItemText>{pagemap.title}</S.ItemText>
          </S.ItemContainer>
        ))
      ) : (
        <S.ItemContainer
          style={{
            backgroundColor: '#655EEE'
          }}
        >
          <S.ItemImage src="/icons/book-open.svg" />
          <S.ItemText>Página inicial</S.ItemText>
        </S.ItemContainer>
      )}
      <S.ExitContainer onClick={logout}>
        <S.ItemTextExit>Sair</S.ItemTextExit>
        <S.ItemImage src="/icons/log-out.svg" />
      </S.ExitContainer>
    </S.Container>
  )
}
