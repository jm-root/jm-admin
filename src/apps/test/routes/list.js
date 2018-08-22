import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

@connect(({ test, loading }) => ({
  test,
  loading: loading.models.test,
}))
export default class List extends Component {
  render() {
    const { test, loading } = this.props;

    console.log(test.list);
    return <Fragment>123</Fragment>;
  }
}
