import React from 'react';
import {connect} from 'dva';

import {Badge, Modal, Table, Spin,} from 'antd';

import ConTreeNode from 'components/ConTreeNode';


import Search from './Search';
import {checkError, checkEdit, getPageParam, delMore} from 'utils';
import styles from './index.less';

@connect((state) => ({
  activitiManagerModel: state.activitiManagerModel,
}))

class App extends React.Component {

  state = {
    loading: false,
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
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
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
          <Badge status="processing" text="未申请"/>
          <Badge status="processing" text="待审批"/>
          <Badge status="processing" text="可阅读"/>
       </span>
      ),
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <span>
           {/*<a onClick={this.onDesignerProcess.bind(this, record)}>申请</a>*/}
           {/*<a onClick={this.onDesignerProcess.bind(this, record)}>查看</a>*/}
           {/*<a onClick={this.onDesignerProcess.bind(this, record)}>评论</a>*/}
       </span>
      ),
    },

  ];


  // 获取数据
  getMainData = (payload = {}) => {
    this.setState({loading: true});
    const searchObj = this.childSearch.getSearchValue();
    const { pageNumber, pageSize } = this.props.activitiManagerModel.docData;

    // 获取分页数,分页数量
    this.props.dispatch({
      type: 'activitiManagerModel/getDocData',
      payload: { pageNumber, pageSize, ...searchObj, ...payload },
      callback: (data) => {
        let stateTemp = {loading: false};
        this.setState(stateTemp);
      },
    });
  };

  // 搜索面板值
  onSearchPanel = (param) => {
    this.getMainData({...param});
  };

  // 修改分页
  onChangePage = (data) => {
    // 获取分页数据
    this.getMainData({...getPageParam(data)});
  };


  onLoading = (loading) => {
    this.setState({loading});
  };

  // 树节点点击
  onSelectTree = (item) => {
    const {id} = item[0];
    this.departmentId = id;
    this.getMainData({departmentId: id});
  };


  render() {
    const {loading,} = this.state;
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
        </Spin>
      </div>
    );
  }
}

export default App;
