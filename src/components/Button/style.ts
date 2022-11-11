import styled from 'styled-components'
import theme from 'styles/theme'

const colors = theme.colors

export const ButtonContainer = styled.div`
  width: 100%;
`

export const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: ${colors.l05};
  border-radius: 10px;
  border: none;
  color: ${colors.w01};
  font-weight: 700;
  cursor: pointer;

  :disabled {
    background-color: ${colors.w03};
    cursor: auto;
  }
`
