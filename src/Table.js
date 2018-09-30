import React from 'react';

export class RepoTitle extends React.Component {
  render() {
    const { title } = this.props;
    return (
      // <div className="repo-title">{ title }</div>
      <h4 className="repo-title">{ title }</h4>
    );
  }
}

export class RepoTweets extends React.Component {
  render() {
    const { tweets } = this.props;
    const rows = [];
    tweets.forEach( (status, key) => {
      rows.push(<li className="tweet-card" key= { key }>{ status.text }</li>);
    })
    return (
      <ul>
        { rows }
      </ul>
    );
  }
}

export class Table extends React.Component {
  render() {
    const { tweets } = this.props;
    const rows = [];

    tweets.forEach((repo, key) => {
      const title = 'GiHub Repository: ' + decodeURIComponent(repo.search_metadata.query);
      rows.push(
        <RepoTitle
          title={ title }
          key={ title + key}/>
      );
      rows.push(
        <RepoTweets
          tweets= { repo.statuses }
          key= { key } />
      );
    });

    return (
      <div>{ rows }</div>
    );
  }
}