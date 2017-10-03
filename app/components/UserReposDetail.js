var React = require('react');
var createReactClass = require('create-react-class');
var GitHubUser = require('../services/GitHubUser');

var UserRepos = createReactClass({
  getInitialState: function() {
    return {
      languages: '',
    }
  },
  componentDidMount: function() {
    GitHubUser.getReposLanguages(this.props.repo.languages_url)
      .then(({ data }) => {
        this.setState({ languages: Object.keys(data).join(', ') });
        return Promise.resolve();
      });
  }, 
  render: function() {
    var repo = this.props.repo;
    return (
    <div className="thumbnail">
        <div className="caption">
            <h3><a href={repo.html_url}> {repo.name}</a>
                <span className="badge">{repo.stargazers_count} Stars</span>
                <span className="badge">{repo.forks_count} Forks</span>
            </h3>
            <p>{repo.description}</p>
            <p>Main language: {repo.language}</p>
            <p>All languages: {this.state.languages}</p>
            <p>
                <a href={repo.html_url + '/issues'} className="btn btn-default" role="button">Issues ({repo.open_issues}) </a>
            </p>
        </div>
    </div>
    );
  }
});

module.exports = UserRepos;