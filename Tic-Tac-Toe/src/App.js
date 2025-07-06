import React from 'react'
import { useState } from 'react';
import './App.css';

function Square({value, onSquareClick}){
  return (
  <button className='square' onClick={onSquareClick}>{value}</button>
  );
}

export default function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleclick(i){
    if(squares[i] || CalculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = 'X';
    }
    else{
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame(){
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = CalculateWinner(squares);
    let status;
    if(winner){
      status = 'winner : ' + winner;
    }
    else{
      status = 'Next Player : ' + (xIsNext ? 'X' : 'O');
    }


  return (
  <div className='board'> 
    <div className="status">{status}</div>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleclick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleclick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleclick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleclick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleclick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleclick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleclick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleclick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleclick(8)}/>
      </div>
      <button className='play-again-btn' onClick={resetGame}>Play Again</button>
  </div>
  )
}

function CalculateWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i=0; i<lines.length; i++){
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }