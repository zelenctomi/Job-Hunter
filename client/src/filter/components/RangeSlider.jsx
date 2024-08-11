import { useState } from 'react'
import Slider from '@mui/material/Slider'
import { getFormattedSalary, maxSalary, minDistance } from '../../Salary'

function valuetext(value) {
  return `${getFormattedSalary(value)} HUF`
}

const step = 10_000

const RangeSlider = ({salaryRange, setSalaryRange}) => {

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxSalary - minDistance)
        setSalaryRange([clamped, clamped + minDistance])
      } 
      else {
        const clamped = Math.max(newValue[1], minDistance)
        setSalaryRange([clamped - minDistance, clamped])
      }
    } 
    else {
      setSalaryRange(newValue)
    }
  }

  return (
    <>
      <Slider
        getAriaLabel={() => 'Salary range'}
        min={0}
        max={maxSalary}
        step={step}
        value={salaryRange}
        valueLabelFormat={valuetext}
        getAriaValueText={valuetext}
        valueLabelDisplay='auto'
        onChange={handleChange}
        disableSwap
        sx={{'& .MuiSlider-valueLabel': {
              fontSize: 14,
              fontWeight: 400,
              fontFamily: 'Outfit',
              top: -5,
              backgroundColor: 'unset',
              '& *': {
                background: 'transparent',
                color: '#888888',
              },
            }, 
            '& .MuiSlider-track': {
              border: 'none',
              height: 5,
            },
            '& .MuiSlider-rail': {
              opacity: 0.5,
              boxShadow: 'inset 0px 0px 4px -2px #000',
              backgroundColor: '#d0d0d0',
            }}}
      />
    </>
  )
}

export default RangeSlider