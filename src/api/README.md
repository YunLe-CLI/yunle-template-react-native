# api

## 接口方法例表

1. `chekLogin`检查登录
  ```
  import API from './index';
  API.chekLogin()
     .then((data) => console.log(data))
     .chtch((err) => console.error(err))
  ```
  
2. `login`登录
  ```
  import API from './index';
  const query = {
    name: 'test',
    password: '123456',
  };
  API.login(query)
     .then((data) => console.log(data))
     .chtch((err) => console.error(err))
  ```
  
3. `listHome`策略列表
  ```
  import API from './index';
  const query = {
    data: {"sort":{"type":1}},
    type:'Guid',
    tag: 'list',
    name: '',
  };
  API.listHome(query)
     .then((data) => console.log(data))
     .chtch((err) => console.error(err))
  ```
