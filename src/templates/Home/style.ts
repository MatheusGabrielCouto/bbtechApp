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

export const ButtonContainer = styled.div`
  width: 200px;
`
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
  min-height: 30%;
  max-height: 90%;
  background-color: ${colors.w02};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${colors.w01};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${colors.l01};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.l02};
  }
`

export const FormTitle = styled.h1`
  text-align: center;
`

export const FormData = styled.div``

export const FormDataRow = styled.div`
  width: 32%;
`
