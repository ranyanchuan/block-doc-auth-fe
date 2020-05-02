import React from 'react';
import {Form, Modal, Row, Col, Spin} from 'antd';
import moment from 'moment/moment';
import ConDate from 'components/ConDate';
import ConTextArea from 'components/ConTextArea';
import {footer} from 'utils';
const ruleDate = 'YYYY-MM-DD HH:mm:ss';

const titleObj = {
  add: '申请查看文档',
};

@Form.create()

class ActionModal extends React.Component {

  state = {
    loading: false,
  };


  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.onClose();
      this.props.form.resetFields();
    }
    this.setState({loading: false});
  };
  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({loading: true});
        fieldsValue.sTime = moment(fieldsValue.sTime).format(ruleDate);
        fieldsValue.eTime = moment(fieldsValue.eTime).format(ruleDate);

        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };


  render() {
    const {loading} = this.state;
    const {visible, form, status, basicData = {}} = this.props;
    const disabled = (status === 'desc') ? true : false;

    return (
      <Modal
        title={titleObj[status]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        confirmLoading={loading}
        okText="确认"
        cancelText="取消"
        {...footer(disabled)}
        width="400px"
      >
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>

              <Col span={24}>
                <ConDate
                  form={form}
                  id="sTime"
                  label="开始时间"
                  placeholder="请选择开始时间"
                  message='请选择开始时间'
                  required={true}
                  defValue={basicData.sTime}
                />
              </Col>
              <Col span={24}>
                <ConDate
                  form={form}
                  id="eTime"
                  label="结束"
                  placeholder="请选择结束时间"
                  message='请选择结束时间'
                  required={true}
                  defValue={basicData.eTime}
                />
              </Col>
              <Col span={24}>
                <ConTextArea
                  form={form}
                  id="note"
                  label="备注"
                  placeholder="请输入备注"
                  message='请输入备注'
                  required={true}
                  defValue={basicData.note}
                />
              </Col>


            </Row>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default ActionModal;
