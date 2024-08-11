import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCreateJobMutation } from './state/jobHunterApiSlice'
import { selectUser, selectIsAuthenticated } from './state/authSlice'
import { useState, useEffect } from 'react'
import { getSalaryRange } from './Salary'
import Alert from '@mui/material/Alert'

const CreateJob = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const [createJob, {isLoading: isLoading}] = useCreateJobMutation()

  const [job, setJob] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: 0,
    salaryTo: 100000,
    type: 'full-time',
    city: '',
    homeOffice: false
  })

  const [createStatus, setCreateStatus] = useState(null)

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isAuthenticated && user.role === 'company') {
      job.homeOffice = Boolean(job.homeOffice)
      console.log(job)
      createJob(job)
        .unwrap()
        .then((payload) => {
          setCreateStatus({ severity: 'success', message: 'Job created successfully' })
          navigate(`/job/${payload.id}`)
        })
        .catch((error) => {
          console.log(error)
          const message = error.data ? error.data.message : 'An unexpected error occurred'
          setCreateStatus({ severity: 'error', message: message })
        })
    }
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <>
      {createStatus && <Alert severity={createStatus.severity}>{createStatus.message}</Alert>}
      <div id='job-header' className='flex-row'>
        <div className='flex-row'>
          <h1>{job.position}</h1>
        </div>
        <div className='flex-col'>
          <h3>{getSalaryRange(job.salaryFrom, job.salaryTo)}</h3>
        </div>
      </div>
      <form className='details flex-col'>
        <div className='details-row'>
          <h2>Job details</h2>
          <input type='submit' id='job-button' value='Create job' onClick={handleSubmit} />
        </div>
        <div className='details-row'>
          <h3>Company</h3>
          <input name='company' type='text' value={job.company} onChange={handleChange} />
        </div>
        <div className='details-row'>
          <h3>Position</h3>
          <input name='position' type='text' value={job.position} onChange={handleChange} />
        </div>
        <div className='details-row'>
          <h3>Description</h3>
          <textarea 
          name='description'
          value={job.description} 
          rows='10'
          onChange={handleChange}
          />
        </div>
        <div className='details-row'>
          <h3>Salary range</h3>
          <div className='flex-row start'>
            <input name='salaryFrom' type='text' value={job.salaryFrom} onChange={(e) => setJob({ ...job, salaryFrom: Number(e.target.value) })} />
            <span> - </span>
            <input name='salaryTo' type='text' value={job.salaryTo} onChange={(e) => setJob({ ...job, salaryTo: Number(e.target.value) })} />
          </div>
        </div>
        <div className='details-row'>
          <h3>Employment</h3>
          <div className='flex-row start'>
            <div>
              <input type='radio' id='full-time' name='type' value='full-time' checked={job.type === 'full-time'} onChange={handleChange} />
              <label className='custom-radio' htmlFor='full-time'>
                  <span className='radio-text'>Full time</span>
              </label>
            </div>
            <div>
              <input type='radio' id='part-time' name='type' value='part-time' checked={job.type === 'part-time'} onChange={handleChange} />
              <label className='custom-radio' htmlFor='part-time'>
                  <span className='radio-text'>Part time</span>
              </label>
            </div>
            <div>
              <input type='radio' id='internship' name='type' value='internship' checked={job.type === 'internship'} onChange={handleChange} />
              <label className='custom-radio' htmlFor='internship'>
                  <span className='radio-text'>Part time</span>
              </label>
            </div>
          </div>
        </div>
        <div className='details-row'>
          <h3>Location</h3>
          <input name='city' type='text' value={job.city} onChange={handleChange} />
        </div>
        <div className='details-row'>
          <h3>Home office</h3>
          <div className='flex-row start'>
            <input type='checkbox' id='home-office' name='homeOffice' value={job.homeOffice} checked={job.homeOffice} onChange={() => setJob({ ...job, homeOffice: !job.homeOffice })} />
          </div>
        </div>
      </form>
    </>
  )
}

export default CreateJob;
