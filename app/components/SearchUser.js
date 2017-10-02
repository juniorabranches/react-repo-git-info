var React = require('react');
var GitHubUser = require('../services/GitHubUser');

var SearchUser = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    GitHubUser.getByUsername(this.refs.username.value).then(function(response) {
      this.props.updateUser(response.data);
    }.bind(this));

    GitHubUser.getReposByUsername(this.refs.username.value).then(function(response) {
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

      this.props.updateRepos(response.data, pagingButtons);
    }.bind(this));
  },

  render: function() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
           <a className="navbar-brand" href="">GitHub User Info</a>
          </div>
          <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input type="text" ref="username" className="form-control" placeholder="juniorabranches"/>
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </nav>
    );
  }
});

SearchUser.propTypes = {
  updateUser: React.PropTypes.func.isRequired,
  updateRepos: React.PropTypes.func.isRequired,
};

module.exports = SearchUser;
