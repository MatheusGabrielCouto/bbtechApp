/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'

import * as S from './styles'

interface Rent {
  id: number
  due_date: string
  rented_by: string
  book: {
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
  user: {
    institution_id: string
    id: number
    name: string
    username: string
    email: string
    type: string
    status: string
    is_admin: boolean
  }
}

interface IProps {
  items: [Rent] | undefined
  pages: Pages | undefined
  itemSelect: Rent | undefined
  navigatePage: (page: number | any) => void
  setItem: (data: any) => void
  options: [IHead] | any
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
  options
}: IProps) {
  const [allPages, setAllPages] = useState<any>()

  const renderPages = () => {
    if (pages?.lastPage !== undefined) {
      const data = []
      for (let index = 1; index <= pages?.lastPage; index++) {
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
          {items?.map((item, index) => {
            const date = new Date(item.due_date)
            const fullYear = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDate()
            return (
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
                  {item.book.name}
                </S.ItemValue>
                <S.ItemValue
                  style={itemSelect?.id === item.id ? { color: '#F7F7F7' } : {}}
                >
                  {item.user.name}
                </S.ItemValue>
                <S.ItemValue
                  style={itemSelect?.id === item.id ? { color: '#F7F7F7' } : {}}
                >
                  {`${day}/${month}/${fullYear}`}
                </S.ItemValue>
              </S.ItemContainer>
            )
          })}
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
