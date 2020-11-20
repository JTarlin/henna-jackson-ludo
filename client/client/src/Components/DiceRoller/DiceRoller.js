import "./DiceRoller.scss";

export default function DiceRoller(props) {

    return (
        <div className="diceRoller">
            <h1 className="roll-display">{props.roll}</h1>
            <button onClick={props.rollFunc} className="roll-button">ROLL</button>
        </div>
    )

    
}