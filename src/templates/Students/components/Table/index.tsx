/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'

import * as S from './styles'

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

interface IProps {
  items: [Student]
  pages: Pages | undefined
  itemSelect: Student | undefined
  navigatePage: (page: number | any) => void
  setItem: (data: any) => void
  options: [IHead] | any
  openModal: (type: 'add' | 'edit') => void
}

interface IHead {
  title: string
  width: string
}

interface Pages {
  from: number
  lastPage: number
}

export default function Table({
  items,
  pages,
  navigatePage,
  setItem,
  itemSelect,
  options,
  openModal
}: IProps) {
  const [allPages, setAllPages] = useState<any>()

  const renderPages = () => {
    if (pages?.lastPage !== undefined) {
      const data = []
      for (let index = 1; index <= pages?.lastPage; index++) {
        console.log(pages?.lastPage)
        data.push(index)
      }
      setAllPages(data)
    }
  }

  useEffect(() => {
    renderPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <S.Container>
      <S.IconCreate onClick={() => openModal('add')} src="icons/add.svg" />
      <S.TableContent>
        <S.HeaderTableContent>
          <S.HeaderTable>
            {options.map((option: IHead, index: number) => (
              <S.HeaderTitles key={index} style={{ width: option.width }}>
                {option.title}
              </S.HeaderTitles>
            ))}
          </S.HeaderTable>
        </S.HeaderTableContent>
        <S.ItemTable>
          {items.map((item, index) => (
            <S.ItemContainer
              onClick={() => {
                setItem(item)
              }}
              style={
                itemSelect?.id === item.id
                  ? { backgroundColor: '#B1ADF5', color: '#F7F7F7' }
                  : {}
              }
              key={index}
            >
              <S.ItemValue
                style={itemSelect?.id === item.id ? { color: '#F7F7F7' } : {}}
              >
                {item.id}
              </S.ItemValue>
              <S.ItemValue
                style={itemSelect?.id === item.id ? { color: '#F7F7F7' } : {}}
              >
                {item.name}
              </S.ItemValue>
              <S.ItemValue
                style={itemSelect?.id === item.id ? { color: '#F7F7F7' } : {}}
              >
                {item.status === 'active' ? 'Livre' : 'Locado'}
              </S.ItemValue>
              <S.ItemValue
                style={itemSelect?.id === item.id ? { color: '#F7F7F7' } : {}}
              >
                {item.email}
              </S.ItemValue>
            </S.ItemContainer>
          ))}
        </S.ItemTable>
      </S.TableContent>
      <S.PagesContainer>
        <S.Icon
          onClick={() => {
            if (pages?.from) {
              if (pages?.from !== 0) {
                navigatePage(pages?.from - 1)
              }
            }
          }}
          src="icons/chevron-left.svg"
        />
        {allPages?.map((page: any) => (
          <S.Page
            onClick={() => navigatePage(page)}
            style={pages?.from === page ? { backgroundColor: '#DEDEDE' } : {}}
            key={page}
          >
            {page}
          </S.Page>
        ))}
        <S.Icon
          onClick={() => {
            if (pages?.from) {
              if (pages?.from !== pages?.lastPage) {
                navigatePage(pages?.from + 1)
              }
            }
          }}
          src="icons/chevron-right.svg"
        />
      </S.PagesContainer>
    </S.Container>
  )
}
