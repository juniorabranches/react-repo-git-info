var React = require('react');
var PropTypes = require('prop-types');
var UserRepos = require('./UserRepos');

function UserInfo(props) {

    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    function convertDate(inputFormat) {
      let d = new Date(inputFormat)
      return [monthNames[d.getMonth()], d.getFullYear()].join(' ')
    }

    function showSocial(user) {
      return <p>Followers: {user.followers} / Following: {user.following}</p>      
    }

    var userInfo = props.user ?
    (
      <div className="row">
        <div className="col-lg-4">
          <img className="img-circle" src={props.user.avatar_url} alt="avatar" width="140" height="140" />
          <h2>{props.user.name}</h2>
          <h4>{props.user.login}</h4>
          <p>{props.user.bio}</p>
          { props.user.type === 'User' && showSocial(props.user) }
          <p>Location: {props.user.location}</p>
          <p>Github user since: {convertDate(props.user.created_at)}</p>
          <p><a className="btn btn-default" href={props.user.html_url} role="button">View details</a></p>
        </div>
        <div className="col-lg-8">
          <UserRepos 
            repos={props.repos} 
            pagingButtons={props.pagingButtons} 
            updateRepos={props.updateRepos} 
          />
        </div>
      </div>
    ) : null;

    return userInfo;
}

UserInfo.propTypes = {
  user: PropTypes.object,
  repos: PropTypes.array,
  updateRepos: PropTypes.func
};

module.exports = UserInfo;