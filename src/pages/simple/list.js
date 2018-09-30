import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

@connect(({ simple, loading }) => ({
  simple,
  loading: loading.models.simple,
}))
class List extends Component {
  render() {
    return <Fragment>123</Fragment>;
  }
}

export default List;
