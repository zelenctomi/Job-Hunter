import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../state/jobHunterApiSlice'

const Register = () => {
  const navigate = useNavigate()
  const [register, { isLoading, isError, error }] = useRegisterMutation()
  
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    role: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(form)
      await register(form).unwrap()
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1 className='align-center'>Sign up</h1>
      <form className='auth-form'>
        <input type='text' id='fullname' name='fullname' placeholder='Name' value={form.fullname} onChange={handleChange} required></input>
        <input type='email' id='email' name='email' placeholder='Email' value={form.email} onChange={handleChange} required></input>
        <input type='password' id='password' name='password' placeholder='Password' value={form.password} onChange={handleChange} required></input>

        <div className='flex-row'>
          <div>
            <input type='radio' id='jobseeker' name='role' value='jobseeker' onChange={handleChange} required></input>
            <label className='custom-radio' htmlFor='jobseeker'>
                <span className='radio-text'>Jobseeker</span>
            </label>
          </div>
          <div>
            <input type='radio' id='company' name='role' value='company' onChange={handleChange} required></input>
            <label className='custom-radio' htmlFor='company'>
                <span className='radio-text'>Company</span>
            </label>
          </div>
        </div>

        <input type='submit' value='Create account' onClick={handleSubmit}></input>
      </form>
    </>
  )
}

export default Register