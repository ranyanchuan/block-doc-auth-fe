import React from 'react';
import {Form, Modal, Row, Col, Spin} from 'antd';
import moment from 'moment/moment';
import ConDate from 'components/ConDate';
import ConTextArea from 'components/ConTextArea';
import {footer} from 'utils';
const ruleDate = 'YYYY-MM-DD HH:mm:ss';

const titleObj = {
  add: '添加评论',
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
                <ConTextArea
                  form={form}
                  height={"60px"}
                  id="title"
                  label="内容"
                  placeholder="请输入内容"
                  message='请输入内容'
                  required={true}
                  defValue={basicData.title}
                  formItemLayout = {{
                    labelCol: { sm: { span: 6 } },
                    wrapperCol: { sm: { span: 18 } },
                  }}
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
