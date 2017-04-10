import React, { Component, PropTypes, cloneElement } from 'react';
import GlobalModal from '../../components/GlobalModal';
import { is, fromJS } from 'immutable';
import './assets/style.less';
import { Button } from 'antd';

export default class TemplatePage extends Component {
  state = {
    __data__: fromJS({}),
    collapsed: false,
  };
  static propTypes = {
    routing: PropTypes.object,
    actions: PropTypes.object
  };
  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {}, thisState = this.state || {};
    if (!is(thisProps.state, nextProps.state)) {
      return true;
    }
    if (!is(thisState.__data__, nextState.__data__)) {
      return true;
    }
    return false;
  }
  render() {
  	const { actions, state } = this.props;
  	const { testTemplate, testFetchTemplate } = actions.TemplatePage;
  	const { globalModal, text, async } = state.get('__template__').toJS();
    return (
	    <div className="TemplatePage">
		    <div className="search-result-list global-item-box">
			    <div className="">
				    这个是个模板页，如你要开发新页面先复制此文件夹，再重命名进行开发
				    <div>
					    <Button type="primary" onClick={() => testTemplate('哈哈哈。。。 看出什么了吗？')}
					    >同步redux actions</Button>
					    {text}
				    </div>
				    <div>
					    <Button type="primary" onClick={() => testFetchTemplate()}
					    >异步redux actions</Button>
					    {async}
				    </div>
			    </div>
		    </div>
		    <GlobalModal
			    info={globalModal}
		    />
	    </div>
    );
  }
}
