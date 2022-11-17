import styled from 'styled-components'
import theme from 'styles/theme'

const colors = theme.colors

export const Container = styled.div`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  position: relative;
  margin-bottom: 15px;
  position: relative;
`

export const TableContent = styled.table`
  width: 100%;
  text-align: left;
  border-spacing: 0;
  margin-bottom: 35px;
`

export const HeaderTableContent = styled.thead``

export const IconCreate = styled.img`
  position: absolute;
  background-color: ${colors.green};
  top: 0;
  right: 1%;
  transform: translateY(15%);
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
`

export const HeaderTable = styled.tr`
  background-color: ${colors.w02};
`

export const HeaderTitles = styled.th`
  font-size: 2rem;
  color: ${colors.w06};
  font-weight: 500;
  padding: 5px;
  margin: 0;
`

export const ItemTable = styled.tbody``

export const ItemContainer = styled.tr`
  :hover {
    background-color: ${colors.w04};
    cursor: pointer;
    td {
      color: ${colors.w01} !important;
    }
  }
`

export const ItemValue = styled.td`
  font-size: 1.5rem;
  color: ${colors.w06};
  font-weight: 500;
  padding: 5px 5px;
`

export const PagesContainer = styled.div`
  display: flex;
  position: absolute;
  right: 50%;
  transform: translateX(0%);
  bottom: 0px;
  align-items: center;
`

export const Page = styled.h3`
  cursor: pointer;
  color: ${colors.w08};
  font-size: 1.5rem;
  padding: 0 5px;
  border-radius: 9px;
`

export const Icon = styled.img`
  cursor: pointer;
`
