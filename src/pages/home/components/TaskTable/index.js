import React from 'react';
import {connect} from 'dva';
import {Table, Spin, Badge, Divider} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import moment from 'moment';
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
    const _this = this;
    payload.state = "待审批";
    this.props.dispatch({
      type: 'homeModel/getTaskData',
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
    // const searchObj = this.child.getSearchValue();
    // 获取分页数据
    // this.getData({...getPageParam(data), ...searchObj});
    this.getData({...getPageParam(data)});
  };


  onClickUpdAuth = (data, state) => {

    this.props.dispatch({
      type: 'homeModel/updAuth',
      payload: {id: data.id, state},
      callback: (value) => {
        if (checkError(value)) {
          this.getData();
        }
      },
    });

  }


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
      title: '文件摘要',
      dataIndex: 'docAbs',
      key: 'docAbs'
    }, {
      title: '备注',
      dataIndex: 'note',
      key: 'note'
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
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => (
        <span>
          <Badge status="processing" text="待审批"/>
       </span>
      ),
    },

    {
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
           <a onClick={this.onClickUpdAuth.bind(this, record,"同意")}>同意</a>
           <Divider type="vertical"/>
           <a onClick={this.onClickUpdAuth.bind(this, record,"驳回")}>驳回</a>
       </span>
      ),
    },


  ];


  render() {
    const {loading} = this.state;

    const {taskData} = this.props.homeModel;
    const {pageNumber, total, pageSize, rows} = taskData;
    return (
      <div>
        <Spin spinning={loading}>

          {/*<Search*/}
          {/*onSearch={this.onSearchPanel}*/}
          {/*onRef={(value) => this.child = value}*/}
          {/*/>*/}

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
