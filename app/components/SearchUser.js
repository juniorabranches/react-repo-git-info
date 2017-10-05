import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchUser extends PureComponent {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const { fetchUser } = this.props;
    const userName = this.refs.username.value;
    fetchUser(userName);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
           <a className="navbar-brand" href="">GitHub User Info</a>
          </div>
          <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input autoFocus type="text" ref="username" className="form-control" placeholder="juniorabranches"/>
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
}

SearchUser.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};

export default SearchUser;
