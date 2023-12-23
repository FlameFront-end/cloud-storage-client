import { LoginFormDTO, LoginResponseDTO } from '@/api/dto/auth.dto'
import axios from '@/core/axios'
export const login = async (values: LoginFormDTO): Promise<LoginResponseDTO> => {
  return (await axios.post('/auth/login', values)).data
}
