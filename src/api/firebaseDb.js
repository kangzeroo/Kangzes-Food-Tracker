import firebase from 'firebase'
import uuid from 'uuid'
import { convertToArray } from './sorter'

export const getIngredients = () => {
  const p = new Promise((res, rej)=>{
    const ref = firebase.database().ref("Ingredients")
    ref.on('value', (snapshot)=>{
      const categories = snapshot.val()
      let compiledCategories = {}
      for (let cat in categories) {
          if (categories.hasOwnProperty(cat)) {
              compiledCategories[cat] = convertToArray(categories[cat])
          }
      }
      // console.log(compiledCategories)
      res(compiledCategories)
    })
  })
  return p
}

export const getHistory = () => {
  const p = new Promise((res, rej)=>{
    const ref = firebase.database().ref("History")
    ref.on('value', (snapshot)=>{
      const x = snapshot.val()
      const hist = convertToArray(x)
      res(hist)
    })
  })
  return p
}

export const getDayInDatebase = (unixdate) => {
  const p = new Promise((res, rej)=>{
    const ref = firebase.database().ref(`History/${unixdate}`)
    ref.on('value', (snapshot)=>{
      const x = snapshot.val()
      if(x){
        res(x)
      }else{
        res({
          unixdate: unixdate,
          total: {}
        })
      }
    })
  })
  return p
}

export const updateDayInDatabase = (unixdate, total) => {
  const p = new Promise((res, rej)=>{
    const updates = {}
    updates[`/History/${unixdate}`] = {
      total: total,
      unixdate: unixdate
    }
    firebase.database().ref().update(updates).then((x)=>{
      return getDayInDatebase(unixdate)
    })
    .then((day)=>{
      res(day)
    })
  })
  return p
}

export const saveNewFood = (foodObj, category) => {
  const p = new Promise((res, rej)=>{
    const updates = {}
    const id = uuid.v4()
    updates[`/Ingredients/${category}/${id}`] = {
      ...foodObj,
      id: id
    }
    firebase.database().ref().update(updates).then((x)=>{
      res()
    })
  })
  return p
}
