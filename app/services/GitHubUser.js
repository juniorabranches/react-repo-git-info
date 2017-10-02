var axios = require('axios');

var GitHubUser = {
  getByUsername: function (username) {
    return axios.get('https://api.github.com/users/' + username);
  },

  getReposByUsername: function (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos?page=1&per_page=500');    
  }
};

module.exports = GitHubUser;