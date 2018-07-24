import React, { PureComponent } from 'react';
import { Form, Input, Select, Modal } from 'antd';
import { checkAPUnique } from '../../api/ap';
import { checkMAC } from '../../custom/Validator/Input';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
export default class APModal extends PureComponent {
  constructor(props) {
    super(props);
    const { apType } = props;
    const apTypeData = apType;
    this.state = {
      apIndex: 0,
      apname: '',
      basemac: '',
      apType: apTypeData.length > 0 ? String(apTypeData[0].apType) : '0',
      location: '',
      apMemo: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { editAPRecord } = nextProps;
    if (typeof editAPRecord !== 'undefined') {
      this.setState({
        apIndex: editAPRecord.apIndex,
        apname: editAPRecord.apname,
        basemac: editAPRecord.basemac,
        apType: String(editAPRecord.apType.apType),
        location: editAPRecord.location,
        apMemo: editAPRecord.apMemo,
      });
    }
  }

  render() {
    const { modalVisible, form, handleModalSubmit, handleModalVisible, apType } = this.props;
    const { state } = this;
    const apTypeData = apType;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleModalSubmit(fieldsValue);
      });
    };

    const checkUnique = (rule, value, callback) => {
      checkAPUnique({
        apIndex: state.apIndex,
        [rule.field]: value,
      }).then(data => {
        if (data.count > 0) {
          if (rule.field === 'basemac') {
            callback('基地址已经存在');
          } else if (rule.field === 'apname') {
            callback('AP名称已经存在');
          }
        }
        callback();
      });
    };
    return (
      <Modal
        title="新增AP"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => {
          handleModalVisible();
          form.resetFields();
        }}
      >
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="AP Index"
          style={{ display: 'none' }}
        >
          {form.getFieldDecorator('apIndex', {
            initialValue: state.apIndex,
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="AP名称">
          {form.getFieldDecorator('apname', {
            validateFirst: true,
            rules: [
              { required: true, message: 'AP名称不能为空' },
              { max: 128, message: 'AP名称最大长度不能超过128个字符' },
              { validator: checkUnique },
            ],
            initialValue: state.apname,
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="基地址">
          {form.getFieldDecorator('basemac', {
            validateFirst: true,
            rules: [
              { required: true, message: '基地址不能为空' },
              { validator: checkMAC },
              { validator: checkUnique },
            ],
            initialValue: state.basemac,
          })(<Input name="basemac" id="basemac" placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备类型">
          {form.getFieldDecorator('apType', {
            rules: [{ required: true, message: 'Please input some description...' }],
            initialValue: state.apType,
          })(
            <Select style={{ width: '100%' }}>
              {apTypeData.length > 0 &&
                apTypeData.map(item => {
                  return <Option key={item.apType}>{item.typeName}</Option>;
                })}
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备位置">
          {form.getFieldDecorator('location', {
            rules: [{ max: 256, message: '设备位置最大长度不能超过128个字符' }],
            initialValue: state.location,
          })(<TextArea rows={4} placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="备注">
          {form.getFieldDecorator('apMemo', {
            rules: [{ max: 128, message: '备注最大长度不能超过128个字符' }],
            initialValue: state.apMemo,
          })(<TextArea rows={4} placeholder="请输入" />)}
        </FormItem>
      </Modal>
    );
  }
}
