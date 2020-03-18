import { Random } from 'mockjs';

export default {
  '/users': {
    'users|1-5': [
      { 
        'id': ()=> Random.integer(20,100),
        'name': ()=> Random.ctitle(),
      }
    ]
  }
}