import React from "react";

class InN extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const value = event.target.value;
        if (!isNaN(+value)){ // true if its a number, false if not
        const {value2} = this.setState({value: event.target.value});
    }}
  
    handleSubmit(event) {
      event.preventDefault();
    }
    
    render() {
      return (
        <form onSubmit={this.handleSubmit} name = "N">
          <label>
            Input N for area of table (N*N) :
            <input type="text" name="InputN" value={this.state.value} onChange={this.handleChange}  />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default InN;


