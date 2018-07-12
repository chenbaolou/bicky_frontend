import React from 'react';
import { Input, Col, Row } from 'antd';

import styles from './IPInput.less';

class IPInput extends React.Component {
  constructor(props) {
    super(props);
    const value = props.value || {
      ip1: '',
      ip2: '',
      ip3: '',
      ip4: '',
    };

    this.state = {
      ip1: value.ip1,
      ip2: value.ip2,
      ip3: value.ip3,
      ip4: value.ip4,
    };
  }

  handleChange = (e, ipx) => {
    const { value } = e.target;
    const reg = /^(0|[1-9][0-9]*)$/;
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      const { state } = this;
      const ipxObj = {};
      ipxObj[ipx] = value;
      this.setState({ ...state, ...ipxObj });
      this.triggerChange(ipxObj);
    }
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    let { state } = this;
    state = { ...state, changedValue };
    if (onChange) {
      onChange(`${state.ip1}.${state.ip2}.${state.ip3}.${state.ip4}`);
    }
  };

  handleIP1Change = e => {
    this.handleChange(e, 'ip1');
  };

  handleIP2Change = e => {
    this.handleChange(e, 'ip2');
  };

  handleIP3Change = e => {
    this.handleChange(e, 'ip3');
  };

  handleIP4Change = e => {
    this.handleChange(e, 'ip4');
  };

  render() {
    const { ip1, ip2, ip3, ip4 } = this.state;
    return (
      <div>
        <Row>
          <Col span={4}>
            <Input onChange={this.handleIP1Change} maxLength="3" value={ip1} />
          </Col>
          <Col span={1}>
            <span className={styles.ipDot}>.</span>
          </Col>
          <Col span={4}>
            <Input onChange={this.handleIP2Change} maxLength="3" value={ip2} />
          </Col>
          <Col span={1}>
            <span className={styles.ipDot}>.</span>
          </Col>
          <Col span={4}>
            <Input onChange={this.handleIP3Change} maxLength="3" value={ip3} />
          </Col>
          <Col span={1}>
            <span className={styles.ipDot}>.</span>
          </Col>
          <Col span={4}>
            <Input onChange={this.handleIP4Change} maxLength="3" value={ip4} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default IPInput;
