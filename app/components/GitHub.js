import React, { PureComponent } from 'react';
import SearchUser from './SearchUser';
import UserInfo from './UserInfo';
import _ from 'lodash';
import {
  getByUsername,
  getReposByUsername,
  getReposByLink
} from './../services/GitHubUser';

class GitHub extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      repos: [],
      error: null,
      pagingButtons: []
    };

    this.fetchUser = this.fetchUser.bind(this);
    this.updateRepos = this.updateRepos.bind(this);
  }

  fetchUser(userName){
    const isEmpty = _.isEmpty(userName);

    if (isEmpty) {
      this.setState({ error: 'Insert something to search!' });
    } else {
      getByUsername(userName)
        .then((user) => {

          getReposByUsername(userName).then((repos) => {
            const link = repos.headers.link;
            let pagingButtons;

            if (link) {
              pagingButtons = link.split(/, /).map(info => {
                const [_, link, text] = info.match(/<(http[^>]+)>; rel="(\w+)"/);
                return {
                  link,
                  text,
                };
              });
            }

            this.setState({
              error: null,
              user: user.data,
              repos: repos.data,
              pagingButtons
            });

          });

        }).catch((response) => {
          if (response.status == 404) {
            this.setState({ error: 'Nothing found, try again...' });
          } else if (response.status == 403) {
            this.setState({ error: 'Sorry, Github API access rate limit. Try again later.' });
          } else this.setState({ error: '' + response });           
        });
    }
  }

  updateRepos(pageLink){
    getReposByLink(pageLink).then((response) => {
      const link = response.headers.link;
      let pagingButtons;

      if (link) {
        pagingButtons = link.split(/, /).map(info => {
          const [_, link, text] = info.match(/<(http[^>]+)>; rel="(\w+)"/);
          return {
            link,
            text,
          };
        });
      }

      this.setState({ repos: response.data, pagingButtons });
    });
  }

  handleRender(){
    const hasUser = this.state.user && !this.state.error;

    if (hasUser) {
      return (
        <UserInfo
          user={this.state.user}
          repos={this.state.repos}
          updateRepos={this.updateRepos}
          pagingButtons={this.state.pagingButtons}
        />
      );
    }

    if (this.state.error) {
      return <h3>{this.state.error}</h3>
    }

    return null;
  }

  render () {
    return (
      <div className="container">
        <SearchUser fetchUser={this.fetchUser} />
        {this.handleRender()}
      </div>
    );
  }
}

export default GitHub;
