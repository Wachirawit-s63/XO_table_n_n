import Board from "./Board"
import React from "react";

function convertto2D(squares, size){
  let area = []
  for (let i = 0 ; i < size ; i++){
    let row = []
    for ( let j = 0 ; j < size ; j++){
      row.push(squares[i*size+j])
    }
  area.push(row)
  }
    return area;
}

function calculateWinner(squares,size){
 const D2 = convertto2D(squares,size)

 //horizon
  for (let i = 0; i< size ; i++){
    let correct = []
    for (let j = 0; j< size ; j++){
    correct.push(D2[i][j])
    }
    if (correct.every((Win)=>Win==='X')){
      return 'X'
    } else if (correct.every((Win)=>Win==='O')){
      return 'O'
    }
  }

//vertical
for (let i = 0; i< size ; i++){
  let correct = []
  for (let j = 0; j< size ; j++){
  correct.push(D2[j][i])
  }
  if (correct.every((Win)=>Win==='X')){
    return 'X'
  } else if (correct.every((Win)=>Win==='O')){
    return 'O'
  }
}

//diagonal Bottom right
for (let i = 0; i< size ; i++){
  let correct = []
  for (let j = 0; j< size ; j++){
  correct.push(D2[j][j])
  }
  if (correct.every((Win)=>Win==='X')){
    return 'X'
  } else if (correct.every((Win)=>Win==='O')){
    return 'O'
  }
}

//diagonal Bottom left
for (let i = 0; i< size ; i++){
  let correct = []
  for (let j = 0; j< size ; j++){
  correct.push(D2[j][size-j-1])
  }
  if (correct.every((Win)=>Win==='X')){
    return 'X'
  } else if (correct.every((Win)=>Win==='O')){
    return 'O'
  }
}
  return null;
}

class Game extends React.Component {
  
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleClickButton2 = this.handleClickButton2.bind(this);
        this.state = {
          size: 3,
          changesize :true,
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
        };
    }

    handleChange(event) {
      if (this.state.changesize === true) {
      this.setState({size:event.target.value ,
      history: [{
        squares: Array((event.target.value)*(event.target.value)).fill(null)
      }] ,
      stepNumber: 0
    })
  }}

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares,parseInt(this.state.size)) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    handleClickButton(){
      this.setState({ 
        changesize : false })
      alert("Size set to "+  this.state.size )
    }

    handleClickButton2(){
      this.setState({ 
        changesize : true ,
        })
      alert("You can change size" )
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    handleSubmit(event) {
      event.preventDefault();
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares,parseInt(this.state.size));
        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });

        let status;
        if (winner) {
          status = "winner: " + winner;
        } else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        
        return (
          <div>
          <form onSubmit={this.handleSubmit} >
          <label>
            Input N for size of table (N*N) (at least 3) :
            <input type="number" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Lock size" onClick={this.handleClickButton}/>
          <input type="submit" value="Unlock size" onClick={this.handleClickButton2}/>
        </form>
            <div className="game">
              <div className="game-board">
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                  size={this.state.size}
                />
              </div>
              <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
            </div>
          </div>
        );
    }
  }

export default Game;