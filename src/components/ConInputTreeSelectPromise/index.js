import React from 'react';
import {Form, TreeSelect, Spin, message} from 'antd';
import {requestJson} from 'utils/request';
import {formData, connectTree} from 'utils/index';

const {SHOW_PARENT, SHOW_ALL} = TreeSelect;


@Form.create()

class ConInputTreeSelectPromise extends React.Component {

  state = {
    defValue: '',
    loading: false,
    treeData: [],
    isChange: false,
  };

  cacheObj = {};


  // todo 默认值没有找到， 会一直往下找
  async componentDidMount() {
    const {defValue = '', defId = '', onRef, payload} = this.props;

    this.setState({defValue: this.dedupe(defValue).toString()});

    if (onRef) {
      this.props.onRef(this);
    }
    this.setState({loading: true});
    let {data, code, info} = await this.treeService(payload);

    // 错误处理
    if (code == '-1') {
      message.error(info);
      return;
    }

    let treeData = [];
    // 兼容接口
    if (data) {
      treeData = Array.isArray(data) ? data : data.rows;
    }
    this.setState({treeData, loading: false});

    this.cacheObj = {}; // 清空缓存
    this.createSelectMap(defValue, defId);

  }


  async componentWillReceiveProps(nextProps) {
    const {defValue = '', defId = '', isLoadingData, payload, form, id} = nextProps;
    if (isLoadingData && payload && (JSON.stringify(payload) !== JSON.stringify(this.props.payload))) {
      this.setState({loading: true});
      let {data, code, info} = await this.treeService(payload);

      // 错误处理
      if (code == '-1') {
        message.error(info);
        return;
      }

      // 兼容接口
      let treeData = Array.isArray(data) ? data : data.rows;
      this.setState({treeData, loading: false});
    }
    if (defValue && defValue !== this.props.defValue) { // 参照级联

      this.setState({defValue: this.dedupe(defValue).toString()});
      form.setFieldsValue({[id]: this.dedupe(defValue)});

      this.cacheObj = {}; // 清空缓存
      this.createSelectMap(defValue, defId);

    }


    if (isLoadingData !== this.props.isLoadingData) { // 弹框清空 再显示
      this.setState({defValue: this.dedupe(defValue).toString()});
      form.setFieldsValue({[id]: this.dedupe(defValue)});

      this.cacheObj = {}; // 清空缓存
      this.createSelectMap(defValue, defId);
    }


  }

  createSelectMap = (value = '', id = '') => {
    const defValArr = value.split(',');
    const defIdArr = id.split(',');
    for (const [index, item] of defIdArr.entries()) {
      this.cacheObj[item] = defValArr[index];
    }
  };


  // 获取
  treeService = (payload = {}) => {
    const {url} = this.props;
    return requestJson(url, {
      method: 'POST',
      payload,
    });
  };


  onFocus = () => {
    console.log('onFocusddd');
  };


  // getKeyValue

  getKeyValue = () => {

    // const { defValue, isChange } = this.state;
    // const { defId } = this.props;
    //
    // let keyString = defId;
    // let valueString = defValue;
    //
    // if (isChange) { // 如果修改后
    //
    //   let tempId = this.dedupe(defValue); // 去重
    //   valueString = tempId.map(item => {
    //     return this.cacheObj[item];
    //   }).toString();
    //   keyString = tempId.toString();
    // }
    //
    // return { id: keyString, value: valueString };


    const {defValue} = this.state;
    // console.log("this.cacheObj[",this.cacheObj);
    let idArr = [];
    let valArr = [];
    let tempId = this.dedupe(defValue); // 去重
    for (let ele of tempId) {
      let temp = this.cacheObj[ele];
      if (temp) { // 判断为 key
        idArr.push(ele);
        valArr.push(temp);
      } else {
        // 没有找到 key，那么key 为中文
        for (let item in this.cacheObj) {
          if (this.cacheObj[item] === ele) {
            idArr.push(item);
            valArr.push(ele);
            break;
          }
        }
      }
    }
    return {id: idArr.toString(), value: valArr.toString()};
  };


  dedupe = (value) => {
    return value ? Array.from(new Set(value.split(','))) : [];
  };


  //onChange
  onChange = (keys, values, nodes) => {

    const newKeys = [];
    for (const [index, ele] of values.entries()) {
      if (ele) {
        newKeys.push(keys[index]);
        this.cacheObj[keys[index]] = ele;
        continue;
      }

      // 没有找到 key，那么key 为中文
      for (let item in this.cacheObj) {
        if (this.cacheObj[item] === keys[index]) {
          newKeys.push(item);
          break;
        }
      }

    }

    this.setState({defValue: newKeys ? newKeys.toString() : '', isChange: true});

  };

  debounce = (fn, delay = 3000) => {
    //期间间隔执行 节流
    return (...rest) => { //箭头函数是没有arguments的 所以用...rest 来代替
      let args = rest;
      if (this.state.timerId) clearTimeout(this.state.timerId);//要用this.timerId 而不能直接定义var timerId=null;
      this.state.timerId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  };

  getTreeSearchData = async (value) => {
    const {
      isSearchBe = true, // 是否后端搜索
      payload,
      treeOptionTitle,
    } = this.props;

    if (isSearchBe) {
      this.setState({loading: true});
      let {data} = await this.treeService({...payload, [treeOptionTitle]: value});
      let treeData = [];
      if (data) {
        treeData = Array.isArray(data) ? data : data.rows;       // 兼容接口
      }
      this.setState({treeData, loading: false});
    }
  };


  onSearchTree = (value) => {
    let debounceAjax = this.debounce(this.getTreeSearchData, 500);
    debounceAjax(value);
  };


  onSelectTree = (selectedKeys, param) => {

    const {selectedNodes, props} = param;

    if (selectedKeys.length > 0) { // 第二次点击不让取消
      this.setState({selectedKeys});
    }

    const {onSelect, otherSelectData} = this.props;
    if (onSelect) {
      let selectResult = [];
      if (selectedNodes) {
        selectResult = selectedNodes.map((item) => {
          return item.props ? item.props.dataRef : {};
        });
      } else {
        selectResult.push(props.dataRef);
      }
      this.props.onSelect(selectResult, otherSelectData);
    }
  };

  getTreeSelect = () => {
    return this.state.defValue;
  };


  changeTreeData = (data) => {

    const {treeOptionId = 'id', treeOptionTitle = 'title'} = this.props;

    if (!Array.isArray(data)) {
      return data;
    }
    return data.map(item => {
      let {children, hasChild} = item;

      let result = {};

      if (children && Array.isArray(children) && children.length > 0) {
        result.children = this.changeTreeData(children);
      }

      //  todo 优化
      if (children.length > 0) {
        result.isLeaf = false;
        result.disabled = true;

      } else {
        result.isLeaf = true;
        result.disabled = false;
      }
      result.value = item[treeOptionId];
      result.key = item[treeOptionId].toString();
      result.title = item[treeOptionTitle];
      result.dataRef = item;
      return result;
    });
  };


  onLoadData = async (treeNode) => {

    const {isAsync = true} = this.props;
    if (isAsync && treeNode && treeNode.props && treeNode.props.value) {
      this.setState({loading: true});
      const id = treeNode.props.value;
      let {data} = await this.treeService({pid: id});
      // 兼容接口
      let newData = Array.isArray(data) ? data : data.rows;
      const {treeData} = this.state;

      this.setState({
        treeData: [...connectTree(treeData, newData, id)],
        loading: false,
      });
    }

  };


  render() {

    const {treeData, loading, defValue} = this.state;


    let tempData = this.changeTreeData(treeData);
    let formatData = null;
    // 判断是否超级管理员
    if (localStorage.getItem("email") !== "admin@163.com") {
      const departmentId = localStorage.getItem("departmentId");

      for (let item of tempData) {
        if (departmentId == item.key) {
          formatData = [item];
          break;
        }
      }
    } else {
      formatData = tempData;
    }


    const {
      formItemLayout = {
        labelCol: {sm: {span: 6}},
        wrapperCol: {sm: {span: 18}},
      },
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      autoClearSearchValue = true,
      allowClear = true,
      formItemStyle,
      isParentDisabled=false,
      formItemClass,
    } = this.props;
    const {getFieldDecorator} = form;
    const notFoundContent = loading ? <Spin size="small"/> : null;


    const tProps = {
      ...this.props,
      treeData: formatData,
      // treeData,
      onChange: this.onChange,
      onSelect: this.onSelectTree,
      onSearch: this.onSearchTree,
      loadData: this.onLoadData,
      focus: this.onFocus,
      showCheckedStrategy: SHOW_ALL,
      searchPlaceholder: placeholder,
      allowClear,
      autoClearSearchValue,
      style: {
        width: '100%',
      },
      notFoundContent,
      // labelInValue:true,
      dropdownStyle: {maxHeight: 200},
    };

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          style={formItemStyle}
          className={formItemClass}
        >
          {getFieldDecorator(id, {
            rules: [{required, message}],
            initialValue: defValue ? this.dedupe(defValue) : [],
            // initialValue: [],
          })(
            <TreeSelect
              isParentDisabled={isParentDisabled}
              notFoundContent={loading ? <Spin size="small"/> : null}
              {...tProps}
              // value={this.state.defValue}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInputTreeSelectPromise;
