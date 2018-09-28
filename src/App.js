import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      dropdownOpen: false,
      searchText: '',
      language: '',
      response: ''
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target[0].value;
    const language = event.target[1].value;
        
    const url = 'https://api.github.com/search/repositories?q=' + searchTerm + '+language:' + language + '&sort=stars&order=desc';
    const twitterUrl = 'https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular';

    fetch(url)
    .then(response => response.json())
    .then((data) => {
      const reposNames = [];;
      const total = Math.min(this.props.totalProjects, data.items.length);
      for (let i = 0; i < total; i++) {
        reposNames.push(data.items[i].name);
      }
      this.setState({
        response: reposNames.join()
      });
      // return fetch(twitterUrl + data.items[0].url), {
      return fetch(twitterUrl, {
        method : 'GET',
        headers : { 
          'Authorization': 'Bearer ' + process.env.REACT_APP_BEARER_TOKEN
        }
      })
    })
    .then(response => response.json())
    .then(data => console.log(data.statuses.length))
    .catch(function(error) {
      console.log('Request failed', error)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">React Test Application</h1>
        </header>
        <Container className="Content">
          <Form onSubmit={this.onFormSubmit}>
            <FormGroup>
              <div className="form-group">
                <Label>Search Terms:</Label>
                <Input
                  className = "form-control"
                  type="text"
                  name="text"
                  placeholder="enter text"
                  value={this.state.searchText}
                  onChange={e => this.setState({ searchText: e.target.value })}
                />
              </div>
              <Label>Language:</Label>
              <Input className = "form-control" type="select" name="select" id="languageSelect"
                onChange={e => this.setState({ language: e.target.value })}>
                <option>Assembler</option>
                <option>C</option>
                <option>C++</option>
                <option>Java</option>
                <option>JavaScript</option>
              </Input>
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Container>
        <div>
          { this.state.response };
        </div>  
      </div>
    );
  }
}

export default App;

App.defaultProps = {
  totalProjects: 10
}
