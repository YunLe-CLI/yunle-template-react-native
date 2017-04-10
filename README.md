# yunle-template-react

如使用该前端脚手架，可以先安装

1. `npm install -g yunle-cli`

2. `yunle init <project-name>`

3. 选择RN
```
    $ > RN
        webpack
        react
        node
```

5. `cd <project-name> && yarn `

6. 开发`react-native run-ios || react-native run-android`

7. 开发增添页面时，`npm run createPage TestAuAPage`
```
continers/TestAuAPage // 新添加重命名文件夹
```

8. 在`containers／config.js`添加
```
{
    root: 'TestPage',
    page: require('./TestPage').default,
    actions: require('./TestPage/actions'),
    constants: require('./TestPage/constants').default,
    sagas: require('./TestPage/sagas').default,
    route: require('./TestPage/route').default,
    reducer: require('./TestPage/reducer').default,
}
```