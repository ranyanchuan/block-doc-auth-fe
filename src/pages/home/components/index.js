import React from 'react';
import {connect} from 'dva';
import {Table, Spin, Divider} from 'antd';
import {checkError, checkEdit, getPageParam} from 'utils';
import TTable from './TTable';
import moment from 'moment';
import router from "umi/router";
import ConRadioGroup from "components/ConRadioGroup";

import Search from './Search';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';
import styles from './index.less';


@connect((state) => ({
  homeModel: state.homeModel,
}))

class ProductApp extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {

  }





  render() {
    const {status, visible, loading} = this.state;
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
              <div className={styles.pTitle}>总区块</div>
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


          <TTable/>


        </Spin>
      </div>
    );
  }
}

export default ProductApp;
