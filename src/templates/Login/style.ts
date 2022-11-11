import styled from 'styled-components'
import theme from 'styles/theme'

export const Main = styled.div`
  background-color: ${theme.colors.w01};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: ${theme.colors.w02};
`

export const Image = styled.img`
  width: 50%;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100%;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`

export const LogoForm = styled.img`
  width: 100px;
`

export const TitleForm = styled.h1`
  margin: 5px 0;
  font-weight: 600;
  font-size: 2.5rem;
  color: ${theme.colors.w12};
`

export const SubtitleForm = styled.p`
  color: ${theme.colors.w06};
  font-size: 1.3rem;
  text-align: center;
  width: 78%;
  margin-bottom: 15px;
`

export const LabelInput = styled.p``
