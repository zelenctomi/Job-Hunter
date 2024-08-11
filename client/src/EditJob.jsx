import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetJobQuery, useEditJobMutation } from './state/jobHunterApiSlice'
import { selectUser, selectIsAuthenticated } from './state/authSlice'
import { useState, useEffect } from 'react'
import { getSalaryRange } from './Salary'
import Alert from '@mui/material/Alert'

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const { data, error, isLoading } = useGetJobQuery(id)
  const [ editJob, { isLoading: isEditing } ] = useEditJobMutation() // add refetch

  const [job, setJob] = useState({
    company: '',
    position: '',
    description: '',
    salaryFrom: 0,
    salaryTo: 0,
    type: 'full-time',
    city: '',
    homeOffice: false
  })

  const [editStatus, setEditStatus] = useState(null)

  useEffect(() => {
    if (!isLoading) {
      const { company, position, description, salaryFrom, salaryTo, type, city, homeOffice } = data
      setJob({ company, position, description, salaryFrom, salaryTo, type, city, homeOffice })
    }
  }, [data, isLoading, id])

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isAuthenticated && user.role === 'company') {
      job.homeOffice = Boolean(job.homeOffice)
      console.log(job)
      editJob({ id, job })
        .unwrap()
        .then((payload) => {
          setEditStatus({ severity: 'success', message: 'Job updated successfully' })
        })
        .catch((error) => {
          console.log(error)
          const message = error.data ? error.data.message : 'An unexpected error occurred'
          setEditStatus({ severity: 'error', message: message })
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
      {editStatus && <Alert severity={editStatus.severity}>{editStatus.message}</Alert>}
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
          <input type='submit' id='job-button' value='Save changes' onClick={handleSubmit} />
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

export default EditJob;
