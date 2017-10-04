import React, { PureComponent } from 'react';
import SearchUser from './SearchUser';
import UserInfo from './UserInfo';
import _ from 'lodash';
import { getByUsername, getReposByUsername } from './../services/GitHubUser';

class GitHub extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      repos: [],
      error: null
    };
    this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser(userName){
    const isEmpty = _.isEmpty(userName);

    if (isEmpty) {
      this.setState({ error: 'Insira o nome do usuario.' });
    } else {
      getByUsername(userName)
        .then((user) => {
          getReposByUsername(userName).then((repos) => {
            const info = {
              user: user.data,
              repos: repos.data
            };
            if (this.state.error) info.error = null;

            this.setState(info);
          });
        }).catch((response) => {
          this.setState({ error: 'Usuario não encontrado.' });
        });
    }
  }

  handleRender(){
    const hasUser = this.state.user && !this.state.error;

    if (hasUser) {
      return (
        <UserInfo
          user={this.state.user}
          repos={this.state.repos}
        />
      );
    }

    if (this.state.error) {
      return <h2>{this.state.error}</h2>
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
