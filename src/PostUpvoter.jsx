import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export default graphql(gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`)(({
  mutate,
  postId,
}) => (
  <button onClick={() => mutate({ variables: { postId } })}>
    Upvote
  </button>
));