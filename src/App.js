import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTweets } from './tweetActions';
import { Row, Col } from 'reactstrap';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import logo from './logo.svg';
import './App.css';
import Cards from './Cards';

class App extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.tweets = [];
  }

  onFormSubmit = (event) => {
    event.preventDefault();  //prevent form submit, could use a regular button but this way we get Enter key for free
    this.props.dispatch(fetchTweets(event.target[0].value, event.target[1].value, this.props.totalProjects));
  }
  
  render() {
    const { error, loading, tweets} = this.props;
    const feeds = [];

    if (error) {
      feeds.push(<div>Error! {error.message}</div>);
    } else if (loading) {
      feeds.push(<div>Loading...</div>);
    } else if (tweets.length === 0) {
      feeds.push(<div>No Results Found</div>);
    }

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
                  // value={this.state.searchText}
                  // onChange={e => this.setState({ searchText: e.target.value })}
                />
              </div>
              <Label>Language:</Label>
              <Input className = "form-control" type="select" name="select" id="languageSelect">
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
          { feeds }
          <Cards tweets={ tweets } />
        </div>  
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tweets: state.items,
  loading: state.loading,
  error: state.error
});

App.defaultProps = {
  totalProjects: 5,
}

export default connect(mapStateToProps)(App);

