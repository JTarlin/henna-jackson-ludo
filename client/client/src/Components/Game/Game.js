import React, {Component} from "react";
//import components
import Board from "../Board/Board";
import Toolbar from "../Toolbar/Toolbar";

class Game extends React.Component {
  
    render() {
        return (
            <div className="game">
              {console.log("game component renders")}
              <Board />
              {/* <Toolbar /> */}
            </div>
          );
    }  
}
  
export default Game;