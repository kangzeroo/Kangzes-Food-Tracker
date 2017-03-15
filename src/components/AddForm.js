import React, { Component } from 'react';
import Radium from 'radium'
import { saveNewFood } from '../api/firebaseDb'

class AddForm extends Component {

  constructor(){
    super()
    this.state = {
      name: "",
      img: "",
      cals: 0,
      id: "",
      serving_grams: 0,
      category: 'Veggies'
    }
  }

  updateAttr(attr, event){
    this.setState({
      [attr]: event.target.value
    })
  }

  saveFood(){
    const { loadFoods } = this.props
    saveNewFood({
      name: this.state.name,
      img: this.state.img,
      cals: this.state.cals,
      serving_grams: this.state.serving_grams
    }, this.state.category).then(()=>{
      this.setState({
        name: "",
        img: "",
        cals: 0,
        serving_grams: 0
      })
      loadFoods()
    })
  }

  render() {
    const { food } = this.props
    return (
      <div style={comStyles().form}>
        <h3>Add New Food</h3><br/><br/>

        <label>Name of Food</label>
        <input type='text' value={this.state.name} onChange={this.updateAttr.bind(this, 'name')} style={comStyles().name} placeholder='Bell Pepper' />

        <label>Calories per 100g</label>
        <input type='number' value={this.state.cals} onChange={this.updateAttr.bind(this, 'cals')} style={comStyles().cals} />

        <label>Grams per typical serving</label>
        <input type='number' value={this.state.serving_grams} onChange={this.updateAttr.bind(this, 'serving_grams')} style={comStyles().serving} />

        <label>Image URL</label>
        <input type='text' value={this.state.img} onChange={this.updateAttr.bind(this, 'img')} style={comStyles().img} placeholder='http://imgur.ca/244afg45/bell_pepper.jpg' />

        <div style={comStyles().catList}>
          <div onClick={()=>this.setState({category: 'Proteins'})} style={comStyles(this.state.category, 'Proteins').catOption}>Proteins</div>
          <div onClick={()=>this.setState({category: 'Veggies'})} style={comStyles(this.state.category, 'Veggies').catOption}>Veggies</div>
          <div onClick={()=>this.setState({category: 'Grains'})} style={comStyles(this.state.category, 'Grains').catOption}>Grains</div>
          <div onClick={()=>this.setState({category: 'Fruits'})} style={comStyles(this.state.category, 'Fruits').catOption}>Fruits</div>
          <div onClick={()=>this.setState({category: 'Processed'})} style={comStyles(this.state.category, 'Processed').catOption}>Processed</div>
        </div>

        <button className='btn btn-outline' onClick={this.saveFood.bind(this)} style={comStyles().btn}>SAVE</button>
      </div>
    );
  }
}

const comStyles = (chosen, category) => {
  let color = 'black'
  if(category === chosen){
    color = 'red'
  }
  return {
    form: {
      margin: "50px auto",
      display: "flex",
      flexDirection: "column",
      width: "400px",
      fontSize: "1rem"
    },
    name: {
      margin: "10px",
      fontSize: "1rem",
      padding: "10px",
      textAlign: "center"
    },
    cals: {
      margin: "10px",
      fontSize: "1rem",
      padding: "10px",
      textAlign: "center"
    },
    serving: {
      margin: "10px",
      fontSize: "1rem",
      padding: "10px",
      textAlign: "center"
    },
    img: {
      margin: "10px",
      fontSize: "1rem",
      padding: "10px",
      textAlign: "center"
    },
    catList: {
      margin: "10px",
      display: "flex",
      justifyContent: "center"
    },
    catOption: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: color,
      cursor: 'pointer',
      margin: "10px"
    },
    btn: {
      cursor: 'pointer'
    }
  }
}

const RadiumHOC = Radium(AddForm)
export default RadiumHOC;
