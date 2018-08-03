import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Icon } from 'antd';
import { Pie, ChartCard, MiniProgress } from 'components/Charts';
import Authorized from '../../utils/Authorized';
import styles from './Monitor.less';

const { Secured } = Authorized;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
  // Call resolve on behalf of passed
  setTimeout(() => resolve(), 1000);
});
@Secured(havePermissionAsync)
@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'monitor/fetchTags',
    });
  }

  render() {
    return (
      <Fragment>
        <Row gutter={24}>
          <Col span={6}>
            <Card bordered={false}>
              <Pie
                animate={false}
                percent={28}
                subTitle="CPU"
                total="28%"
                height={120}
                lineWidth={6}
              />
              <span className={styles.action}>
                {
                  <Tooltip title="四核CPU">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Pie
                animate={false}
                percent={46}
                subTitle="内存"
                total="46%"
                height={120}
                lineWidth={6}
                color="#5DDECF"
              />
              <span className={styles.action}>
                {
                  <Tooltip title="内存总容量16G">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Pie
                animate={false}
                percent={90}
                subTitle="在线AP"
                total="90%"
                height={120}
                lineWidth={6}
                color="#2FC25B"
              />
              <span className={styles.action}>
                {
                  <Tooltip title="在线180台, 离线200台">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <ChartCard
              bordered={false}
              title="在线用户数"
              action={
                <Tooltip title="峰值1000">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="900"
              contentHeight={64}
            >
              <MiniProgress percent={90} strokeWidth={8} target={90} color="#13C2C2" />
              <div style={{ height: '10px' }} />
            </ChartCard>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
