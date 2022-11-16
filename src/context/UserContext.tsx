import api from 'core/api'
import Router from 'next/router'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'

interface UserData {
  created_at: string
  deleted_at: null
  email: string
  email_verified_at: null
  id: number
  institution_id: string
  is_admin: string
  name: string
  status: string
  type: string
  updated_at: string
  username: string
}

interface UserContext {
  token: string
  setToken: Dispatch<SetStateAction<string>>
  userData: UserData | undefined
  setUserData: (data: UserData) => void
  auth: boolean
  setAuth: (data: boolean) => void
  loading: boolean
  setLoading: (data: boolean) => void
}

export const UserContext = createContext({} as UserContext)

export function UserProvider({ children }: any) {
  const [token, setToken] = useState('')
  const [userData, setUserData] = useState<UserData>()
  const [auth, setAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const tokenLocal: string | null = localStorage.getItem('token')
    if (tokenLocal !== null) {
      verifyToken(tokenLocal)
    } else {
      setAuth(false)
      Router.push('/')
      setLoading(false)
    }
  }, [])

  const verifyToken = (tokenLocal: string | null) => {
    api
      .get('auth/me', {
        headers: {
          Authorization: `Bearer ${tokenLocal}`
        }
      })
      .then((resp) => {
        setAuth(true)
        setLoading(false)
        setUserData(resp.data)
      })
      .catch((error) => {
        setLoading(false)
        Router.push('/')
      })
  }

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        userData,
        setUserData,
        setAuth,
        auth,
        loading,
        setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
