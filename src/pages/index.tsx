import { ToastContainer } from 'react-toastify'
import Login from 'templates/Login'

import 'react-toastify/dist/ReactToastify.css'

export default function index() {
  return (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}
