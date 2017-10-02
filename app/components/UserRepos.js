var React = require('react');

var UserRepos = React.createClass({
  getInitialState: function() {
    return {
      reposCount: 0,
    }
  },
  componentWillReceiveProps: function(props) {
    this.setState({reposCount: props.repos.length});
  },
  render: function() {
    var repos = this.props.repos.map(function(repo, key) {
      return (
        <div key={key} className="thumbnail">
          <div className="caption">
            <h3><a href={repo.html_url}> {repo.name}</a>
              <span className="badge">{repo.stargazers_count} Stars</span>
              <span className="badge">{repo.forks_count} Forks</span>
            </h3>
            <p>{repo.description}</p>
            <p>Main language: {repo.language}</p>
            <p>
              <a href={repo.html_url + '/issues'} className="btn btn-default" role="button">Issues ({repo.open_issues}) </a>
            </p>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h2>{this.state.reposCount} public repositories</h2>
        {repos}
      </div>
    );
  }
});

module.exports = UserRepos;