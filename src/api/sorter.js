import moment from 'moment'

export const convertToArray = (obj) => {
  const array = []
  for (let key in obj){
    if(obj.hasOwnProperty(key)){
      array.push(obj[key])
    }
  }
  return array
}

export const sortForLatest = (total, recent) => {
  total[recent.id] = recent
  return total
}

export const calculateTotalCals = (total) => {
  let totalCals = 0
  for(let key in total){
    if(total.hasOwnProperty(key)){
      const food = total[key]
      const addCals =  food.cals*(food.serving_grams/100)*food.quantity
      totalCals += addCals
    }
  }
  return totalCals
}

export const getUnixDate = () => {
  const dayString = moment().format('MMM DD YYYY')
  const dateObj = new Date(dayString)
  const unixdate = moment(dateObj).format('X')
  return unixdate
}

export const filterByName = (categoryArray, searchString) => {
  return categoryArray.filter((food)=>{
    if(food.name.toLowerCase().indexOf(searchString.toLowerCase())>-1){
      return true
    }else{
      return false
    }
  })
}
