//import package dependencies
import React, {Component} from "react";
//import components
import Board from "../Board/Board";

class GameLogic extends React.Component {
    state={
        currentTurn: 0, //0 for red, 1 for blue, 2 for yellow, 3 for green
        redPiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52)
        bluePiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52) 
        yellowPiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52) 
        greenPiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52) 
    }

    componentDidUpdate() {
        console.log("dice rolled");
        switch(this.state.currentTurn) {
            case 0:
                console.log("red turn");
                break;
            case 1:
                console.log("blue turn");
                break
            case 2:
                console.log("yellow turn");
                break
            case 3:
                console.log("green turn");
        }

    }

    movePieces(player, pieces, roll) {
        //pieces can only leave base on roll of 6
        if(roll===6) {
            if(pieces.includes(-1)) {
                
            }
        }
    } 

    

    render() {
        return (
            <>
                <Board />
                {console.log(this.props.roll)}
            </>
        )
    }

}


export default GameLogic;