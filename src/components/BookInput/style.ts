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

export const SearchContainer = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  transform: translateY(100%);
  min-height: 40px;
  background-color: ${colors.w02};
  border: 1px solid ${colors.w07};
  max-height: 90px;
  overflow: auto;
  z-index: 3;

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.w01};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.l01};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.l02};
  }
`

export const SearchItem = styled.div`
  padding: 15px 5px;
  font-size: 1.3rem;
  cursor: pointer;
`
