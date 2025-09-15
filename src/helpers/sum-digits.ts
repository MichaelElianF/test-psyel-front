export default (string: string): number => {
  // 1. Split the string into an array of individual digits
  const digits = string.split('')

  // 2. Use reduce to sum the digits
  //    - parseInt() is used to convert each string digit back to a number
  const sum = digits.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue, 10) // The '10' specifies base-10
  }, 0) // 0 is the initial value of the accumulator

  return sum
}
