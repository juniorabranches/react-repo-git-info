var axios = require('axios');

var GitHubUser = {
  getByUsername: function (username) {
    return axios.get('https://api.github.com/users/' + username);
  },

  getReposByUsername: function (username, page = 1) {
    return axios.get(`https://api.github.com/users/${username}/repos?page=${page}`);
  },

  getReposByLink: function (pageLink) {
    return axios.get(pageLink);
  },
};

module.exports = GitHubUser;