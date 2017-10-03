var React = require('react');
var axios = require('axios');
var createReactClass = require('create-react-class');

var Repository = createReactClass({
    getInitialState: function() {
        return { languages: [] }
    },
    componentDidMount: function() {
        return axios.get(this.props.data.languages_url).then(function(response){
            this.setState({ languages: Object.keys(response.data) });
        }.bind(this));
    },
    render: function() {
        var languages =  this.state.languages.reduce(function(data, language) {
            return data ?  data + ', ' + language : language;
        }, null);
        return (
            <div key={this.props.data.id} className="thumbnail">
                <div className="caption">
                <h3><a href={this.props.data.html_url}> {this.props.data.name}</a>
                    <span className="badge">{this.props.data.stargazers_count} Stars</span>
                    <span className="badge">{this.props.data.forks_count} Forks</span>
                </h3>
                <p>{this.props.data.description}</p>
                <p>Main language: {this.props.data.language}</p>
                {
                    this.state.languages && this.state.languages.length > 0 &&
                    <p>Languages: {languages}</p>
                }
                <p>
                    <a href={this.props.data.html_url + '/issues'} className="btn btn-default" role="button">Issues ({this.props.data.open_issues}) </a>
                </p>
                </div>
            </div>
        );
    }
});

module.exports = Repository;