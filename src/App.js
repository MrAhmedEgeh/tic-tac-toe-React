import React, { useState } from 'react';
// IMPORTING CSS
import './App.css';
// IMPORTING COMPONENTS
import Board from './Board/Board';
// IMPORTING IMAGES
import dragon from './images/Dragon.png';
import ninja from './images/Ninja.png';
import drawImg from './images/draw.png';
function App() {
    
  //--------Use States-------------------------------------------------
  const [player1, setPlayer1] = useState(['x', [], dragon]);
  const [player2, setPlayer2] = useState(['o', [], ninja]);
  const [winner, setWinner] = useState([false, '', ]);
  const [draw, setDraw] = useState(false);
  const [xTurn, setXTurn] = useState(true);

  //--------GAME Main function-------------------------------------------------
  let current;         // holds current player 
  let currentImg;     //  holds current player's image
  let currentResult; //   holds current player's result array

  const playGame = () => {
    if(winner[0] || draw){return}  // if there's a winner or a draw prevent execution
    if(xTurn){
      current = player1[0];
      currentImg = player1[2];
      currentResult = player1[1];
    }else{
      current = player2[0];
      currentImg = player2[2];
      currentResult = player2[1];
    }
  }
  //--------CHECK WINNER-------------------------------------------------
  const checkWinner = (c,img, arr) => {
    // possible winning combos
    const combinations = [
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      ['0', '4', '8'],
      ['2', '4', '6']

    ];
    for(let i = 0; i < combinations.length; i++){
      if(combinations[i].every(el => arr.includes(el)) && arr.length >= 3){
        setWinner([true, c, img]);
      }
    }
  }
  //-------- check draw---------------
  const checkDraw = () => {
    let total = [...player1[1], ...player2[1]];
    if(total.length >= 9){
      setDraw(true);
    }
  }
  /*-------For the 'play agian' button-----------*/
  const reset = () =>{
    setPlayer1(['x', [], dragon]);
    setPlayer2(['o', [], ninja]);
    setDraw(false);
    setWinner([false, '']);
    playGame();
  }
  //--------Function call-------------------------------------------------
  playGame();
  //--------RENDERING COMPONENTS-------------------------------------------------

  if(winner[0]){ // There's a winner
    return(
      <div className="App winner">
        <img src={winner[2]} alt="player avatar"/>
      <h3>{winner[1].toUpperCase()} won the game</h3>
      <button onClick={reset}><i class="fas fa-undo-alt"></i> Play again</button>
     </div>
    );
  }else if(draw){ /*-----nobody won the game*/
    return(
      <div className="App">
        <img src={drawImg} alt="player avatar"/>
        <h3>It's a draw</h3>
        <button onClick={reset}><i class="fas fa-undo-alt"></i> Play again</button>
      </div>
    );
  }else{ // GAME ONGOING
    return(
      <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board 
      current={current}
      playGame={playGame}
      xTurn={xTurn}
      setXTurn={setXTurn}
      currentResult={currentResult}
      checkWinner={checkWinner}
      checkDraw={checkDraw}
      currentImg={currentImg}
      />
    </div>
    );
  }
}

export default App;
