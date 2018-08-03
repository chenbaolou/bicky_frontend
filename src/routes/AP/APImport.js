import React, { PureComponent } from 'react';
import { Modal, Upload, Button, Icon, message } from 'antd';
import { uploadURL } from '../../api/common';
import { batchImportAP } from '../../api/ap';

export default class APImport extends PureComponent {
  state = {
    fileList: [],
    submitted: false,
    formatError: false,
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const { handleModalVisible, reload } = this.props;
    this.setState({ submitted: true });
    if (fileList.length === 0) {
      return true;
    }
    const formData = new FormData();
    formData.append('fileName', fileList[0].response.fileName);

    batchImportAP(formData).then(response => {
      if (!response.success) {
        this.setState({ formatError: true });
      } else {
        const { insert, update, error, formatError } = response.data;
        message.info(`导入${insert}条, 更新${update}条, 格式错误${error + formatError}条.`, 5);
        handleModalVisible(false);
        reload();
      }
    });
  };

  handleChange = info => {
    this.setState({ formatError: false });

    let { fileList } = info;
    fileList = fileList.slice(-1);

    fileList = fileList.filter(file => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });
    this.setState({ fileList });
  };

  render() {
    const { modalVisible, handleModalVisible } = this.props;
    const { fileList, submitted, formatError } = this.state;
    const props = {
      action: uploadURL,
      onChange: this.handleChange,
    };
    return (
      <Modal
        title="导入AP"
        visible={modalVisible}
        onOk={this.handleUpload}
        onCancel={() => {
          handleModalVisible();
        }}
      >
        <Upload {...props} fileList={fileList}>
          <Button>
            <Icon type="upload" />选择文件
          </Button>
        </Upload>
        {fileList.length === 0 && submitted ? (
          <span style={{ color: '#F00' }}>请先上传文件</span>
        ) : (
          ''
        )}
        {formatError ? <span style={{ color: '#F00' }}>文件格式错误</span> : ''}
      </Modal>
    );
  }
}
