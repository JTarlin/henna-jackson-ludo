import React, {Component} from "react";
import axios from "axios";
//import components
import Toolbar from "../Toolbar/Toolbar";
import GameLogic from "../GameLogic/GameLogic";
//import styling
import "./Game.scss"

class Game extends React.Component {

  state={roll: "Roll Me", randFloat: 0, currentTurn: 0, newGame: false}
  
  componentDidMount() {
    axios.get("http://localhost:3030/games/"+this.props.gameCode).then()
    .catch(this.setState({newGame: true}))
  }

  rollRandom = () =>{
    const randFloat = Math.random();
    this.setState({roll: Math.floor(randFloat*6)+1, randFloat: randFloat});
  }

  turnSetter = (turn) => {
    switch(turn) {
      case 0:
        this.setState({currentTurn: "Red"});
        break;
      case 1:
        this.setState({currentTurn: "Blue"});
        break;
      case 2:
        this.setState({currentTurn: "Yellow"});
        break;
      case 3:              
        this.setState({currentTurn: "Green"});
        break;
    }
    

  }
  
  render() {
    return (
      <div className="game">
        <GameLogic roll={this.state.roll} randFloat={this.state.randFloat} gameCode={this.props.match.params.id} turnSetter={this.turnSetter}  newGame={this.state.newGame}/>
        <Toolbar roll={this.state.roll} rollFunc={this.rollRandom} currentTurn={this.state.currentTurn}/>
      </div>
    );
  }  
}
  
export default Game;