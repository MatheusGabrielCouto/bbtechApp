import Button from 'components/Button'
import InputText from 'components/InputText'
import { UserContext } from 'context/UserContext'
import api from 'core/api'
import Router from 'next/router'
import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'

import * as S from './style'

const Login = () => {
  const [code, setCode] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { setToken, setAuth } = useContext(UserContext)

  const handleSubmit = () => {
    setLoading(true)
    api
      .post('/auth/login', {
        username: code,
        password
      })
      .then((resp) => {
        localStorage.setItem('token', resp.data.token_key)
        setLoading(false)
        setToken(resp.data.token_key)
        setAuth(true)
        toast.success('Login efetuado!')
        Router.push('/home')
        api.defaults.headers.common = {
          Authorization: `Bearer ${resp.data.token_key}`
        }
      })
      .catch((error) => {
        toast.error('Dados incorretos!')
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <S.Main>
      <S.FormContainer>
        <S.Form>
          <S.LogoForm src="/icons/book.svg" alt="Icone logo" />
          <S.TitleForm>Seja Bem Vindo!</S.TitleForm>
          <S.SubtitleForm>
            Entre com sua conta passada pela escola para acompanhar o livro do
            seu filho.
          </S.SubtitleForm>
          <InputText
            type="text"
            label="Código de acesso"
            value={code}
            onChange={setCode}
            placeholder="Digite aqui"
          />
          <InputText
            type="password"
            label="Senha"
            value={password}
            onChange={setPassword}
            placeholder="Digite aqui"
          />
          <Button
            loading={loading}
            onPress={handleSubmit}
            disabled={password !== '' && code !== '' ? false : true}
            label="ENTRAR"
          />
        </S.Form>
      </S.FormContainer>
      <S.ImageContainer>
        <S.Image
          src="img/login-illustration.svg"
          alt="Imagem da pessoa mostrando um livro"
        />
      </S.ImageContainer>
    </S.Main>
  )
}

export default Login
