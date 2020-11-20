import {Link, Redirect} from "react-router-dom";

function Welcome() {

//   //form submit function
//   const gameCodeEnter = function(event) {
//     event.preventDefault();
//     let code = "";
//     if(event.target.createGame.value) {
//         code = event.target.createGame.value;
//     } else {
//         code = event.target.joinGame.value;
//     }

//     const linkUrl = `/game/${code}`;

//     console.log(linkUrl);

//     <Redirect to={linkUrl} />
//     console.log("this function called")
//   }

    

  return (
    <div className="Welcome">
      <header className="App-header">
        <h1 className="app-title">LUDO</h1>
        <form className="choose-game-form" > 
        {/* onSubmit={gameCodeEnter} */}
          <label htmlFor="joinGame" >Join Existing Game:</label>
          <input type="text" name="joinGame" placeholder="Enter game code here"></input>
          <label htmlFor="createGame">Create New Game:</label>
          <input type="text" name="createGame" placeholder="Enter game code here"></input>
          {/* <Link to={"/game/randomid"} >  */}
            <button type="submit">JOIN</button>
          {/* </Link> */}
        </form>
      </header>
    </div>
  );
}

export default Welcome;
