import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetJobsQuery } from './state/jobHunterApiSlice'
import { getSalaryRange, maxSalary } from './Salary'
import Filter from './filter/Filter'

const Home = () => {
  const navigate = useNavigate()
  const { data: jobs, error, isLoading, refetch } = useGetJobsQuery()

  const [filteredJobs, setFilteredJobs] = useState(null)

  useEffect(() => { 
    if (jobs)
      setFilteredJobs(jobs.data)
      refetch()
  }, [jobs])

  const [filters, setFilters] = useState({
    salaryRange: [0, maxSalary],
    location: '',
    type: [],
    homeOffice: false,
    includes: ''
  })
  const [filterPopupActive, setFilterPopupActive] = useState(false)

  useEffect(() => { // Update filteredJobs when filters change
    if (jobs) {
      setFilteredJobs(jobs.data.filter(job => {
        if (job.salaryFrom < filters.salaryRange[0] || job.salaryTo > filters.salaryRange[1]) {
          return false
        }
        if (filters.location && !job.city.includes(filters.location)) {
          return false
        }
        if (filters.type.length > 0 && !filters.type.includes(job.type)) {
          return false
        }
        if (filters.homeOffice && !job.homeOffice) {
          return false
        }
        if (filters.includes && !job.position.toLowerCase().includes(filters.includes.toLowerCase())) {
          return false
        }
        return true
      }))
    }
  }, [filters])

  useEffect(() => {
    if (error) {
      console.log(error)
    }
  })

  if (isLoading) {
    return (
      <div className='flex-col'>
        <h1>Loading...</h1>
      </div>
    )
  }

  const handleSearch = (event) => {
    const query = event.target.value
    setFilters({...filters, includes: query})
  }

  return (
    <>
      {filterPopupActive &&
        <Filter 
          filters={filters} 
          setFilters={setFilters}
          setActive={setFilterPopupActive}
        />
      }
      <h1 className='align-center'>Find your dream job</h1>
      <div id='search' className='flex-col'>
        <input type='text' id='search-bar' placeholder='Search jobs' value={filters.includes} onChange={handleSearch}></input>
        <button id='filter' onClick={() => setFilterPopupActive(true)}></button>
      </div>
      <div id='jobs'>
        {filteredJobs && filteredJobs.map((job) => (
          <div className='job' key={job.id} onClick={() => navigate(`/job/${job.id}`)}>
            <div className='job-wrapper'>
              <div className='job-title'>{job.position}</div>
              <div className='job-employment'>{job.type}</div>
            </div>
            <div className='job-wrapper'>
              <div className='job-salary'>{getSalaryRange(job.salaryFrom, job.salaryTo)}</div>
            </div>
            <div className='job-wrapper'>
              <div className='job-wrapper-row'>
                <div className='job-location-icon'></div>
                <div className='job-location'>{`${job.city}${job.homeOffice ? ' + 🏠' : ''}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home