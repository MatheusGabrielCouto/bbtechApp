import React, { useContext, useEffect } from 'react'
import Pagination from 'components/Pagination'
import * as S from './style'
import { UserContext } from 'context/UserContext'
import api from 'core/api'
import Router from 'next/router'

export default function Home() {
  const { setAuth, setLoading, setUserData } = useContext(UserContext)
  useEffect(() => {
    const tokenLocal: string | null = localStorage.getItem('token')
    if (tokenLocal !== null) {
      verifyToken(tokenLocal)
    } else {
      setAuth(false)
      setLoading(false)
    }
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
      .catch((error) => {
        setLoading(false)
      })
  }
  return (
    <S.Container>
      <Pagination page="/home" />
      <S.PageContainer>
        <S.Header>
          <S.HeaderTitle>Página Inicial</S.HeaderTitle>
        </S.Header>
        <S.ViewContainer></S.ViewContainer>
      </S.PageContainer>
    </S.Container>
  )
}
