
import { Random } from 'mockjs';
 
export default {
  '/users/login': {
    "code":0,
    "success":true,
    "data":{
        "token":"5g80zuYogotoBqcAw7PofpTRFkZLbrMjcVXxuotReEmlGf4Ep18pK2Pp1eZmjUvJfgctX0q2ZqUNWUgmQVGbwwrSC+gZYP8OpxMnEUeoGuN4KNldtunS88RTYa8U6z3qap05QpVI3UEt6lUSCUeCn/ng1BE0RCp19yqmRJpThaecgWF/jmzVWTe/hWzgQ5FKpktSKSDdmMhHIJ9iFBFWCA==",
        "expires":86400,
        "username":"15928624606371",
        "createTime":1576923995525,
        "enterpriseId":"1207948447336890368",
        "userId":"1208271430127452160",
        "roles":[
            "ROLE_ENT"
        ],
        "authorities":{
            "canAccessKnowLedge":false,
            "canAccessPortal":true
        },
        "code":200,
        "msg":"success",
        "dutyLevel":"7",
        "openStatus":2,
        "weakPwd":false
    }
  },
  '/today_courses': {
    "code":0,
    "success":true,
    'data|1-10': [
      {
        "playbackURL": 'https://player.alicdn.com/video/aliyunmedia.mp4',
        "cover": () => Random.image('115x132', '#FD673D'),
        "studentIds":[
          "5df9ec49dbcad0dae13e310f",
          "5909882774aab30001fc56f0"
        ],
        "status":2,// (-1-取消 1-进行 2-未开始 3-结束)
        "startTime":1576727363456,
        "endTime":1576727469456,
        "title": ()=>Random.ctitle(),
        "teacherId":"5df9e050d60c61448d7b3d4e",
        "coursewares":[],
        "__v":0,
        "teacher":{
            "_id":"5df9e050d60c61448d7b3d4e",
            "userName":"1234567",
            "loginName":"1234567",
            "mobile":"15928624606",
            "gender":1,
            "level":"小学",
            "role":1,
            "teachAge":12,
            "subject":"数学",
            "intro":"介绍什么",
            "__v":0
        },
        "students":[
          {
            "_id":"5909882774aab30001fc56f0",
            "userName":"1234567",
            "loginName":"1234567",
            "password":"1234567",
            "mobile":"15928624606",
            "gender":1,
            "level":"小学",
            "role":1,
            "teachAge":12,
            "subject":"数学",
            "intro":"介绍什么",
            "__v":0
          },
          {
            "_id":"5df9ec49dbcad0dae13e310f",
            "id":"5909882774aab30001fc56f0",
            "userName":"1234567",
            "loginName":"1234567",
            "password":"1234567",
            "mobile":"15928624606",
            "gender":1,
            "level":"小学",
            "role":1,
            "teachAge":12,
            "subject":"数学",
            "intro":"介绍什么",
            "__v":0
          }
        ],
        "signin":false, // 是否签到
        'id|+1': 1
      }
    ]
  },
  '/courses/mine': {
    "code":0,
    "success":true,
    "data":{
        "siginInfo":{
            "courseCount":1,
            "finishedCount":0,
            "signinRate":0
        },
        "docs|1-10":[
            {
              "playbackURL": 'https://player.alicdn.com/video/aliyunmedia.mp4',
              "cover": () => Random.image('115x132', '#FD673D'),
                "studentIds":[
                    "5dfdba1412d8df0039796333"
                ],
                "status": () => Random.integer(-1,3),
                "startTime":1576926528765,
                "endTime":1576936528765,
                "title": ()=>Random.ctitle(),
                "teacherId":"5dfdba1912d8df0039796334",
                "metaData":{
                    "Id":"JAScBrSSS3S5zC4MtLQ1Dg==",
                    "Topic":"six",
                    "MeetingNo":217472924,
                    "StartTime":"2019-12-21 19:08:48",
                    "UTCStartTime":"2019-12-21 11:08:48",
                    "OpenHostVideo":false,
                    "Duration":166,
                    "Status":0,
                    "MeetingType":0
                },
                "coursewares|1-10":[
                  {
                    "title": () => Random.ctitle(),
                  }
                ],
                "__v":0,
                "teacher":{
                    "_id":"5dfdba1912d8df0039796334",
                    "userName":"student002",
                    "loginName":"student002",
                    "password":"123456",
                    "mobile":"15928624607",
                    "gender":1,
                    "level":"小学",
                    "role":2,
                    "teachAge":12,
                    "subject":"数学",
                    "intro":"介绍什么",
                    "virtualMobile":"15928624607371",
                    "userId":"1208271453447782400",
                    "__v":0
                },
                "students":[
                    {
                        "_id":"5dfdba1412d8df0039796333",
                        "userName":"student001",
                        "loginName":"student001",
                        "password":"123456",
                        "mobile":"15928624606",
                        "gender":1,
                        "level":"小学",
                        "role":2,
                        "teachAge":12,
                        "subject":"数学",
                        "intro":"介绍什么",
                        "virtualMobile":"15928624606371",
                        "userId":"1208271430127452160",
                        "__v":0
                    }
                ],
                "signin|1": false,
                'id|+1': 1
            }
        ]
    }
  },
  '/signins': {
    "code":0,
    "success":true,
    "data":{
        "courseId":"5df890251b61fe30e997fccf",
        "userId":"5df890251b61fe30e997fccf",
        "signinTime":1576658546193,
        "id":"5df9e672b257210039afe2c5"
    }
  }
}