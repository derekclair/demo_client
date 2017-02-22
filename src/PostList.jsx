import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import PostUpvoter from './PostUpvoter';

export default graphql(gql`
  subscription postUpvoted {
    postUpvoted {
      id
      votes
    }
  }
`)(graphql(gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
`)(({
  data: { loading, posts },
}) => {
  if (loading) { return (<div>Loading</div>); }
  
  return (
    <ul>
      {[...posts].sort((x, y) => (y.votes - x.votes)).map(({
        id,
        title,
        author,
        votes,
      }) =>
        <li key={id}>
          {title} by {' '}
          {author.firstName} {author.lastName} {' '}
          <span>
            ({votes} votes)
          </span>
          <PostUpvoter postId={id} />
        </li>
      )}
    </ul>
  );
}));