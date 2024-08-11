const getFormattedSalary = (salary) => {
  if (salary > 999999) {
    return `${salary / 1000000}M`;
  } else if (salary > 999) {
    return `${salary / 1000}K`;
  }
  return `${salary}`;
}

const getSalaryRange = (salaryFrom, salaryTo) => {
  // Format: e.g 300K - 500K HUF, 1M - 2M HUF, 1.5M - 2M HUF
  if (salaryFrom && salaryTo) {
    return `${getFormattedSalary(salaryFrom)} - ${getFormattedSalary(salaryTo)} HUF`
  } 
  return 'N/A'
}

const maxSalary = 4_000_000
const minDistance = 100_000

export { getFormattedSalary, getSalaryRange, maxSalary, minDistance }