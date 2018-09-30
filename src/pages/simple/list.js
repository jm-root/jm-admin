import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
class List extends Component {
  render() {
    return <Fragment>123</Fragment>;
  }
}

export default List;
