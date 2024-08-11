import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useGetJobsQuery } from '../../state/jobHunterApiSlice'

const LocationPicker = ({ location, setLocation }) => {
  const { data: jobs } = useGetJobsQuery()

  const locations = jobs.data.map(job => job.city)
    .filter((value, index, self) => self.indexOf(value) === index)

  const handleChange = (e) =>
    setLocation(e.target.value)

  return (
    <FormControl 
      sx={{minWidth: 200}}
    >
      <Select
        id="location-picker"
        value={location}
        onChange={handleChange}
        size='small'
        sx={{borderRadius: 0, ":focus": {borderRadius: 0}}}
      >
        {locations.map((location, index) => (
          <MenuItem key={index} value={location}>{location}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LocationPicker
