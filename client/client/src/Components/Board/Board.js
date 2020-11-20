//import package dependencies
import React, {Component} from "react";
//import code dependencies

//import styling
import "./Board.scss";

class Board extends React.Component {

    render() {
        return (
            <>
                {createBoard("small", this.props.redPos, this.props.bluePos, this.props.yellowPos, this.props.greenPos, this.props.availableMoves, this.props.movePiece)}
            </>
        )
    }
}


//creates board of given size (argument "small", "medium", or "large")
function createBoard(size, redPos, bluePos, yellowPos, greenPos, availableMoves, movePiece) {

    let spaceWidth;
    switch(size) {
        case "small":
            spaceWidth = 40;
            break;
        case "medium":
            spaceWidth = 60;
            break
        case "large":
            spaceWidth = 80;
            break
        default:
            spaceWidth = 60;
    }

    const spaceSeparation = spaceWidth+10;
    const boardSize = spaceSeparation*15;

    const boardSpaces = [];

    let offBoardPieces = renderOffBoardPieces(redPos, bluePos, yellowPos, greenPos, spaceSeparation, spaceWidth);

    //create first board space: top middle
    boardSpaces.push(
        <div id="0" key="0" style={StyleFromCoords(7, 0, spaceSeparation, spaceWidth)} className="gameSpace" >
            {pieceChecker(0, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(0, spaceWidth, availableMoves, movePiece)}
        </div>)
    //create subsequent board spaces: to the right and down 6
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+1)} key={""+(i+1)} style={StyleFromCoords(8, i, spaceSeparation, spaceWidth)} className={conditionalClassName(i, 1, "gameSpace__red")}  >
            {pieceChecker(i+1, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+1, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create subsequent board spaces: row from col 9 to end at y=6
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+7)} key={""+(i+7)} style={StyleFromCoords(i+9, 6, spaceSeparation, spaceWidth)} className="gameSpace" >
            {pieceChecker(i+7, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+7, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create right middle board space
    boardSpaces.push(
    <div id="13" key="13" style={StyleFromCoords(14, 7, spaceSeparation, spaceWidth)} className="gameSpace" >
        {pieceChecker(13, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
        {moveChecker(13, spaceWidth, availableMoves, movePiece)}
    </div>)
    //create subsequent board spaces: row from col 14 to 9 at y=8
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+14)} key={""+(i+14)} style={StyleFromCoords(14-i, 8, spaceSeparation, spaceWidth)} className={conditionalClassName(i, 1, "gameSpace__blue")} >
            {pieceChecker(i+14, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+14, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create subsequent board spaces: down 6 from y10 to y15
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+20)} key={""+(i+20)} style={StyleFromCoords(8, 9+i, spaceSeparation, spaceWidth)} className="gameSpace"  >
            {pieceChecker(i+20, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+20, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create bottom middle board space
    boardSpaces.push(<div id="26" key="26" style={StyleFromCoords(7, 14, spaceSeparation, spaceWidth)} className="gameSpace" >{pieceChecker(26, spaceWidth, redPos, bluePos, yellowPos, greenPos)}</div>)
    //create subsequent board spaces: col 6 from y14 to y9
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+27)} key={""+(i+27)} style={StyleFromCoords(6, 14-i, spaceSeparation, spaceWidth)} className={conditionalClassName(i, 1, "gameSpace__yellow")}  >
            {pieceChecker(i+27, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+27, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create subsequent board spaces: row from col 5 to 0 at y=8
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+33)} key={""+(i+33)} style={StyleFromCoords(5-i, 8, spaceSeparation, spaceWidth)} className="gameSpace" >
            {pieceChecker(i+33, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+33, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create bottom middle board space
    boardSpaces.push(
    <div id="39" key="39" style={StyleFromCoords(0, 7, spaceSeparation, spaceWidth)} className="gameSpace" >
        {pieceChecker(39, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
        {moveChecker(39, spaceWidth, availableMoves, movePiece)}
    </div>)
    //create subsequent board spaces: row from col 9 to end at y=6
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+40)} key={""+(i+40)} style={StyleFromCoords(i, 6, spaceSeparation, spaceWidth)} className={conditionalClassName(i, 1, "gameSpace__green")} >
            {pieceChecker(i+40, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+40, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //create subsequent board spaces: col 6 from y14 to y9
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+46)} key={""+(i+46)} style={StyleFromCoords(6, 5-i, spaceSeparation, spaceWidth)} className="gameSpace"  >
            {pieceChecker(i+46, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+46, spaceWidth, availableMoves, movePiece)}
        </div>)
    }

    //THESE ARE THE "HOME STRETCH" SPACES
    //top centre home stretch:
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+52)} key={""+(i+52)} style={StyleFromCoords(7, i+1, spaceSeparation, spaceWidth)} className="gameSpace gameSpace__red"  >
            {pieceChecker(i+52, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+52, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //right centre home stretch:
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+58)} key={""+(i+58)} style={StyleFromCoords(13-i, 7, spaceSeparation, spaceWidth)} className="gameSpace gameSpace__blue"  >
            {pieceChecker(i+58, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+58, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //bottom centre home stretch:
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+64)} key={""+(i+64)} style={StyleFromCoords(7, 13-i, spaceSeparation, spaceWidth)} className="gameSpace gameSpace__yellow"  >
            {pieceChecker(i+64, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+64, spaceWidth, availableMoves, movePiece)}
        </div>)
    }
    //left centre home stretch:
    for(let i=0; i<6; i++) {
        boardSpaces.push(
        <div id={""+(i+70)} key={""+(i+70)} style={StyleFromCoords(i+1, 7, spaceSeparation, spaceWidth)} className="gameSpace gameSpace__green"  >
            {pieceChecker(i+70, spaceWidth, redPos, bluePos, yellowPos, greenPos)}
            {moveChecker(i+70, spaceWidth, availableMoves, movePiece)}
        </div>)
    }

    let gameBoard = <div className="gameBoard" style={{width: boardSize, height: boardSize}}>
        {boardSpaces}
        {offBoardPieces}
    </div>

    return gameBoard;
}

function StyleFromCoords(x, y, separation, width) {
    return {
        position: "absolute",
        top: y*separation,
        left: x*separation,
        width: width,
        height: width
    };
}

function conditionalClassName(i, index, className) {
    if(i === index) {
        return "gameSpace "+className;
    } else return 'gameSpace';
}

//show the pieces that are currently not on the board
function renderOffBoardPieces(redPos, bluePos, yellowPos, greenPos, separation, width) {


    let offBoardPieces = [];

    //red pieces
    let numOffBoard=0;
    for(const piece of redPos) {
        
        if(piece===-1) {
            offBoardPieces.push(<div key={"" + (-1-numOffBoard)} className="piece" style={{position: "absolute", top: separation, left: (10+numOffBoard)*separation, backgroundColor: "red", height: width, width: width}}></div>);
            numOffBoard += 1;
        }
    }

    //blue pieces
    numOffBoard=0;
    for(const piece of bluePos) {
        
        if(piece===-1) {
            offBoardPieces.push(<div key={"" + (-1-numOffBoard-10)} className="piece" style={{position: "absolute", top: (10+numOffBoard)*separation, left: 13*separation, backgroundColor: "blue", height: width, width: width}}></div>);
            numOffBoard += 1;
        }
    }

    //yellow pieces
    numOffBoard=0;
    for(const piece of yellowPos) {
        
        if(piece===-1) {
            offBoardPieces.push(<div key={"" + (-1-numOffBoard-20)} className="piece" style={{position: "absolute", top: 13*separation, left: (4-numOffBoard)*separation, backgroundColor: "yellow", height: width, width: width}}></div>);
            numOffBoard += 1;
        }

    }

    //green pieces
    numOffBoard=0;
    for(const piece of greenPos) {
        
        if(piece===-1) {
            offBoardPieces.push(<div key={"" + (-1-numOffBoard-30)} className="piece" style={{position: "absolute", top: (4-numOffBoard)*separation, left: separation, backgroundColor: "green", height: width, width: width}}></div>);
            numOffBoard += 1;
        }

    }

    return offBoardPieces;
}

//Checks if a given board square contains a piece of any colour
//if it does - return a piece token on that square
function pieceChecker(index, spaceWidth, redPos, bluePos, yellowPos, greenPos) {
    if(redPos.includes(index)) {
        return <div className="piece" style={{backgroundColor: "red", height: spaceWidth, width: spaceWidth}}></div>
    } else if(bluePos.includes(index)) {
        return <div className="piece" style={{backgroundColor: "blue", height: spaceWidth, width: spaceWidth}}></div>
    } else if(yellowPos.includes(index)) {
        return <div className="piece" style={{backgroundColor: "yellow", height: spaceWidth, width: spaceWidth}}></div>
    } else if(greenPos.includes(index)) {
        return <div className="piece" style={{backgroundColor: "green", height: spaceWidth, width: spaceWidth}}></div>
    }
}

//Checks if a given board square contains an available move
//if it does - return a "move here" button on that space
function moveChecker(index, spaceWidth, availableMoves, movePiece) {
    if(availableMoves.includes(index)) {
        return <button className="move" onClick={()=>{movePiece(index)}} style={{height: spaceWidth, width: spaceWidth}}></button>
    }
}


export default Board;