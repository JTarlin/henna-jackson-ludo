import React, {Component} from "react";
//import components
import Toolbar from "../Toolbar/Toolbar";
import GameLogic from "../GameLogic/GameLogic";

class Game extends React.Component {

  state={roll: "Roll Me"}

  rollRandom = () =>{
    this.setState({roll: Math.floor(Math.random()*6)+1});
  }
  
  render() {
    return (
      <div className="game">
        <GameLogic roll={this.state.roll}/>
        <Toolbar roll={this.state.roll} rollFunc={this.rollRandom}/>
      </div>
    );
  }  
}
  
export default Game;