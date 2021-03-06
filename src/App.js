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
  }
  
  /**
   * Submit form, using a form we get Enter key for free, but need to prevent event bubble
   *
   * @param {event} event - button event for the form
   */
  onFormSubmit = (event) => {
    event.preventDefault();  
    const searchTerm = event.target[0].value.toLowerCase();
    const language = event.target[1].value;
    this.props.dispatch(fetchTweets(searchTerm, language, this.props.totalProjects));
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
      results.push(<Table key="results" tweets={ tweets } />);
    }

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Twitter Search</h1>
        </header>
        <Container className="Content">
          <Form onSubmit={this.onFormSubmit}>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <Label>Enter Keyword:</Label>
                <Input
                  className = "form-control"
                  type="text"
                  name="text"
                  placeholder="enter text"
                />
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

/**
 * proptypes that are unique to toggle buttons
 *
 * @property {number} [totalProjects] - not used
 */
App.propTypes = {
  totalProjects: PropTypes.number
};

export default connect(mapStateToProps)(App);

