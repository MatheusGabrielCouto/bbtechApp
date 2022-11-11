import Login from './Login'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}
