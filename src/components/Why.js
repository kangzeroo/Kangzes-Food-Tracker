import React, { Component } from 'react';
import Radium from 'radium'

class Why extends Component {

  renderImages(){
    const images = [
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/15380590_10155527854494046_2920338336211259461_n.jpg?oh=4cc5a09b3310bc67c7591910bbeb7f45&oe=595BF191',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/1978824_10154264076074046_7588904740264021306_n.jpg?oh=6f050fa20a09e48c8ca94bb7ab37f47f&oe=5960B20D',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t31.0-8/11080680_10153726603174046_5607163729800211662_o.jpg?oh=d15f01a08ae556966a9995fef35ff560&oe=59639FA7',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t35.0-12/17273445_10155878931034046_268709445_o.jpg?oh=b1da8b430bebb65aa777f5c1614e470b&oe=58CA8595',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t35.0-12/17356916_10155886451424046_1554498614_o.jpg?oh=ff28eef3667fdb3d0a0a9d7c925e700b&oe=58CADB98',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/16508515_10155755720779046_2387957266754420225_n.jpg?oh=878ef132fc0c70b777c098e27aba73a4&oe=5925E4E8',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t35.0-12/17237100_1355168961256659_720032242_o.png?oh=fa3f85749eb2232c7af410e86e8828d8&oe=58CAB1E1',
      'https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-9/15171301_10155482010059046_8995706253610835999_n.jpg?oh=2ef65fa24f51820df33ffad529901aa1&oe=592CF511',
      'https://firebasestorage.googleapis.com/v0/b/lowcal-foodlist.appspot.com/o/394438_153651698075064_1987965402_n.jpg?alt=media&token=a154cc99-49af-4775-81f2-114a0741c8b8'
    ]
    return images.map((x)=>{
      return (
        <img src={x} style={comStyles().img} />
      )
    })
  }

  render() {
    return (
      <div style={comStyles().whyList}>
        <h1>Motivation</h1> <br/>
        {this.renderImages()}
      </div>
    );
  }
}

const comStyles = () => {
  return {
    whyList: {
      display: 'flex',
      flexDirection: 'column'
    },
    img: {
      width: 'auto',
      height: '50vh',
      margin: '30px auto'
    }
  }
}

const RadiumHOC = Radium(Why)
export default RadiumHOC;
