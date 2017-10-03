var React = require('react');
var SearchUser = require('./SearchUser');
var UserInfo = require('./UserInfo');
var GitHubUser = require('../services/GitHubUser');
var createReactClass = require('create-react-class');

var GitHub = createReactClass({
  getInitialState: function() {

    return {
      user: null,
      repos: [],
      pagingButtons: [],
    };

  },

  updateUser: function(user) {
    this.setState({user: user});
  },
  updateRepos: function(repos, pagingButtons) {
    this.setState({repos, pagingButtons});
  },

  fetchRepos: function(pageLink) {
    GitHubUser.getReposByLink(pageLink).then(function(response) {
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

      this.updateRepos(response.data, pagingButtons);
    }.bind(this));
  },

  render: function() {
    return (
      <div className="container">
        <SearchUser
          updateUser={this.updateUser}
          updateRepos={this.updateRepos}
        />
        <UserInfo
          user={this.state.user}
          repos={this.state.repos}
          pagingButtons={this.state.pagingButtons}
          updateRepos={this.fetchRepos}
        />
      </div>
    );
  }
});

module.exports = GitHub;