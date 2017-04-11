var path = require('path');
var fs = require('fs');
var exists = fs.existsSync;
var program = require('commander');
var fse = require('fs-extra');
var inquirer = require('inquirer');

var argv = process.argv.slice(2);
var pageName = argv[0];
var inPlace = !pageName || pageName === '.'
var name = pageName ? path.relative('../', process.cwd()) : pageName;
var template = path.join('./libs/createPage/__template__');
var pageConfig = path.join('./src/containers', 'config.js');
var toPath = path.join('./src/containers', pageName);

if (exists(toPath)) {
	inquirer.prompt([{
		type: 'confirm',
		message: inPlace
			? '在当前目录中生成项目？'
			: '目标目录存在。继续吗？',
		name: 'ok'
	}])
		.then(function (answers) {
			if (answers.ok) {
				throw new Error('不能在在当前目录中或者目标目录存在下创建页面！');
			}
		})
} else {
	var config = {};
	inquirer.prompt([{
		type: 'input',
		message: '请输入页面路由：',
		name: 'route'
	}])
		.then(function(e) {
			if (!e.route) throw new Error('路由不能为空！');
			config.route = e.route;
			return e.route;
		})
		.then(function(route) {
			return inquirer.prompt([{
				type: 'input',
				message: '请输入页面面包屑名：',
				name: 'breadcrumbName'
			}])
		})
		.then(function(e) {
			if (!e.breadcrumbName) throw new Error('请输入页面面包屑名不能为空！')
			config.breadcrumbName = e.breadcrumbName;
			return e.breadcrumbName;
		})
		.then(function() {
			if (config.route && config.breadcrumbName) {
				main(config)
			}
		});
}

function main(config) {
	try {
		fse.copySync(template, toPath);
		eIndex(toPath, pageName);
		eConstants(toPath, pageName);
		eRoute(toPath, pageName, config)
		console.log('创建页面成功：' + toPath);
	} catch (err) {
		console.error(err);
		console.error('创建页面失败：' + toPath)
	}
}

function mkdir(path, fn) {
	mkdirp(path, 0755, function(err){
		if (err) throw err;
		console.log('   \033[36mcreate\033[0m : ' + path);
		fn && fn();
	});
}

function eIndex(toPath, name) {
	var toPath = path.join('./', toPath, 'index.js');
	var tmp = function(name) {
		return `import React, { Component, PropTypes }  from 'react'
import { is, fromJS } from 'immutable';
import { NativeRouter, Route, Link } from 'react-router-native'
import styles from './assets/style';

import {
	StyleSheet,
	Text,
	View,
	AppRegistry,
} from 'react-native'

export default class ${name} extends Component {
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
		const { testTemplate, testFetchTemplate } = actions.${name};
		const { globalModal, text, async } = state.get('${name}').toJS();
		return (
			<View>
				<View>
					<Link to="/" underlayColor='#f0f4f7'>
						<Text>__template__</Text>
					</Link>
				</View>
			</View>
		);
	}
}
`;
	};
	var data = tmp(name);
	fs.open(toPath, 'w+', function(err, fd) {
		if(err!==null){
			console.error(err);
			return;
		}
		fs.write(fd, data, 0, function(err, bytes) {
			if(err!==null){
				console.error(err);
				return;
			}
		});
	})
}

function eConstants(toPath, name) {
	var toPath = path.join('./', toPath, 'constants.js');
	var tmp = function(name) {
		return `import yunleKey from 'yunle-key';
const pageName = '${name}';

export default yunleKey({
	TEST_TEMPLSTE: null,
	TEST_REQUESTED_TEMPLSTE: null,
	TEST_SUCCEEDED_TEMPLSTE: null,
	TEST_FAILED_TEMPLSTE: null,
}, pageName);
`;
	}
	var data = tmp(name);
	fs.open(toPath, 'w+', function(err, fd) {
		if(err!==null){
			console.error(err);
			return;
		}
		fs.write(fd, data, 0, function(err, bytes) {
			if(err!==null){
				console.error(err);
				return;
			}
		});
	})
}

function eRoute(toPath, name, config) {
	var toPath = path.join('./', toPath, 'route.js');
	var tmp = function(name) {
		return `export default [
		{
			path: '${config.route}',
			name: '${name}',
			breadcrumbName: '${config.breadcrumbName}',
			_indexRoute: false,
			component: require('./index').default,
			childRoutes: [],
		},
];`;
	}
	var data = tmp(name);
	fs.open(toPath, 'w+', function(err, fd) {
		if(err!==null){
			console.error(err);
			return;
		}
		fs.write(fd, data, 0, function(err, bytes) {
			if(err!==null){
				console.error(err);
				return;
			}
		});
	})
}
