//import package dependencies
import React, {Component} from "react";
//import components
import DiceRoller from "../DiceRoller/DiceRoller"
//import styling
import "./Toolbar.scss"

class Toolbar extends React.Component {

    render() {
        return (
            <div className="toolbar">
                <DiceRoller roll={this.props.roll} rollFunc={this.props.rollFunc}/>
            </div>
        )
    }
}

export default Toolbar;