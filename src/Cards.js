import React, { Component } from 'react';

export default class Cards extends React.Component {
  render() {
    const { tweets } = this.props;
    const feeds = [];;

    tweets.forEach(function(tweet, key) {
      const repo = decodeURIComponent(tweet.search_metadata.query);
      const foo = tweet.statuses;
      let tCard = [];
      tCard.push(<h3>{ repo }</h3>);
      foo.forEach( function(statuses, key)  {
        tCard.push(<li key={ key }>{ statuses.text }</li>)
      });
      feeds.push(tCard);
    });
  
    return (
      <div>
        { feeds }
      </div>
    );
  }
}