import Pagination from 'components/Pagination'
import Table from './components/Table'
import api from 'core/api'
import React, { useEffect, useState } from 'react'

import * as S from './styles'
import InputText from 'components/InputText'
import Button from 'components/Button'
import { toast } from 'react-toastify'

interface Student {
  institution_id: string
  id: number
  name: string
  username: string
  email: string
  type: string
  status: string
  is_admin: boolean
}

interface Pages {
  from: number
  lastPage: number
}

export default function Students() {
  const [students, setStudents] = useState<[Student]>()
  const [pages, setPages] = useState<Pages>()
  const [student, setStudent] = useState<Student>()
  const [openEdit, setOpenEdit] = useState(false)
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [typeModal, setTypeModal] = useState<'add' | 'edit'>()

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
    getStudents()
  }, [])

  const getStudents = async () => {
    const token = localStorage.getItem('token')
    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`
    }
    api
      .get('/users', {
        params: {
          perPage: 6
        }
      })
      .then((resp) => {
        setStudents(resp.data.data)
        setPages({
          from: resp.data.current_page,
          lastPage: resp.data.last_page
        })
      })
      .catch((error) => console.log(error))
  }

  const openModal = (type: 'edit' | 'add') => {
    if (type === 'edit') {
      setOpenEdit(true)
      setName(student?.name)
      setEmail(student?.email)
      setTypeModal('edit')
    } else {
      setTypeModal('add')
      setName('')
      setEmail('')
      setPassword('')
      setOpenEdit(true)
    }
  }

  const editStudent = async () => {
    if (typeModal === 'edit') {
      api
        .patch(`/users/${student?.id}`, {
          name,
          email,
          password,
          username: student?.username
        })
        .then(() => {
          getStudents()
          toast.success('Usuário alterado com sucesso!')
          setOpenEdit(false)
        })
        .catch(() => {
          toast.success('Tivemos um erro ao editar o usuário!')
        })
    } else {
      api
        .post(`/users`, {
          institution_id: 1,
          name,
          email,
          password,
          passwordConfirmation: password,
          is_admin: false
        })
        .then(() => {
          getStudents()
          toast.success('Usuário criado com sucesso!')
          setOpenEdit(false)
        })
        .catch(() => {
          toast.success('Tivemos um erro ao criar o usuário!')
        })
    }
  }

  const navigatePage = () => {
    console.log('opa')
  }

  return (
    <S.Container>
      <Pagination page="/students" />
      <S.PageContainer>
        <S.Header>
          <S.HeaderTitle>Alunos</S.HeaderTitle>
        </S.Header>
        <S.ViewContainer>
          {students !== undefined && (
            <Table
              openModal={openModal}
              options={tableHead}
              setItem={setStudent}
              itemSelect={student}
              navigatePage={navigatePage}
              items={students}
              pages={pages}
            />
          )}
          {student !== undefined && (
            <S.StudentContainer>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>Identificação</S.StudentTitle>
                  <S.StudentDesc>{student.id}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Nome</S.StudentTitle>
                  <S.StudentDesc>{student.name}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Status</S.StudentTitle>
                  <S.StudentDesc>
                    {student.status === 'active' ? 'Ativo' : 'Cancelado'}
                  </S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>E-mail</S.StudentTitle>
                  <S.StudentDesc>{student.email}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Nome de usuário</S.StudentTitle>
                  <S.StudentDesc>{student.username}</S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>Histórico de locação</S.StudentTitle>
                  <S.StudentDesc>Não locado</S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.OpenButtonContainer onClick={() => openModal('edit')}>
                <S.OpenButton src="icons/edit.svg" />
              </S.OpenButtonContainer>
            </S.StudentContainer>
          )}
        </S.ViewContainer>
      </S.PageContainer>
      <S.ModalEditContainer
        style={{ display: openEdit === true ? 'flex' : 'none' }}
      >
        <S.ModalClose onClick={() => setOpenEdit(false)} />
        <S.FormContainer>
          <S.FormTitle>
            {typeModal === 'add' ? 'Adicionar usuário' : 'Editar usuário'}
          </S.FormTitle>
          <S.FormData>
            <InputText
              type="text"
              label="Nome"
              value={name}
              onChange={setName}
              placeholder="Digite o nome"
            />
          </S.FormData>
          <S.FormData>
            <InputText
              type="text"
              label="E-mail"
              value={email}
              onChange={setEmail}
              placeholder="Digite a descrição"
            />
          </S.FormData>
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center'
            }}
          >
            <S.FormData style={{ width: '30%' }}>
              <InputText
                type="password"
                label="Senha"
                value={password}
                onChange={setPassword}
                placeholder="Digite aqui"
              />
            </S.FormData>
          </div>

          <S.FormData>
            <Button
              disabled={false}
              loading={false}
              label="Salvar"
              onPress={editStudent}
            />
          </S.FormData>
        </S.FormContainer>
      </S.ModalEditContainer>
    </S.Container>
  )
}
