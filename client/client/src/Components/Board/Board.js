//import package dependencies
import React, {Component} from "react";
//import code dependencies

//import styling
import "./Board.scss";

class Board extends React.Component {

    boardSpaces = [];

    render() {
        return (
            <div className="gameBoard">
                {console.log("board component renders")}
                {createBoard("small")}
                
            </div>
        )
    }
}


//creates board of given size (argument "small", "medium", or "large")
function createBoard(size) {

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

    console.log(spaceSeparation);

    const boardSpaces = [];

    //create first board space: top middle
    boardSpaces.push(<div id="0" key="0" style={StyleFromCoords(7, 0, spaceSeparation)} className="gameSpace" ></div>)
    //create subsequent board spaces: to the right and down 6
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+1)} key={""+(i+1)} style={StyleFromCoords(8, i, spaceSeparation)} className={conditionalClassName(i, 1, "gameSpace__red")}  ></div>)
    }
    //create subsequent board spaces: row from col 9 to end at y=6
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+7)} key={""+(i+7)} style={StyleFromCoords(i+9, 6, spaceSeparation)} className="gameSpace" ></div>)
    }
    //create right middle board space
    boardSpaces.push(<div id="13" key="13" style={StyleFromCoords(14, 7, spaceSeparation)} className="gameSpace" ></div>)
    //create subsequent board spaces: row from col 14 to 9 at y=8
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+14)} key={""+(i+14)} style={StyleFromCoords(14-i, 8, spaceSeparation)} className={conditionalClassName(i, 1, "gameSpace__blue")} ></div>)
    }
    //create subsequent board spaces: down 6 from y10 to y15
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+20)} key={""+(i+20)} style={StyleFromCoords(8, 9+i, spaceSeparation)} className="gameSpace"  ></div>)
    }
    //create bottom middle board space
    boardSpaces.push(<div id="26" key="26" style={StyleFromCoords(7, 14, spaceSeparation)} className="gameSpace" ></div>)
    //create subsequent board spaces: col 6 from y14 to y9
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+27)} key={""+(i+27)} style={StyleFromCoords(6, 14-i, spaceSeparation)} className={conditionalClassName(i, 1, "gameSpace__yellow")}  ></div>)
    }
    //create subsequent board spaces: row from col 5 to 0 at y=8
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+33)} key={""+(i+33)} style={StyleFromCoords(5-i, 8, spaceSeparation)} className="gameSpace" ></div>)
    }
    //create bottom middle board space
    boardSpaces.push(<div id="39" key="39" style={StyleFromCoords(0, 7, spaceSeparation)} className="gameSpace" ></div>)
    //create subsequent board spaces: row from col 9 to end at y=6
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+40)} key={""+(i+40)} style={StyleFromCoords(i, 6, spaceSeparation)} className={conditionalClassName(i, 1, "gameSpace__green")} ></div>)
    }
    //create subsequent board spaces: col 6 from y14 to y9
    for(let i=0; i<6; i++) {
        boardSpaces.push(<div id={""+(i+46)} key={""+(i+46)} style={StyleFromCoords(6, 5-i, spaceSeparation)} className="gameSpace"  ></div>)
    }

    //THESE ARE THE "HOME STRETCH" SPACES
    //top centre home stretch:
    for(let i=0; i<5; i++) {
        boardSpaces.push(<div id={""+(i+52)} key={""+(i+52)} style={StyleFromCoords(7, i+1, spaceSeparation)} className="gameSpace gameSpace__red"  ></div>)
    }
    //right centre home stretch:
    for(let i=0; i<5; i++) {
        boardSpaces.push(<div id={""+(i+57)} key={""+(i+57)} style={StyleFromCoords(13-i, 7, spaceSeparation)} className="gameSpace gameSpace__blue"  ></div>)
    }
    //bottom centre home stretch:
    for(let i=0; i<5; i++) {
        boardSpaces.push(<div id={""+(i+62)} key={""+(i+62)} style={StyleFromCoords(7, 13-i, spaceSeparation)} className="gameSpace gameSpace__yellow"  ></div>)
    }
    //left centre home stretch:
    for(let i=0; i<5; i++) {
        boardSpaces.push(<div id={""+(i+67)} key={""+(i+67)} style={StyleFromCoords(i+1, 7, spaceSeparation)} className="gameSpace gameSpace__green"  ></div>)
    }

    console.log(boardSpaces);

    return boardSpaces;
}

function StyleFromCoords(x, y, separation) {
    return {
        position: "absolute",
        top: y*separation,
        left: x*separation
    };
}

function conditionalClassName(i, index, className) {
    if(i === index) {
        return "gameSpace "+className;
    } else return 'gameSpace';
}


export default Board;