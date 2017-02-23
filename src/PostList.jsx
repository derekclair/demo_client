import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import PostUpvoter from './PostUpvoter';
import AddAuthor from './AddAuthor';
import AddPost from './AddPost';

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
      comment
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
  ...props,
}) => {
  if (loading) { return (<div>Loading</div>); }
  
  return (
    <div>
      <h1>
        Demo:
      </h1>
      <h3>
        GrahpQL + Demo
      </h3>
      <ul>
        {[...posts].sort((x, y) => (y.votes - x.votes)).map(({
          id,
          comment,
          author,
          votes,
        }) =>
          <li key={id}>
            {comment}
            <span>
              ({votes} votes)
            </span>
            <div>
              {author.firstName} {author.lastName}
              <PostUpvoter postId={id} />
            </div>
          </li>
        )}
      </ul>
      {props.authorId ?
        <AddPost {...props} />
        :
        <AddAuthor {...props} />
      }
    </div>
  );
}));