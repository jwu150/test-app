import React from 'react';


/**
 * Tweet Title, it is styled with a sticky header so that it will stick when its child elements (tweets) are scrolling
 *
 */
export class TweetTitle extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <h4 className="tweet-title">{ title }</h4>
    );
  }
}

/**
 * Tweet Card render as a ul, responsive when it is displayed in inline-block
 *
 */
export class Statuses extends React.Component {
  render() {
    const { statuses } = this.props;
    const rows = [];
    statuses.forEach( (status, key) => {
      rows.push(
        <li key= { key } className="tweet-card">
          <div className="tweet-card__title"><span className="tweet-card__user">{ status.user.name }</span>&nbsp;<span>@{ status.user.screen_name }</span></div>
          <div className="tweet-card__time">{ status.created_at }</div>
          <div className="tweet-card__text">{ status.text }</div>
        </li>
      )
    });
    return (
      <ul className="tweet-card__container">
        { rows }
      </ul>
    );
  }
}

/**
 * Tweet container, holds all the tweets found
 *
 */
export class Table extends React.Component {
  render() {
    const { tweets } = this.props;
    const rows = [];
    const title = 'Tweets Found:';
    rows.push(
      <Statuses statuses= { tweets.statuses }/>
    );

    return (
      <div>
        <TweetTitle title={ title }/>
        <div>{ rows }</div>
      </div>
    );
  }
}
