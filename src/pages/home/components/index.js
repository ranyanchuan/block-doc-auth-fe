import React from 'react';
import {connect} from 'dva';
import {Table, Spin, Tabs} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import TaskTable from './TaskTable';
import moment from 'moment';
import router from "umi/router";
import ConRadioGroup from "components/ConRadioGroup";

import Search from './Search';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';

const {TabPane} = Tabs;


@connect((state) => ({
  homeModel: state.homeModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
    activeKey: '1',
  };

  componentDidMount() {

  }


  onChangeTab = (value) => {
    console.log("value", value)
  }


  render() {
    const {activeKey, visible, loading} = this.state;
    return (
      <div className={styles.home}>
        <Spin spinning={loading}>

          {/*小部件*/}
          <div className={styles.part}>
            <div>
              <div className={styles.pTitle}>我的待办</div>
              <p>8个任务</p>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>文件管理</div>
              <p>8个任务</p>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>总区块链</div>
              <p>8个任务</p>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>审批区块</div>
              <p>8个任务</p>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>阅读区块</div>
              <p>8个任务</p>
            </div>
            <div className={styles.line}></div>
            <div>
              <div className={styles.pTitle}>评论区块</div>
              <p>8个任务</p>
            </div>

          </div>

          <div className={styles.tab}>
            <Tabs defaultActiveKey={activeKey} onChange={this.onChangeTab}>
              <TabPane tab="我的待办" key="1"/>
              <TabPane tab="文件管理" key="2"/>
              <TabPane tab="总区块链" key="3"/>
              <TabPane tab="审批区块" key="4"/>
              <TabPane tab="阅读区块" key="5"/>
              <TabPane tab="评论区块" key="6"/>
            </Tabs>
            <TaskTable/>
          </div>



        </Spin>
      </div>
    );
  }
}

export default ProductApp;
