import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    baseUrl: "https://images-api.nasa.gov/search?q=",
    query: 'moon',
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
      this.setState({
        images:
          data
            .collection
            .items
            .map(item => item.links)
            .flat()
            .filter(link => link.rel === "preview")
            .map(link => link.href)
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