var React = require('react');
var GitHubUser = require('../services/GitHubUser');
var PropTypes = require('prop-types');

var SearchUser = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    GitHubUser.getByUsername(this.refs.username.value).then(function(response) {
      this.props.updateUser(response.data);
    }.bind(this));

    GitHubUser.getReposByUsername(this.refs.username.value).then(function(response) {
      this.props.updateRepos(response.data);
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

SearchUser.PropTypes = {
  updateUser: PropTypes.func.isRequired,
  updateRepos: PropTypes.func.isRequired,
};

module.exports = SearchUser;
