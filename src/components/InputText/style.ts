import styled from 'styled-components'
import theme from 'styles/theme'

const colors = theme.colors

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
`

export const Input = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid ${colors.w07};
  padding: 0 5px;
  font-size: 1.5rem;
  color: ${colors.w10};
  background-color: transparent;

  ::placeholder {
    color: ${colors.w06};
  }
`

export const Label = styled.p`
  color: ${colors.w10};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 3px;
  margin-left: 3px;
`

export const Icon = styled.img`
  position: absolute;
  width: 20px;
  right: 1%;
  top: 50%;
  cursor: pointer;
`
