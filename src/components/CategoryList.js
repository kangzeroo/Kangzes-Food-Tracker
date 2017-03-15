import React, { Component } from 'react';
import Radium from 'radium'
import FoodCard from './FoodCard'

class CategoryList extends Component {

  constructor(){
    super()
    this.state = {
      backgroundColor: null
    }
  }

  componentWillMount(){
    const { name } = this.props
    let color
    if(name === "Proteins"){
      color = 'rgba(254,1,1,0.3)'
    }else if(name === "Veggies"){
      color = 'rgba(1,254,1,0.3)'
    }else if(name === "Grains"){
      color = 'rgba(250,176,28,0.3)'
    }else if(name === "Fruits"){
      color = 'rgba(250,250,28,0.3)'
    }
    this.setState({
      backgroundColor: color
    })
  }

  renderSummary(total){
    const eaten = []
    for(let key in total){
      if(total.hasOwnProperty(key)){
        eaten.push(total[key])
      }
    }
    return eaten.map((food)=>{
      return (
        <FoodCard key={food.id} food={food} total={total} />
      )
    })
  }

  render() {
    const { name, ingredients, updateDailyIntake, total } = this.props
    return (
      <div style={comStyles().main}>
        <div style={comStyles(this.state.backgroundColor).list}>
          <h6 style={comStyles().catName}>{name}</h6>
          {
            ingredients
            ?
            ingredients.map((food)=>{
              return (
                <FoodCard key={food.id} food={food} updateDailyIntake={updateDailyIntake} total={total} />
              )
            })
            :
            this.renderSummary(total)
          }
        </div>
      </div>
    );
  }
}

const comStyles = (backgroundColor) => {
  return  {
    main: {
      flexGrow: 1,
      backgroundColor: backgroundColor
    },
    list: {
      display: 'flex',
      flexDirection: 'column'
    },
    catName: {
      color: 'gray'
    }
  }
}

const RadiumHOC = Radium(CategoryList)
export default RadiumHOC;
