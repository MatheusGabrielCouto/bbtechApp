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
  z-index: 1;
`

export const FormContainer = styled.div`
  width: 20%;
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

export const FormData = styled.div`
  display: flex;
  justify-content: space-between;
`

export const FormDataRow = styled.div`
  width: 32%;
`

export const ImageDragContanier = styled.div`
  width: 100%;
  padding: 30px 0;
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

export const StudentContainer = styled.div`
  flex: 1;
  background-color: ${colors.w03};
  border-radius: 10px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`
export const StudentCollum = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
`

export const StudentInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`

export const StudentTitle = styled.h2`
  color: ${colors.w10};
  margin-bottom: 5px;
  font-size: 2rem;
`

export const StudentDesc = styled.h3`
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

export const InputCheckContainer = styled.div``

export const InputCheckbox = styled.input``

export const CreateCategoryContainer = styled.div`
  width: 20%;
  height: 20%;
  background-color: ${colors.w02};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 3;
`

export const CreateCategoryTitle = styled.h2`
  margin-top: 10%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0 25px;
`

export const CreateCategoryButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 10px auto;
`

export const Label = styled.p`
  color: ${colors.w10};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 3px;
  margin-left: 3px;
`
export const InputSelect = styled.select`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  border: 1px solid ${colors.w07};
  padding: 0 5px;
  font-size: 1.5rem;
  color: ${colors.w10};
  background-color: transparent;
`

export const InputOption = styled.option``
