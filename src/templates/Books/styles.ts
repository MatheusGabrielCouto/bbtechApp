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
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  margin-top: 5%;
  border-top: 1px solid ${colors.w05};
`

export const HeaderTitle = styled.h1`
  color: ${colors.w09};
  font-size: 2.5rem;
  padding: 1% 2% 0 2%;
`

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1% 2%;
  border-radius: 10px;
  padding: 1rem;
  height: 100%;
  background-color: ${colors.w01};
`

export const BookContainer = styled.div`
  flex: 1;
  background-color: ${colors.w03};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`
export const BookCollum = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
`

export const BookInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`

export const BookTitle = styled.h2`
  color: ${colors.w10};
  margin-bottom: 5px;
  font-size: 2rem;
`

export const BookDesc = styled.h3`
  color: ${colors.w07};
  font-size: 1.8rem;
  font-weight: 500;
`

export const OpenButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  padding: 10px;
  border-radius: 50px;
  background-color: ${colors.w05};
`

export const OpenButton = styled.img``

export const ModalEditContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

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
