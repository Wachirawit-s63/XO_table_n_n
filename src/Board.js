import Square from "./Square";
import React from "react";

class Board extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state= {value: 5}
  //   // this.setState({ value : props.N});
  //   console.log(props.N)
  //   console.log(this.state.value)
  //   // console.log(this.setState.value)
  // }
  
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        size={this.props.size}
      />
    );
  }
  
  createBoard(N){
  let area_board = []
  let c = 0;
  for (let a = 0; a < N; a++ ){
    let row_board = []
    for (let b = 0; b < N; b++ ){
      row_board.push(this.renderSquare(c))
      c +=1
    }
    area_board.push(<div className="board-row">{row_board}</div>)
  }
  return area_board
}

  render() {  
      return (
        <div>
          {this.createBoard(this.props.size)}
        </div>
      )
  }
}

export default Board;