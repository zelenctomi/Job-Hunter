import { useNavigate, useParams } from 'react-router-dom'
import { useGetJobQuery, useApplyForJobMutation, useGetApplicantsQuery } from './state/jobHunterApiSlice'
import { selectUser, selectIsAuthenticated } from './state/authSlice'
import { getSalaryRange } from './Salary'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'

const Job = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const [applyStatus, setApplyStatus] = useState(null)

  const { data: jobData,  isLoading: isLoadingJob, refetch: refetchJob } = useGetJobQuery(id)
  const [job, setJob] = useState(null)
  const [applyForJob, { isLoading: isApplying, isError: isApplyError }] = useApplyForJobMutation()
  const { data: applicants, isLoading: isGettingApplicants, refetch: refetchApplicants } = useGetApplicantsQuery(id, { skip: !isAuthenticated || user.role === 'company' })

  const [canApply, setCanApply] = useState(false)
  useEffect(() => {
    if (!isGettingApplicants && isAuthenticated && user?.role === 'jobseeker') {
      const canUserApply = !applicants || !applicants.find(applicant => applicant.userId === user.id)
      setCanApply(canUserApply)
    }
  }, [isGettingApplicants, isAuthenticated, user, applicants])

  useEffect(() => {
    if (jobData) {
      setJob(jobData)
      refetchJob()
    }
    if (applicants) {
      refetchApplicants()
    }
  }, [applicants, jobData])


  const getButtonText = () => {
    if (isAuthenticated && user.role === 'company') {
      return 'Edit'
    }
    else {
      return 'Apply'
    }
  }

  const handleClick = () => {
    if (isAuthenticated && user.role === 'company') {
      if (job.userId !== user.id) {
        setApplyStatus({severity: 'warning', message: 'Cannot edit jobs created by other users!'})
        return
      }
      navigate(`/edit/${id}`)
    }
    else if (canApply) {
      applyForJob({ jobId: Number(id) })
        .unwrap()
        .then((payload) => {
          setCanApply(false)
          setApplyStatus({severity: 'success', message: 'Successful application!'})
          refetchApplicants()
        })
        .catch((error) => {
          console.log(error)
          const message = error.data ? error.data.message : 'An unexpected error occurred'
          setApplyStatus({severity: 'error', message: message})
        })
    }
    else if (isAuthenticated && user.role === 'jobseeker') {
      setApplyStatus({severity: 'warning', message: 'You have already applied for this job'})
    }
    else {
      navigate('/login')
    }
  }

  if (isLoadingJob) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <>
      {applyStatus && 
      <Alert severity={applyStatus.severity}>
        {applyStatus.message}
      </Alert>
      }
      <div id='job-header' className='flex-row'>
        <div className='flex-row'>
          <h1>{job && job.position}</h1>
          <h3>{job && job.homeOffice ? '🏠 Home office' : ''}</h3>
        </div>
        <div className='flex-col'>
          <h3>{job && getSalaryRange(job.salaryFrom, job.salaryTo)}</h3>
        </div>
      </div>
      <div className='details flex-col'>
        <div className='details-row'>
          <h2>Job details</h2>
          <input type='submit' id='job-button' value={getButtonText()} onClick={handleClick} />
        </div>
        <div className='details-row'>
          <h3>Company</h3>
          <p>{job && job.company}</p>
        </div>
        <div className='details-row'>
          <h3>Position</h3>
          <p>{job && job.position}</p>
        </div>
        <div className='details-row'>
          <h3>Description</h3>
          <p>{job && job.description}</p>
        </div>
        <div className='details-row'>
          <h3>Salary range</h3>
          <p>{job && getSalaryRange(job.salaryFrom, job.salaryTo)}</p>
        </div>
        <div className='details-row'>
          <h3>Employment</h3>
          <p>{job && job.type}</p>
        </div>
        <div className='details-row'>
          <h3>Location</h3>
          <p>{job && job.city}</p>
        </div>
        <div className='details-row'>
          <h3>Home office</h3>
          <p>{job && (job.homeOffice ? 'Yes' : 'No')}</p>
        </div>
      </div>
    </>
  )
}

export default Job