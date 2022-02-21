import Board from "./Board"
import React from "react";

  function calculateWinner(squares, dimension){
    const rows = new Array(dimension).fill(0);
    const cols = new Array(dimension).fill(0);
    const diag = new Array(2).fill(0);
    for (let row = 0; row < dimension; row++) {
      for (let col = 0; col < dimension; col++) {
        const square = squares[row * dimension + col];
        if (square === "X") {
          rows[row]++;
          cols[col]++;
        }
        else if (square === "O") {
          rows[row]--;
          cols[col]--;
        }
        if (row === col) 
          diag[0] += square === "X" ? 1 : -1;
        if (row === dimension - col - 1) 
          diag[1] += square === "X" ? 1 : -1;
      }
    }
    for (let i = 0; i < dimension; i++) {
      if (rows[i] === dimension || cols[i] === dimension) 
          return "X";
      else if (rows[i] === -dimension || cols[i] === -dimension) 
          return "O";
    }
    if (diag[0] === dimension || diag[1] === dimension) 
      return "X";
    
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
      }] 
    })
  }}

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
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
        const winner = calculateWinner(this.state.size,current.squares,parseInt(this.state.size));
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
        if (winner== "X") {
          status = "winner: " + winner;
        }  else if (winner == "O"){
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