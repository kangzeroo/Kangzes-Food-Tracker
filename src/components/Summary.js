import React, { Component } from 'react';
import Radium from 'radium'
import CategoryList from './CategoryList'

class Summary extends Component {

  formattedTotal(total){
    let formatted = {}
    for(let key in total){
      if(total.hasOwnProperty(key)){
        if(total[key].quantity > 0){
          formatted[key] = total[key]
        }
      }
    }
    return formatted
  }

  render() {
    const { today, total } = this.props
    return (
      <div style={comStyles().catList}>
        <CategoryList total={this.formattedTotal(total)} />
      </div>
    );
  }
}

const comStyles = () => {
  return {
    catList: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  }
}

const RadiumHOC = Radium(Summary)
export default RadiumHOC;
