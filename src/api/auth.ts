import { LoginFormDTO, LoginResponseDTO, RegisterFormDTO, RegisterResponseDTO, User } from '@/api/dto/auth.dto'
import axios from '@/core/axios'
import { destroyCookie } from 'nookies'
import { AxiosError, isAxiosError } from 'axios'

export const login = async (values: LoginFormDTO): Promise<LoginResponseDTO> => {
  return (await axios.post('/auth/login', values)).data
}

export const register = async (values: RegisterFormDTO): Promise<RegisterResponseDTO> => {
  try {
    const response = await axios.post('/auth/register', values)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message
        throw new Error(errorMessage)
      } else {
        throw error
      }
    } else {
      throw error
    }
  }
}

export const getMe = async (): Promise<User> => {
  return (await axios.get('/users/me')).data
}

export const logout = () => {
  destroyCookie(null, '_token', { path: '/' })
}
