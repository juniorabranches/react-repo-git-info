var React = require('react');
var createReactClass = require('create-react-class');
var UserReposDetail = require('./UserReposDetail');

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

    var repos = this.props.repos.map(function(repo) {
      return (
        <UserReposDetail key={repo.id} repo={repo} />
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