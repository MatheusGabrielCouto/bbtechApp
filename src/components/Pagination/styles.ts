import styled from 'styled-components'
import theme from 'styles/theme'

const colors = theme.colors

export const Container = styled.div`
  width: 18%;
  height: 100%;
  background-color: ${colors.l12};
  color: ${colors.w01};
  border-radius: 0 10px 10px 0;
  position: relative;

  @media (max-width: ${theme.breakpoints.br1}px) {
    display: none;
  }
`

export const PerfilContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
`

export const PerfilImage = styled.img`
  width: 20%;
`

export const PerfilName = styled.h2`
  font-weight: 600;
  font-size: 2rem;
  margin-left: 10px;
`

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 70%;
  margin: 10px auto;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
`

export const ItemImage = styled.img``

export const ItemText = styled.h3`
  margin-left: 15px;
  font-size: 1.5rem;
  font-weight: 400;
`

export const ItemTextExit = styled.h3`
  margin-right: 10px;
  font-size: 1.5rem;
  font-weight: 400;
`

export const ExitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 10px auto;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
`
