import React, { Component } from 'react';
import Radium from 'radium'
import moment from 'moment'
import { getHistory } from '../api/firebaseDb'
import { calculateTotalCals } from '../api/sorter'

class History extends Component {

  constructor(){
    super()
    this.state = {
      history: []
    }
  }

  componentWillMount(){
    getHistory().then((history)=>{
      this.setState({
        history: history
      })
    })
  }

  render() {
    return (
      <div style={comStyles().historyList}>
        {
          this.state.history.map((d)=>{
            return (
              <div className='card' key={d.unixdate} style={comStyles().record}>
                <div style={comStyles().date}>
                  {moment.unix(d.unixdate).format("dddd MMMM Do YYYY")}
                </div>
                <div style={comStyles().cals}>
                  {calculateTotalCals(d.total).toFixed(0)} calories consumed
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

const comStyles = () => {
  return {
    historyList: {
      width: "70%",
      height: "100%",
      padding: "50px",
      display: "flex",
      flexDirection: "column",
      margin: "auto"
    },
    record: {
      display: "flex",
      flexDirection: "row"
    },
    date: {
      flexGrow: 1,
      textAlign: 'center'
    },
    cals: {
      flexGrow: 1,
      textAlign: 'center'
    }
  }
}

const RadiumHOC = Radium(History)
export default RadiumHOC;
