import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Button, message, Popconfirm, Divider } from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import APModal from './APModal';

import styles from './APList.less';

const FormItem = Form.Item;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ ap, loading }) => ({
  ap,
  loading: loading.models.ap,
}))
@Form.create()
export default class APList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
    searchFormValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ap/fetch',
    });
    dispatch({
      type: 'ap/fetchAPType',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { searchFormValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...searchFormValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'ap/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      searchFormValues: {},
    });
    dispatch({
      type: 'ap/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        searchFormValues: values,
      });

      dispatch({
        type: 'ap/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, editAPRecord) => {
    this.setState({
      modalVisible: !!flag,
      editAPRecord,
    });
  };

  handleDelete = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ap/remove',
      payload: { apIndex: key },
      callback: () => {
        dispatch({
          type: 'ap/fetch',
        });
      },
    });
  };

  handleBatchDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;
    dispatch({
      type: 'ap/batch',
      payload: {
        delete: selectedRows.map(row => row.apIndex).join(','),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
        dispatch({
          type: 'ap/fetch',
        });
      },
    });
  };

  handleModalSubmit = fields => {
    const { dispatch } = this.props;
    const type = fields.apIndex !== 0 ? 'edit' : 'add';
    dispatch({
      type: type === 'edit' ? 'ap/edit' : 'ap/add',
      payload: fields,
      callback: () => {
        dispatch({
          type: 'ap/fetch',
        });
      },
    });
    const typeMsg = type === 'edit' ? '修改成功' : '添加成功';
    message.success(typeMsg);
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="AP名称">
              {getFieldDecorator('apname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="基地址">
              {getFieldDecorator('basemac')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      ap: { data, apType },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, editAPRecord } = this.state;

    const columns = [
      {
        title: 'AP Index',
        dataIndex: 'apIndex',
        width: 100,
        fixed: 'left',
      },
      {
        title: 'AP名称',
        dataIndex: 'apname',
        width: 150,
      },
      {
        title: '基地址',
        dataIndex: 'basemac',
        width: 150,
      },
      {
        title: '设备类型',
        dataIndex: 'apType.typeName',
        width: 200,
      },
      {
        title: '分组名称',
        dataIndex: 'group.groupName',
        width: 140,
      },
      {
        title: '设备位置',
        dataIndex: 'location',
      },
      {
        title: '描述',
        dataIndex: 'apMemo',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a href="javascript:;" onClick={() => this.handleModalVisible(true, record)}>
              修改
            </a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.apIndex)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </Fragment>
        ),
        width: 120,
      },
    ];

    const parentMethods = {
      handleModalSubmit: this.handleModalSubmit,
      handleModalVisible: this.handleModalVisible,
      apType,
      editAPRecord,
    };

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="upload" type="primary" onClick={() => this.handleModalVisible(true)}>
                导入
              </Button>
              <Button icon="download" type="primary" onClick={() => this.handleModalVisible(true)}>
                导出
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Popconfirm title="确认删除?" onConfirm={() => this.handleBatchDelete()}>
                    <Button>批量删除</Button>
                  </Popconfirm>
                </span>
              )}
            </div>
            <StandardTable
              rowKey="apIndex"
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              scroll={{ x: 1300 }}
            />
          </div>
        </Card>
        <APModal {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}
