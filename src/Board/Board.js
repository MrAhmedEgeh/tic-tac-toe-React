import React from 'react';
import './Board.css';
const Board = ({current, playGame, xTurn, setXTurn, currentResult, checkWinner, checkDraw, currentImg}) => {
    
    const cellClickHandler = (e) => {
        if(e.target.className === ''){
            e.target.className += current;
            currentResult.push(e.target.id);
            if(xTurn){
             setXTurn(false);
            }else{
             setXTurn(true);
            }
            checkWinner(current, currentImg,currentResult);
            checkDraw();
            playGame();
        }
    }
    return (
        <div onClick={cellClickHandler} className={`Board ${current}`}>
            <div id={0} className=''></div>
            <div id={1} className=''></div>
            <div id={2} className=''></div>
            <div id={3} className=''></div>
            <div id={4} className=''></div>
            <div id={5} className=''></div>
            <div id={6} className=''></div>
            <div id={7} className=''></div>
            <div id={8} className=''></div>
        </div>
    );
}

export default Board;
