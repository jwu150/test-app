import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      searchText: '',
      language: ''
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
              <Input type="select" className = "form-control" type="select" name="select" id="languageSelect"
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
          {this.state.searchText}&nbsp;
          {this.state.language}
        </div>  
      </div>
    );
  }
}

export default App;
