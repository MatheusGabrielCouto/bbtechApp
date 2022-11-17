import Pagination from 'components/Pagination'
import Table from './components/Table'
import api from 'core/api'
import React, { useEffect, useState } from 'react'

import * as S from './styles'
import InputText from 'components/InputText'
import Button from 'components/Button'

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
  const [instituition, setInstituition] = useState<string>()
  const [name, setName] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [isAdmin, setIsAdmin] = useState<boolean>()
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
        console.log(resp.data)
        setStudents(resp.data)
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
      setInstituition(student?.institution_id)
      setName(student?.name)
      setEmail(student?.email)
      setIsAdmin(student?.is_admin)
      setTypeModal('edit')
    } else {
      setTypeModal('add')
      setInstituition('')
      setName('')
      setEmail('')
      setIsAdmin(false)
      setOpenEdit(true)
    }
  }

  const editStudent = async () => {
    if (typeModal === 'edit') {
      api
        .post(`/Students/${student?.id}?_method=PATCH`, {
          institution_id: 1,
          name,
          email,
          password,
          instituition,
          isAdmin
        })
        .then((resp) => {
          console.log(resp.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      api
        .post(`/Students/${student?.id}?_method=PATCH`, {
          institution_id: 1,
          name,
          email,
          password,
          instituition,
          isAdmin
        })
        .then((resp) => {
          console.log(resp.data)
        })
        .catch((error) => {
          console.log(error)
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
                  <S.StudentTitle>Código</S.StudentTitle>
                  <S.StudentDesc>{student.id}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Nome do livro</S.StudentTitle>
                  <S.StudentDesc>{student.name}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Status</S.StudentTitle>
                  <S.StudentDesc>
                    {student.status === 'active' ? 'Livre' : 'Locado'}
                  </S.StudentDesc>
                </S.StudentInformation>
              </S.StudentCollum>
              <S.StudentCollum>
                <S.StudentInformation>
                  <S.StudentTitle>Autor</S.StudentTitle>
                  <S.StudentDesc>{student.email}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Publicadora</S.StudentTitle>
                  <S.StudentDesc>{student.institution_id}</S.StudentDesc>
                </S.StudentInformation>
                <S.StudentInformation>
                  <S.StudentTitle>Descrição</S.StudentTitle>
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
              label="Nome do livro"
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <S.FormData style={{ width: '30%' }}>
              <InputText
                type="text"
                label="Senha"
                value={password}
                onChange={setPassword}
                placeholder="Digite aqui"
              />
            </S.FormData>
            <S.FormData style={{ width: '68%' }}>
              <InputText
                type="text"
                label="Instituição"
                value={instituition}
                onChange={setInstituition}
                placeholder="Digite aqui"
              />
            </S.FormData>
          </div>
          <S.FormData>
            <S.InputCheckbox
              type="checkbox"
              onChange={() => setIsAdmin(!isAdmin)}
              value={isAdmin ? isAdmin : false}
            />
          </S.FormData>

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
