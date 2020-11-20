//import package dependencies
import React, {Component} from "react";
import axios from "axios";
//import components
import Board from "../Board/Board";
//styling
import "./GameLogic.scss"

class GameLogic extends React.Component {

    state={
        currentTurn: 0, //0 for red, 1 for blue, 2 for yellow, 3 for green
        randFloat: 0,
        availableMoves: [],
        redPiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52)
        bluePiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52) 
        yellowPiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52) 
        greenPiecePos: [-1, -1, -1, -1], //-1 for home, otherwise space id (0, 1, 2, ... 52) 
        winMessage: ""
    }

    componentDidMount() {

        if(!this.props.newGame) {
            axios.get("http://localhost:3030/games/"+this.props.gameCode).then(res=>{
                console.log(res.data);
                this.setState(
                    {currentTurn: res.data.currentTurn, 
                    redPiecePos: res.data.redPiecePos,
                    bluePiecePos: res.data.bluePiecePos,
                    yellowPiecePos: res.data.yellowPiecePos,
                    greenPiecePos: res.data.greenPiecePos,
                }, this.props.turnSetter(res.data.currentTurn))
            })
        }
        
    }

    componentDidUpdate() {

        if(!this.state.winMessage.length){
            this.winCheck();
        }
        

        if(this.state.randFloat !== this.props.randFloat) {
            let moves;
            if(!this.state.availableMoves.length) {
                switch(this.state.currentTurn) {
                    case 0:
                        moves = this.findMoves(0, this.state.redPiecePos, this.props.roll);
                        this.setState({availableMoves: moves, randFloat: this.props.randFloat});

                        //some logic here: the player makes their move then we set available moves to [] again
                        break;
                    case 1:
                        moves = this.findMoves(1, this.state.bluePiecePos, this.props.roll);
                        this.setState({availableMoves: moves, randFloat: this.props.randFloat});
                        break
                    case 2:
                        moves = this.findMoves(2, this.state.yellowPiecePos, this.props.roll);
                        this.setState({availableMoves: moves, randFloat: this.props.randFloat});
                        break
                    case 3:
                        moves = this.findMoves(3, this.state.greenPiecePos, this.props.roll);
                        this.setState({availableMoves: moves, randFloat: this.props.randFloat});
                }
            }
        }

        
    }

    findMoves(player, pieces, roll) {
        let availableMoves = [];

        for(const position of pieces) {
            if(position===-1) {
                if(roll===6) {
                    switch(player) {
                        case 0:
                            if(!availableMoves.includes(2)){
                                availableMoves.push(2);
                            }
                            break;
                        case 1:
                            if(!availableMoves.includes(15)){
                                availableMoves.push(15);
                            }
                            break
                        case 2:
                            if(!availableMoves.includes(28)){
                                availableMoves.push(28);
                            }
                            break
                        case 3:
                            if(!availableMoves.includes(41)){
                                availableMoves.push(41);
                            }
                    }
                }
            } else {
                let newPos = position+roll;
                switch(player) {
                    case 0:
                        if(position<52 && newPos>51) {
                            if(newPos===52) {newPos = 0}
                            else {
                                newPos=newPos-1;
                            }    
                        } 
                        if(newPos<=57){
                            availableMoves.push(newPos);
                        }
                        break;
                    case 1:
                        if(newPos>51 && newPos<58) {
                            newPos = newPos-52;
                        }

                        if(newPos>13 && position<=13) {
                            newPos=58+position-14+roll;
                        }

                        if(newPos<=63){
                            availableMoves.push(newPos);
                        }
                        break
                    case 2:
                        if(newPos>51 && newPos<58) {
                            newPos = newPos-52;
                        }


                        if(newPos>26 && position<=26) {
                            newPos=64+position-27+roll;
                        }

                        if(newPos<=69){
                            availableMoves.push(newPos);
                        }
                        break
                    case 3:
                        if(newPos>51 && newPos<58) {
                            newPos = newPos-52;
                        }
                        
                        if(newPos>39 && position<=39) {
                            newPos=70+position-40+roll;
                        }

                        if(newPos<=75){
                            availableMoves.push(newPos);
                        }


                }

                
            }    
        }
        return availableMoves;
    } 

    movePiece = (index)=> {

        const roll = this.props.roll;

        let prevSpace = index-this.props.roll
        //check if we just looped around the board
        if(prevSpace<0){
            prevSpace = prevSpace+52;
        }

        if(index>51 && index<58) {
            if(index-roll===51) {
                prevSpace = 0;
            } else if(index-roll<51) {
                prevSpace = index-roll+1;
            } else if(index-roll>51) {
                prevSpace=index-roll;
            }
        }

        if(index>57 && index<64){
            if(index-roll<58) {
                prevSpace = index-58+14-roll;
            } else if(index-roll>57) {
                prevSpace = index-roll;
            }
            
        }

        if(index>63 && index<70){
            if(index-roll<64) {
                prevSpace = index-64+27-roll;
            } else if(index-roll>63) {
                prevSpace = index-roll;
            }
           
        }

        if(index>69){
            if(index-roll<70) {
                prevSpace = index-70+40-roll;
            } else if(index-roll>69) {
                prevSpace = index-roll;
            }
            
        }
        //check whose turns it is
        let tempPositions = [];
        let piecesMovedThisTurn = 0;
        switch(this.state.currentTurn) {
            case 0:
                
                tempPositions = this.state.redPiecePos;
                tempPositions = tempPositions.map(piece=>{
                    if(piece===prevSpace || (piece===-1 && index===2 && piecesMovedThisTurn===0)) {
                        console.log("this piece wants to move")
                        piecesMovedThisTurn+=1;
                        return index;
                    } else return piece;
                })
                this.checkCollision(index, 0);
                this.setState({redPiecePos: tempPositions, availableMoves: [], currentTurn: 1})
                this.props.turnSetter(1);

                break;
            case 1:
                tempPositions = this.state.bluePiecePos;
                tempPositions = tempPositions.map(piece=>{
                    if(piece===prevSpace || (piece===-1 && index===15 && piecesMovedThisTurn===0)) {
                        piecesMovedThisTurn+=1;
                        return index;
                    } else return piece;
                })
                this.checkCollision(index, 1);
                this.setState({bluePiecePos: tempPositions, availableMoves: [], currentTurn: 2})
                this.props.turnSetter(2);
                break
            case 2:
                tempPositions = this.state.yellowPiecePos;
                tempPositions = tempPositions.map(piece=>{
                    if(piece===prevSpace || (piece===-1 && index===28 && piecesMovedThisTurn===0)) {
                        piecesMovedThisTurn+=1;
                        return index;
                    } else return piece;
                })
                this.checkCollision(index, 2);
                this.setState({yellowPiecePos: tempPositions, availableMoves: [], currentTurn: 3})
                this.props.turnSetter(3);
                break
            case 3:
                tempPositions = this.state.greenPiecePos;
                tempPositions = tempPositions.map(piece=>{
                    if(piece===prevSpace || (piece===-1 && index===41 && piecesMovedThisTurn===0)) {
                        piecesMovedThisTurn+=1;
                        return index;
                    } else return piece;
                })
                this.checkCollision(index, 3);
                this.setState({greenPiecePos: tempPositions, availableMoves: [], currentTurn: 0})
                this.props.turnSetter(0);
                break
        }

    }

    checkCollision(index, color) {
        let tempBlue;
        let tempRed;
        let tempYellow;
        let tempGreen;
        let piece;
        if(color!==0) {
            for(piece of this.state.redPiecePos) {
                tempRed = this.state.redPiecePos;
                tempRed = tempRed.map(piece => {
                    if(piece===index) {
                        return -1;
                    } else return piece;
                })
            }
        }
        if(color!==1) {
            for(piece of this.state.bluePiecePos) {
                tempBlue = this.state.bluePiecePos;
                tempBlue = tempBlue.map(piece => {
                    if(piece===index) {
                        return -1;
                    } else return piece;
                })
            }
        }
        if(color!==2) {
            for(piece of this.state.redPiecePos) {
                tempYellow = this.state.yellowPiecePos;
                tempYellow = tempYellow.map(piece => {
                    if(piece===index) {
                        return -1;
                    } else return piece;
                })
            }
        }
        if(color!==3) {
            for(piece of this.state.greenPiecePos) {
                tempGreen = this.state.greenPiecePos;
                tempGreen = tempGreen.map(piece => {
                    if(piece===index) {
                        return -1;
                    } else return piece;
                })
            }
        }

        this.setState({redPiecePos: tempRed, bluePiecePos: tempBlue, yellowPiecePos: tempYellow, greenPiecePos: tempGreen})
    }

    winCheck() {

        let redWon = true;
        console.log(this.state.redPiecePos);
        if(this.state.redPiecePos.forEach(piece=>{
            if(piece !== 57) {
                console.log("not at end")
                redWon=false;
            }
        }));
        if(redWon) {
            this.setState({winMessage: "Red Wins!"})
        }

        let blueWon = true;
        if(this.state.bluePiecePos.forEach(piece=>{
            if(piece !== 63) {
                blueWon=false;
            }
        }));
        if(blueWon) {
            this.setState({winMessage: "Blue Wins!"})
        }

        let yellowWon = true;
        if(this.state.yellowPiecePos.forEach(piece=>{
            if(piece !== 69) {
                yellowWon=false;
            }
        }));
        if(yellowWon) {
            this.setState({winMessage: "Yellow Wins!"})
        }

        let greenWon = true;
        if(this.state.greenPiecePos.forEach(piece=>{
            if(piece !== 75) {
                greenWon=false;
            }
        }));
        if(greenWon) {
            this.setState({winMessage: "Green Wins!"})
        }
    }

    render() {
        return (
            <div className="logic-box">
                <Board redPos={this.state.redPiecePos} bluePos={this.state.bluePiecePos} yellowPos={this.state.yellowPiecePos} greenPos={this.state.greenPiecePos} availableMoves={this.state.availableMoves} movePiece={this.movePiece} />
                <h1 className="giant-win-letters">{this.state.winMessage}</h1>
            </div>
        )
    }

}


export default GameLogic;