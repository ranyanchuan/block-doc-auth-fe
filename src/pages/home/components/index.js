import React from 'react';
import {connect} from 'dva';
import {Spin, Tabs, Button} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import RegisterModal from 'components/RegisterModal';
import router from "umi/router";

import TaskTable from './TaskTable';
import ApprovalTable from './ApprovalTable';
import CommentTable from './CommentTable';
import FileTable from './FileTable';
import ReadTable from './ReadTable';
import TotalTable from './TotalTable';


import styles from './index.less';

const {TabPane} = Tabs;


@connect((state) => ({
  homeModel: state.homeModel,
  commonModel: state.commonModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
    activeKey: '1',
    registerModalVis: false,
  };


  componentDidMount() {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");


    if (userId && role === "manager") {
      this.getData();
    } else {
      router.push('/403');
    }
    this.getData();


  }


  onChangeTab = (value) => {
    this.setState({activeKey: value});
  }

  onClickCreate = () => {
    this.setState({
      registerModalVis: true, // 注册弹框
    });
  }

  // 隐藏弹框
  onHideModal = () => {
    this.setState({
      registerModalVis: false, // 注册弹框
    });
  };

  // 注册用户
  addUser = (payload, callback) => {
    this.props.dispatch({
      type: 'commonModel/addUser',
      payload,
      callback: (param) => {
        const {code} = param;
        let temp = false;
        if (code == 200) {
          temp = true;
          // this.onLogin(payload); // 用户登录
        }
        callback(temp)
      },
    });
  }


  // 获取数据
  getData = (payload = {}) => {
    this.setState({loading: true});
    const _this = this;
    this.props.dispatch({
      type: 'homeModel/getDashboardData',
      payload,
      callback: (data) => {
        let stateTemp = {loading: false};
        _this.setState(stateTemp);
      },
    });
  };


  render() {


    const {dashboardData} = this.props.homeModel;
    const {
      approvalCount = 0,
      commentCount = 0,
      fileCount = 0,
      readCount = 0,
      taskCount = 0,
      totalCount = 0,
    } = dashboardData;
    const {activeKey, loading, registerModalVis} = this.state;


    const operations = <Button style={{marginRight: 8}} onClick={this.onClickCreate}>创建用户</Button>;


    return (
      <div className={styles.home}>
        <Spin spinning={loading}>

          {/*小部件*/}
          <div className={styles.part}>
            <div>
              <div className={styles.pTitle}>我的待办</div>
              <div>
                <span className={styles.pNum}>{taskCount}</span>
                <span>个任务</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>文件管理</div>
              <div>
                <span className={styles.pNum}>{fileCount}</span>
                <span>个文件</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>总区块链</div>
              <div>
                <span className={styles.pNum}>{totalCount}</span>
                <span>个区块链</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>审批区块</div>
              <div>
                <span className={styles.pNum}>{approvalCount}</span>
                <span>个区块</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>阅读区块</div>
              <div>
                <span className={styles.pNum}>{readCount}</span>
                <span>个区块</span>
              </div>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>评论区块</div>
              <div>
                <span className={styles.pNum}>{commentCount}</span>
                <span>个区块</span>
              </div>
            </div>

          </div>

          <div className={styles.tab}>
            <Tabs
              defaultActiveKey={activeKey}
              onChange={this.onChangeTab}
              tabBarExtraContent={operations}
            >
              <TabPane tab="我的待办" key="1"/>
              <TabPane tab="文件管理" key="2"/>
              <TabPane tab="总区块链" key="3"/>
              <TabPane tab="审批区块" key="4"/>
              <TabPane tab="阅读区块" key="5"/>
              <TabPane tab="评论区块" key="6"/>
            </Tabs>


            {activeKey == '1' &&
            <TaskTable activeKey={activeKey}/>
            }

            {activeKey == '2' &&
            <FileTable activeKey={activeKey}/>
            }


            {activeKey == '3' &&
            <TotalTable activeKey={activeKey}/>
            }

            {activeKey == '4' &&
            <ApprovalTable activeKey={activeKey}/>
            }

            {activeKey == '5' &&
            <ReadTable activeKey={activeKey}/>
            }

            {activeKey == '6' &&
            <CommentTable activeKey={activeKey}/>
            }

          </div>


          {/*注册弹框*/}
          <RegisterModal
            visible={registerModalVis}
            onCancel={this.onHideModal}
            onSave={this.addUser}
          />


        </Spin>
      </div>
    );
  }
}

export default ProductApp;
