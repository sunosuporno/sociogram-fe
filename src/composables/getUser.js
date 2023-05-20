import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

const currentUser = ref('')

const getUser = () => {
  return { currentUser }
}

export default getUser
