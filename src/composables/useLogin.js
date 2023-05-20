import { ref } from 'vue'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete the login')
    }
    error.value = null
    isPending.value = false
    console.log(res.user)
    return res
  } catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin
