var React = require('react');
var createReactClass = require('create-react-class');

var UserRepos = createReactClass({
  getInitialState: function() {
    return {
      reposCount: 0,
    }
  },
  componentWillReceiveProps: function(props) {
    this.setState({reposCount: props.repos.length});
  },
  renderPaging: function() {
    const { updateRepos } = this.props;
    const pagingButtons = !!this.props.pagingButtons
      ? this.props.pagingButtons.slice(2).concat(this.props.pagingButtons.slice(0, 2)) 
      : [];

    return (
      <ul className="pagination">
        { pagingButtons.map((pagingInfo, i) =>
          <li key={ i }>
            <a href={ pagingInfo.link }
              onClick={ (e) => { e.preventDefault(); updateRepos(pagingInfo.link) } }>
              { pagingInfo.text }
            </a>
          </li>
        )}
      </ul>
    );
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
        <h2>Showing {this.state.reposCount} public repositories</h2>
        {repos}

        { this.renderPaging() }
      </div>
    );
  }
});

module.exports = UserRepos;