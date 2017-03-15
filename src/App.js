import React, { Component } from 'react';
import firebase from 'firebase'
import Radium from 'radium'
import './App.css';
import Summary from './components/Summary'
import History from './components/History'
import CategoryList from './components/CategoryList'
import AddForm from './components/AddForm'
import Why from './components/Why'

import { config } from './firebase_config'
import { getIngredients, getDayInDatebase, updateDayInDatabase } from './api/firebaseDb'
import { sortForLatest, calculateTotalCals, getUnixDate, filterByName } from './api/sorter'

class App extends Component {

  constructor(){
    super()
    this.state = {
      ingredients: {
        Proteins: [],
        Grains: [],
        Veggies: [],
        Fruits: [],
        Processed: []
      },
      filteredIngredients: {
        Proteins: [],
        Grains: [],
        Veggies: [],
        Fruits: [],
        Processed: []
      },
      searchString: '',
      loaded: false,
      unixdate: getUnixDate(),
      total: {},      // food items today
      view: 'home'    // none, add, summary
    }
  }

  componentWillMount(){
    firebase.initializeApp(config)
    const unixdate = getUnixDate()
    getDayInDatebase(unixdate).then((day)=>{
      this.setState({
        total: day.total
      })
    })
    this.loadFoods()
  }

  loadFoods(){
    getIngredients().then(({ Proteins, Grains, Veggies, Fruits, Processed })=>{
      this.setState({
        ingredients: {
          Proteins: Proteins,
          Grains: Grains,
          Veggies: Veggies,
          Fruits: Fruits,
          Processed: Processed
        },
        filteredIngredients: {
          Proteins: Proteins,
          Grains: Grains,
          Veggies: Veggies,
          Fruits: Fruits,
          Processed: Processed
        },
        loaded: true,
        view: 'home'
      })
    })
  }

  updateSearch(event){
    this.setState({
      searchString: event.target.value,
      filteredIngredients: {
        Proteins: filterByName(this.state.ingredients.Proteins, event.target.value),
        Grains: filterByName(this.state.ingredients.Grains, event.target.value),
        Veggies: filterByName(this.state.ingredients.Veggies, event.target.value),
        Fruits: filterByName(this.state.ingredients.Fruits, event.target.value),
        Processed: filterByName(this.state.ingredients.Processed, event.target.value)
      }
    })
  }

  renderView(){
    if(this.state.view === 'add'){
      return (
        <AddForm loadFoods={this.loadFoods.bind(this)} />
      )
    }else if(this.state.view === 'summary'){
      return (
        <Summary total={this.state.total} />
      )
    }else if(this.state.view == 'history'){
      return (
        <History />
      )
    }else if(this.state.view === 'why'){
      return (
        <Why />
      )
    }else if(this.state.view === 'home' && this.state.loaded){
      return (
        <div style={comStyles().home}>
          <div style={comStyles().search}>
            <input value={this.state.searchString} onChange={this.updateSearch.bind(this)} placeholder='Search' style={comStyles().searchBar} />
          </div>
          <div style={comStyles().catList}>
            <CategoryList ingredients={this.state.filteredIngredients.Proteins} name='Proteins' updateDailyIntake={this.updateDailyIntake.bind(this)} total={this.state.total} />
            <CategoryList ingredients={this.state.filteredIngredients.Grains} name='Grains' updateDailyIntake={this.updateDailyIntake.bind(this)} total={this.state.total} />
            <CategoryList ingredients={this.state.filteredIngredients.Veggies} name='Veggies' updateDailyIntake={this.updateDailyIntake.bind(this)} total={this.state.total} />
            <CategoryList ingredients={this.state.filteredIngredients.Fruits} name='Fruits' updateDailyIntake={this.updateDailyIntake.bind(this)} total={this.state.total} />
            <CategoryList ingredients={this.state.filteredIngredients.Processed} name='Processed' updateDailyIntake={this.updateDailyIntake.bind(this)} total={this.state.total} />
          </div>
        </div>
      )
    }
  }

  updateDailyIntake(food, quantity){
    const x = {
      ...food,
      quantity: quantity
    }
    const total_today = sortForLatest(this.state.total, x)
    updateDayInDatabase(this.state.unixdate, total_today).then((day)=>{
      console.log(day)
      this.setState({
        total: day.total
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div style={comStyles().header}>
          <div style={comStyles().dash}>
            <h2>Kangzes Food Tracker</h2>
            <h1>{ calculateTotalCals(this.state.total).toFixed(0) }</h1> <h3>Calories Today</h3>
          </div>
          <div style={comStyles().actions}>
            {/* <div onClick={()=>this.setState({view: 'add'})} style={comStyles().actionBtn}>Add Food</div> */}
            <div onClick={()=>this.setState({view: 'home'})} style={comStyles().actionBtn}>Home</div>
            <div onClick={()=>this.setState({view: 'summary'})} style={comStyles().actionBtn}>Daily Summary</div>
            <div onClick={()=>this.setState({view: 'history'})} style={comStyles().actionBtn}>History</div>
            <div onClick={()=>this.setState({view: 'add'})} style={comStyles().actionBtn}>Add Food</div>
            <div onClick={()=>this.setState({view: 'why'})} style={comStyles().actionBtn}>Why?</div>
          </div>
        </div>
        <div style={comStyles().view}>
          { this.renderView() }
        </div>
      </div>
    );
  }
}

const comStyles = () => {
  return {
    header: {
      height: "15vh",
      width: "100vw",
      flexDirection: 'row',
      padding: '20px 20px 150px 20px'
    },
    dash: {
      width: "100vw",
      height: "15vh",
      position: "absolute"
    },
    actions: {
      position: "absolute",
      display: "flex",
      flexDirection: 'column',
      left: "20px"
    },
    actionBtn: {
      cursor: 'pointer',
      margin: "10px"
    },
    view: {
      height: "85vh",
      width: "96vw",
      maxWidth: "96vw",
      margin: "0 2vw 0 2vw"
    },
    search: {
      margin: "10px 10px 30px 10px"
    },
    searchBar: {
      padding: "10px",
      fontSize: "1.3rem",
      textAlign: "center",
      width: "500px"
    },
    catList: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  }
}

const RadiumHOC = Radium(App)
export default RadiumHOC;
