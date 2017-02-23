import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class AddPost extends Component {
  constructor(props) {
    super(props);
    
    this.onSubmit = this._onSubmit.bind(this);
  }
  
  _onSubmit(e) {
    e.preventDefault();
    
    const firstName = findDOMNode(this.refs.firstName).value.trim();
    const lastName = findDOMNode(this.refs.lastName).value.trim();
            
    this.props.setUser(firstName, lastName);
    this.props.addAuthor(firstName, lastName);
  }
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          ref="firstName"
          type="text"
          placeholder="First"
        />
        <input
          ref="lastName"
          type="text"
          placeholder="Last"
        />
        <input
          type="submit"
          value="Join the Discussion"
        />
      </form>
    );
  }
}

export default graphql(gql`
  mutation newAuthor($firstName: String!, $lastName: String) {
    newAuthor(firstName: $firstName, lastName: $lastName) {
      id
    }
  }
`, {
  props: ({ ownProps: { setAuthorId }, mutate }) => ({
    addAuthor(firstName, lastName) {    
      mutate({ variables: { firstName, lastName } })
      .then(({ data: { newAuthor: { id } }}) => setAuthorId(id))
      .catch((err) => console.log('ERROR:', err));
    }
  }),
})(AddPost);