import styled from 'styled-components'
import theme from 'styles/theme'

const colors = theme.colors

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

export const PageContainer = styled.div`
  flex: 1;
`

export const Header = styled.div`
  margin-top: 5%;
  border-top: 1px solid ${colors.w05};
`

export const HeaderTitle = styled.h1`
  color: ${colors.w09};
  font-size: 2.5rem;
  padding: 1% 2%;
`

export const ViewContainer = styled.div``
