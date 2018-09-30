import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTweets } from './tweetActions';
import { Button, Container, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Table } from './Table';
import './App.css';

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
    const results = [];

    if (error) {
      results.push(<div key="error">Error! { error.message }</div>);
    } else if (loading) {
      results.push(<div key="loading">loading...</div>);
    } else if (tweets.length === 0) {
      results.push(<div key="no-records">No Results Found</div>);
    } else {
      results.push(<Table tweets={ tweets } />);
    }

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">GitHub Tweets</h1>
        </header>
        <Container className="Content">
          <Form onSubmit={this.onFormSubmit}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>Search Terms:</Label>
                <Input
                  className = "form-control"
                  type="text"
                  name="text"
                  placeholder="enter text"
                />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Language:</Label>
                  <Input className = "form-control" type="select" name="select" id="languageSelect">
                    <option value="assembler">Assembler</option>
                    <option value="c">C</option>
                    <option value="c++">C++</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Container>
        <div className="Results">
          { results }
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
  totalProjects: 10,
}

App.propTypes = {
  totalProjects: PropTypes.number
};

export default connect(mapStateToProps)(App);

