import React from 'react';
import { Tree } from 'antd';
import { requestJson } from 'utils/request';

const { TreeNode } = Tree;

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

class ConTreeNode extends React.Component {
  state = {
    selectedKeys: ['0-0-0-0'],
    treeData: treeData,
  };

  async componentDidMount() {

    const { onRef, treeId, onSelect } = this.props;
    this.setState({ loading: true });
    let { data = [] } = await this.treeService();
    let temp = { loading: false };

    // let treeData = Array.isArray(data) ? data : data.rows;

    temp.treeData = treeData;
    if (treeData.length > 0) {
      // temp.selectedKeys = [treeData[0][treeId]];
      // todo 获取第一个叶子节点
      temp.selectedKeys = ["0-0-0-0"];
    }
    if (onSelect) { // 选中事件
      this.props.onSelect([treeData[0]]);
    }
    if (onRef) { // 是否父调用子
      this.props.onRef(this);
    }
    this.setState(temp);
  }


  // 获取第一个子节点
  getFirstChildNode = (data) => {



  };


  // 获取
  treeService = async () => {
    const { url, payload } = this.props;
    this.isLoading(true);
    const result = await requestJson(url, {
      method: 'POST',
      payload,
    });
    this.isLoading(false);
    return result;
  };

  // 返回loading 效果
  isLoading = (loading) => {
    const { onLoading } = this.props;
    if (onLoading) {
      onLoading(loading);
    }
  };


  // 父节点展开
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  // 多选框选中
  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  // 节点选中
  onSelect = (selectedKeys, param) => {
    if (selectedKeys.length > 0) { // 第二次点击不让取消
      this.setState({ selectedKeys });
      const { onSelect } = this.props;
      if (onSelect) {
        const { selectedNodes } = param;
        let selectResult = selectedNodes.map((item) => {
          return item.props ? item.props.dataRef : {};
        });
        this.props.onSelect(selectResult);
      }
    }
  };

  // 树节点渲染
  renderTreeNodes = (data) => {
    const {
      treeTitle = 'title',
      treeId = 'id',
      isParentDisabled = false, // 禁止选中父节点
    } = this.props;
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item[treeTitle]} key={item[treeId]} dataRef={item} disabled={isParentDisabled}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item[treeTitle]} dataRef={item} key={item[treeId]} {...item} />;
    });
  };

  render() {

    const {selectedKeys, treeData } = this.state;

    return (
      <Tree
        {...this.props}
        onSelect={this.onSelect}
        selectedKeys={selectedKeys}
        defaultExpandAll={true}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}

export default ConTreeNode;
