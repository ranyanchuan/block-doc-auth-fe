import React from 'react';
import {connect} from 'dva';
import {Table, Spin, Modal} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import moment from 'moment';
import ConRadioGroup from "components/ConRadioGroup";

import Search from '../TSearch';
import FileModal from '../FileModal';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';

const confirm = Modal.confirm;

@connect((state) => ({
  homeModel: state.homeModel,
}))

class App extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
  };

  componentDidMount() {
    this.getData();
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: '摘要',
      dataIndex: 'abs',
      key: 'abs'
    },
    {
      title: '路径',
      dataIndex: 'fileUrl',
      key: 'fileUrl',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
  ];


  // 获取数据
  getData = (payload = {}) => {
    this.setState({loading: true});
    payload.type = "file";
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


  //添加表格数据
  addData = (payload, callback) => {
    payload.type = "file";
    this.props.dispatch({
      type: 'homeModel/addDoc',
      payload,
      callback: (value) => {
        let temp = false;
        if (checkError(value)) {
          temp = true;
          this.getData();
        }
        callback(temp);
      },
    });
  };

  //删除表格数据
  delDoc = (payload, callback) => {
    this.props.dispatch({
      type: 'homeModel/delDoc',
      payload,
      callback: (value) => {
        let temp = false;
        if (checkError(value)) {
          temp = true;
          this.getData();
        }
        callback(temp);
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


  onClickAddShow = () => {
    this.setState({visible: true, status: 'add'});
  }

  onClickClose = () => {
    this.setState({visible: false, status: 'add'});
  }

  // 删除弹框确认
  showDelCon = (payload) => {
    const _this = this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delMainData(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };


  render() {
    const {loading, visible, status} = this.state;

    const {taskData} = this.props.homeModel;
    const {pageNumber, total, pageSize, rows} = taskData;
    return (
      <div>
        <Spin spinning={loading}>

          <Search
            onSearch={this.onSearchPanel}
            onRef={(value) => this.child = value}
          />

          <ConRadioGroup
            defaultValue={'add'}
            onClickAdd={this.onClickAddShow}
            onClickDel={this.showDelCon}
          />

          {/*添加表单*/}
          <FileModal
            visible={visible}
            onSave={this.addData}
            status={status}
            onClose={this.onClickClose}
            basicData={{}}
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
