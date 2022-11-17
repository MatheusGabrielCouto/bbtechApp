import styled from 'styled-components'
import theme from 'styles/theme'

const colors = theme.colors

export const ModalClose = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const FormContainer = styled.div`
  width: 50%;
  background-color: ${colors.w02};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
`

export const FormTitle = styled.h1`
  text-align: center;
`

export const FormData = styled.div``

export const ImageDragContanier = styled.div`
  width: 100%;
  height: 60px;
  border: 1px dashed ${colors.l01};
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ImageDrag = styled.div`
  font-size: 2rem;
  color: ${colors.l01};
  cursor: pointer;
`

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ImageSelected = styled.img``

export const ButtonImageContainer = styled.div``

export const ButtonImage = styled.div``
