import React from 'react';

import {Form, Row, Col, Input, Button, Select} from 'antd';
import {formatFormDateRange} from 'utils';
import ConInput from 'components/ConInput';
import ConRangePicker from 'components/ConRangePicker';

import styles from './index.less';

@Form.create()

class Search extends React.Component {
  state = {};

  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }

  handleSearch = (e) => {
    e.preventDefault();
    const param = this.getSearchValue();
    this.props.onSearch(param);
  };

  // 获取表单内容
  getSearchValue = () => {
    let param = {};
    this.props.form.validateFields((err, values) => {
      for (const key in values) {
        if (values[key]) {
          param[key] = values[key];
        }
      }
    });
    return param;
  };


  handleReset = () => {
    this.props.form.resetFields();
  };


  render() {

    const {form} = this.props;

    const formItemLayout = {
      labelCol: {sm: {span: 8}},
      wrapperCol: {sm: {span: 16}},
    };

    return (
      <div className="search-body">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >

          <Row >
            <Col  xs={6} sm={4} md={4} lg={4} xl={4}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="data"
                // label="文件名称"
                placeholder="内容"
              />
            </Col>

            <Col xs={6} sm={6} md={6} lg={4} xl={3} className="search-footer">
              <div>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Search;
