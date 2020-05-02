import React from 'react';
import {connect} from 'dva';
import {Table, Spin, Divider} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import moment from 'moment';
import router from "umi/router";
import ConRadioGroup from "components/ConRadioGroup";

import Search from '../TSearch';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';


@connect((state) => ({
  homeModel: state.homeModel,
}))

class App extends React.Component {

  state = {
    loading: false,
  };

  componentDidMount() {
    this.getData();
  }


  // 获取数据
  getData = (payload = {}) => {
    this.setState({loading: true});
    payload.type="approval";
    const _this = this;
    this.props.dispatch({
      type: 'homeModel/getBlockData',
      payload,
      callback: (data) => {
        let stateTemp = {loading: false};
        _this.setState(stateTemp);
      },
    });
  };


  // 搜索面板值
  onSearchPanel = (param) => {
    this.getData({...param});
  };


  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getData({...getPageParam(data), ...searchObj});
  };


  columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: '存证人',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: '类型',
      dataIndex: 'category',
      key: 'category'
    },

    {
      title: '存证时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },

    {
      title: '区块高度',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: '存证哈希值',
      dataIndex: 'hash',
      key: 'hash',
    },

    {
      title: '内容',
      dataIndex: 'data',
      key: 'data',
    },
  ];


  render() {
    const {loading} = this.state;

    const {taskData} = this.props.homeModel;
    const {pageNumber, total, pageSize, rows} = taskData;
    return (
      <div>
        <Spin spinning={loading}>

          <Search
            onSearch={this.onSearchPanel}
            onRef={(value) => this.child = value}
          />

          <Table
            className={styles.table}
            rowKey={record => record.id.toString()}
            // rowSelection={rowSelection}
            columns={this.columns}
            size="small"
            dataSource={rows}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: pageSize,
              pageSizeOptions: ['10', '20', '50', '100', '500'],
              current: pageNumber + 1,
              total,
              pageSize: pageSize,
            }}

            // loading={loading}
            onChange={this.onChangePage}
          />
        </Spin>
      </div>
    );
  }
}

export default App;
