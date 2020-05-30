import React from 'react';
import {connect} from 'dva';

import {Badge, Modal, Table, Spin, Divider} from 'antd';

import ConTreeNode from 'components/ConTreeNode';
import router from 'umi/router';
import ActionModal from "./Modal";
import CModal from "./CModal";


import Search from './Search';
import {checkError, checkEdit, getPageParam, delMore} from 'utils';
import styles from './index.less';

@connect((state) => ({
  activitiManagerModel: state.activitiManagerModel,
}))

class App extends React.Component {

  state = {
    loading: false,
    visible: false,
    commentVisible: false,
    commentObj: {},
    status: "add",
    basic: {},
  };

  departmentId = "";
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
      key: 'title',  //   流程定义key+流程定义version+部署ID
    },
    {
      title: '摘要',
      dataIndex: 'abs',
      key: 'abs',
    },

    {
      title: '开始时间',
      dataIndex: 'sTime',
      key: 'sTime',
    },

    {
      title: '到期时间',
      dataIndex: 'eTime',
      key: 'eTime',
    },

    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => (
        <span>
          {text === "待审批" &&
          <Badge status="processing" text={text}/>
          }
          {(text === "到期" || text === "未申请" || text === "驳回") &&
          <Badge status="default" text={text}/>
          }

          {text === "同意" &&
          <Badge status="success" text={"可阅读"}/>
          }

       </span>
      ),
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
          {record.state === "未申请" &&
          <a onClick={this.onClickShow.bind(this, record)}>申请</a>
          }

          {(record.state === "驳回"  || record.state === "到期") &&
          <a onClick={this.onClickShow.bind(this, record)}>重新申请</a>
          }

          {record.state === "同意" &&
          <span>
            <a onClick={this.onClickView.bind(this, record)} target="_blank" href={`http://127.0.0.1:8080/images/${record.fileUrl}`}>查看</a>
            {/*<a ></a>*/}
            <Divider type="vertical"/>
            <a onClick={this.onClickComment.bind(this, record)}>评论</a>
          </span>
          }

       </span>
      ),
    },

  ];


  onClickView = (payload) => {
    this.props.dispatch({
      type: 'activitiManagerModel/addView',
      payload,
      callback: (data) => {
        // if (checkError(data)) {
        //   window.location.href = `http://127.0.0.1:8080/images/${payload.fileUrl}`;
        // }
      },
    });
  }

  // 获取数据
  getData = (payload = {}) => {
    this.setState({loading: true});
    const searchObj = this.childSearch.getSearchValue();
    const {pageNumber, pageSize} = this.props.activitiManagerModel.docData;
    if (!payload.departmentId) {
      payload.departmentId = this.departmentId;
    }
    // 获取分页数,分页数量
    this.props.dispatch({
      type: 'activitiManagerModel/getDocData',
      payload: {pageNumber, pageSize, ...searchObj, ...payload},
      callback: (data) => {
        let stateTemp = {loading: false};
        this.setState(stateTemp);
      },
    });
  };


  // onApply
  onApply = (payload = {}, callback) => {

    const {basicData} = this.state;
    if (!basicData.userId) {
      this.setState({loading: true});
      payload.docId = basicData.id;
      this.props.dispatch({
        type: 'activitiManagerModel/addAuth',
        payload,
        callback: (data) => {
          let temp = false;
          if (checkError(data)) {
            temp = true;
            this.getData();
          }
          callback(temp);
        },
      });
    } else {
      this.reInsert(payload, callback);
    }
  }

  //
  reInsert = (payload = {}, callback) => {
    this.setState({loading: true});
    const {basicData} = this.state;
    payload.docId = basicData.id;
    payload.userId = basicData.userId;
    this.props.dispatch({
      type: 'activitiManagerModel/reInsert',
      payload,
      callback: (data) => {
        let temp = false;
        if (checkError(data)) {
          temp = true;
          this.getData();
        }
        callback(temp);
      },
    });
  }


  onAddComment = (payload = {}, callback) => {
    this.setState({loading: true});
    const {commentObj} = this.state;
    payload.docId = commentObj.id;
    this.props.dispatch({
      type: 'activitiManagerModel/addComment',
      payload,
      callback: (data) => {
        let temp = false;
        if (checkError(data)) {
          temp = true;
          this.getData();
        }
        callback(temp);
      },
    });
  }

  //
  onClickComment = (data) => {
    this.setState({commentVisible: true, commentObj: data});
  }


  // 搜索面板值
  onSearchPanel = (param) => {
    this.getData({...param});
  };

  // 修改分页
  onChangePage = (data) => {
    // 获取分页数据
    this.getData({...getPageParam(data)});
  };


  onLoading = (loading) => {
    this.setState({loading});
  };

  // 树节点点击
  onSelectTree = (item) => {
    const {id} = item[0];
    this.departmentId = id;
    this.getData({departmentId: id});
  };

  onClickClose = () => {
    this.setState({visible: false, commentVisible: false});
  }

  onClickShow = (basicData) => {
    const userId=localStorage.getItem("userId");
    if(userId){
    this.setState({visible: true, basicData, status: 'add'});
    }else{
      Modal.warning({
        title: '警告',
        content: '请你先登录',
      });
    }
  }


  render() {
    const {loading, basicData, visible, status, commentObj, commentVisible} = this.state;
    const {docData} = this.props.activitiManagerModel;

    const {pageNumber, total, pageSize, rows} = docData;

    return (
      <div>
        <Spin spinning={loading}>

          <div className="tree-card">
            <div className="left-tree">
              <ConTreeNode
                url='/api/department/select'
                treeTitle='title'
                treeId='id'
                // onRef={ref => this.cTree = ref}
                onSelect={this.onSelectTree}
                onLoading={this.onLoading}
                showLine={true}
                isParentDisabled={true}
                defaultExpandAll={true}
              />
            </div>
            <div className="right-card">
              <Search
                onSearch={this.onSearchPanel}
                onRef={(value) => this.childSearch = value}
              />

              {/*<ConRadioGroup*/}
              {/*defaultValue={'add'}*/}
              {/*onClickAdd={this.onClickAddShow}*/}
              {/*onClickDel={this.onClickDel}*/}
              {/*onClickExport={this.onClickExport}*/}
              {/*onClickSet={this.onClickAddShow}*/}
              {/*onClickRefresh={this.onClickAddShow}*/}
              {/*/>*/}

              {/*查看流程部署*/}
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
                  current: pageNumber,
                  total,
                  pageSize: pageSize,
                }}
                scroll={{x: 'max-content'}}
                // loading={loading}
                onChange={this.onChangePage}
              />

            </div>
          </div>
          {/*申请弹框*/}
          <ActionModal
            visible={visible}
            onSave={this.onApply}
            status={status}
            onClose={this.onClickClose}
            basicData={basicData}
          />
          {/*评论弹框*/}
          <CModal
            visible={commentVisible}
            onSave={this.onAddComment}
            status={"add"}
            onClose={this.onClickClose}
            basicData={{}}
          />

        </Spin>
      </div>
    );
  }
}

export default App;
