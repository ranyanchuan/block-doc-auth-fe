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
    payload.type = "comment";
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
      title: '用户',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '部门',
      dataIndex: 'departmentTitle',
      key: 'departmentTitle',
    },

    {
      title: '文件名称',
      dataIndex: 'docTitle',
      key: 'docTitle'
    },

    {
      title: '开始时间',
      dataIndex: 'sTime',
      key: 'sTime'
    },
    {
      title: '到期时间',
      dataIndex: 'eTime',
      key: 'eTime'
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
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
