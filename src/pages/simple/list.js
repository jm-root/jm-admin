import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

@connect(({ loading, global, simple }) => ({
  sdk: global.sdk,
  simple,
  loading: loading.models.simple,
}))
class List extends Component {
  async load() {
    const { sdk } = this.props;
    await sdk.onReady();
    const doc = await sdk.get('/simple/list');
    console.log(doc);
  }

  render() {
    this.load();
    return <Fragment>123</Fragment>;
  }
}

export default List;
