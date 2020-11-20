import {useHistory} from "react-router-dom";

function Welcome() {

    //prepare usehistory function for button click
    let history = useHistory();

    //form submit function
    const gameCodeEnter = function(event) {
        event.preventDefault();
        let code;
        if(event.target.joinGame.value) {
            code = event.target.joinGame.value;
        }

        const linkUrl = `/game/${code}`;

        history.push(linkUrl);
  }

    const newGame = function(event) {
      event.preventDefault();

      let code = Math.floor(Math.random()*1000);
      const linkUrl = `/game/${code}`;
      history.push(linkUrl);
    }



  return (
    <div className="Welcome">
      <header className="App-header">
        <h1 className="app-title">LUDO</h1>
        <form className="choose-game-form" onSubmit={gameCodeEnter} > 
            
            <label htmlFor="joinGame" >Join Existing Game:</label>
            <input type="text" name="joinGame" placeholder="Enter game code here"></input>
            
            <button type="submit">JOIN</button>
        </form>
        <p>Create New Game:</p>
        <button onClick={newGame}>CREATE</button>
      </header>
    </div>
  );
}

export default Welcome;
