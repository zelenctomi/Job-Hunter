import { maxSalary, minDistance } from '../Salary'
import RangeSlider from './components/RangeSlider'
import LocationPicker from './components/LocationPicker'
import { useState } from 'react'

const Filter = ({filters, setFilters, setActive}) => {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleSalaryChange = (event) => {
    const value = parseInt(event.target.value)
    if (isNaN(value) || value < 0 || value > maxSalary) {
      return
    }
    const id = event.target.id
    if (id === 'filter-salary-from') {
      setLocalFilters({...localFilters, salaryRange: [value, localFilters.salaryRange[1]]})
    } 
    else {
      setLocalFilters({...localFilters, salaryRange: [localFilters.salaryRange[0], value]})
    }
  }

  const handleTypeChange = (event) => {
    if (event.target.value === 'homeOffice') {
      setLocalFilters({...localFilters, homeOffice: event.target.checked})
    }
    // otherwise, append the checked type to the list of types
    else {
      if (event.target.checked) {
        setLocalFilters({...localFilters, type: [...localFilters.type, event.target.value]})
      }
      // remove the unchecked type from the list of types
      else {
        setLocalFilters({...localFilters, type: localFilters.type.filter(type => type !== event.target.value)})
      }
    }
  }

  const handleApply = () => {
    setFilters(localFilters)
    setActive(false)
  }

  const handleClose = () => {
    setActive(false)
  }

  // Disable scrolling while this component is active
  document.body.style.overflow = 'hidden'
  
  return (
    <>
      <div id='filter-lightbox-bg' onClick={handleClose}></div>
      <div id='filter-lightbox'>
        <div id='filter-header'>
          <button id='filter-close' onClick={handleClose}></button>
          <h2 className='align-center'>Filters</h2>
        </div>
        <div id='filter-salary'>
          <h3>Salary</h3>
          <RangeSlider 
            salaryRange={localFilters.salaryRange}
            setSalaryRange={(range) => setLocalFilters({...localFilters, salaryRange: range})}
          />
          <div id='filter-salary-input'>
            <div>
              <label htmlFor="filter-salary-from">Min</label>
              <input type='text' id='filter-salary-from' value={localFilters.salaryRange[0]} onChange={handleSalaryChange}></input>
            </div>
            <span> - </span>
            <div>
              <label htmlFor="filter-salary-to">Max</label>
              <input type='text' id='filter-salary-to' value={localFilters.salaryRange[1]} onChange={handleSalaryChange}></input>
            </div>
            <span>HUF</span>
          </div>
        </div>
        <div id='filter-location'>
          <h3>Location</h3>
          <LocationPicker location={localFilters.location} setLocation={(location) => setLocalFilters({...localFilters, location: location})} />
        </div>
        <div id='filter-type'>
          <h3>Type</h3>
          <div id='filter-type-boxes'>
            <div>
              <input type='checkbox' id='filter-type-fulltime' name='type' value='full-time' onChange={handleTypeChange} checked={localFilters.type.includes('full-time')}></input>
              <label htmlFor='filter-type-fulltime'>Full time</label>
            </div>
            <div>
              <input type='checkbox' id='filter-type-parttime' name='type' value='part-time' onChange={handleTypeChange} checked={localFilters.type.includes('part-time')}></input>
              <label htmlFor='filter-type-parttime'>Part time</label>
            </div>
            <div>
              <input type='checkbox' id='filter-type-internship' name='type' value='internship' onChange={handleTypeChange} checked={localFilters.type.includes('internship')}></input>
              <label htmlFor='filter-type-internship'>Internship</label>
            </div>
            <div>
              <input type='checkbox' id='filter-type-homeOffice' name='type' value='homeOffice' onChange={handleTypeChange} checked={localFilters.homeOffice}></input>
              <label htmlFor='filter-type-homeOffice'>🏠 Home office</label>
            </div>
          </div>
        </div>
        <input type='submit' id='filter-apply' value='Apply filters' onClick={handleApply}></input>
      </div>
    </>
  )
}

export default Filter