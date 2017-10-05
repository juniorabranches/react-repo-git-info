import React, { PureComponent } from 'react';
import Repository from './Repository';

class UserRepos extends PureComponent {
  constructor(props){
    super(props);
    this.state = { reposCount: 0 };
  }

  componentWillMount() {
    this.setState({ reposCount: this.props.repos.length });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ reposCount: nextProps.repos.length });
  }

  renderPaging(){
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
  }

  render() {
    return (
      <div>
        <h2>Showing {this.state.reposCount} public repositories</h2>
          {
            this.props.repos.map(function(repo) {
              return <Repository key={repo.id} data={repo} />
            })
          }
        { this.renderPaging() }
      </div>
    );
  }
}

export default UserRepos;
