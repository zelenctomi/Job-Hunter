import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuthenticateMutation } from '../state/jobHunterApiSlice'
import { login } from '../state/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [authenticate, { isLoading, isError, error }] = useAuthenticateMutation()

  const [form, setForm] = useState({
    email: '',
    password: '',
    strategy: 'local'
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await authenticate(form).unwrap()
      dispatch(login(user))
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1 className='align-center'>Sign in</h1>
      <form className='auth-form'>
        <input type='email' id='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} required></input>
        <input type='password' id='password' name='password' placeholder='Password' value={form.password} onChange={handleChange} required></input>
        <input type='submit' value='Log in' onClick={handleSubmit}></input>
      </form>
      <p className='align-center'>No account? <a href='/register'>Create one</a></p>
    </>
  )
}

export default Login