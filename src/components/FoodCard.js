import React, { Component } from 'react';
import Radium from 'radium'

class FoodCard extends Component {

  constructor(){
    super()
    this.state = {
      quantity: 0
    }
  }

  componentWillMount(){
    this.setQuantity()
  }

  setQuantity(){
    const { total, food } = this.props
    for(let key in total){
      if(total.hasOwnProperty(key) && total[key].id === food.id){
        this.setState({
          quantity: total[key].quantity
        })
      }
    }
  }

  increment(x){
    const { updateDailyIntake, food } = this.props
    let new_quantity = this.state.quantity += x
    if(new_quantity>=0){
      this.setState({
        quantity: new_quantity
      })
      updateDailyIntake(food, new_quantity)
    }
  }

  render() {
    const { food, updateDailyIntake } = this.props
    return (
      <div className='card' style={comStyles().card}>
        <div style={comStyles().image}>
          <img src={food.img} style={comStyles().img} />
        </div>
        <div style={comStyles().info}>
          <div style={comStyles().name}>
            { food.name }
          </div>
          <div style={comStyles().cals}>
            { (food.cals*(food.serving_grams/100)).toFixed(0) } cals
          </div>
          <div style={comStyles().serving_grams}>
            { food.cals } cals/100g x { food.serving_grams/100 } per serving
          </div>
        </div>
        {
          updateDailyIntake
          ?
          <div style={comStyles().increments}>
            <div onClick={()=>this.increment(0.5)} style={comStyles().inc}>
              +
            </div>
            <div style={comStyles().servings}>
              {this.state.quantity}
            </div>
            <div onClick={()=>this.increment(-0.5)} style={comStyles().inc}>
              -
            </div>
          </div>
          :
          <div style={comStyles().increments}>
            <div style={comStyles().servings}>
              {(this.state.quantity*food.cals*food.serving_grams/100).toFixed(0)} Calories <br/>
              {this.state.quantity} Portions consumed
            </div>
          </div>
        }
      </div>
    );
  }
}

const comStyles = () => {
  return {
    card: {
      flexGrow: 1,
      margin: "10px",
      display: "flex",
      flexDirection: "row",
      padding: "10px"
    },
    image: {
      flexGrow: 2,
      overflow: 'hidden'
    },
    img: {
      width: '150px',
      height: 'auto'
    },
    info: {
      flexGrow: 4
    },
    name: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    cals: {
      fontSize: '1rem',
      textAlign: 'center',
      marginBottom: '20px'
    },
    serving_grams: {
      fontSize: '0.7rem',
      textAlign: 'center'
    },
    increments: {
      flexGrow: 1,
      padding: '10px',
      justifyContent: 'center',
      alignItems: 'center'
    },
    servings: {
      fontWeight: '1.2rem',
      fontWeight: 'bold'
    },
    inc: {
      cursor: 'pointer',
      fontSize: '1.3rem'
    }
  }
}

const RadiumHOC = Radium(FoodCard)
export default RadiumHOC;
