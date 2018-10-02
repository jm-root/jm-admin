import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import sdk from '@/pages/sdk';

@connect(({ loading, simple }) => ({
  simple,
  loading: loading.models.simple,
}))
class List extends Component {
  async load() {
    await sdk.onReady();
    await sdk.get('/simple/list');
  }

  render() {
    this.load();
    return <Fragment>123</Fragment>;
  }
}

export default List;
