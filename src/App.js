import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    baseUrl: "http://10.0.2.2:8080/images?q=",
    query: 'clouds',
    images: []
  }

  componentDidMount() {
    this.fetchData()
  }

  handleTextChange = e => {
    const { value } = e.target;
    this.setState({ query: value })
  }

  handleSubmit = e => {
    this.fetchData()
  }

  fetchData(){
    fetch(this.state.baseUrl+this.state.query)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      
      this.setState({
        images: data
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.query} onChange={this.handleTextChange} />
          <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
        <p />
        <div>
          {
            this.state.images.map((image, index) => (
              <img key={index} src={image} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;