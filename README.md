# mock-leason
简单node服务器，在前后端分离开发中，模拟 HTTP 接口数据和静态资源服务器

，方便前端调试开发。

### 工具说明

-----

前后端开发协作的过程中，为了不依赖于后端环境，我们常常会和后端童鞋定好接口，然后采用前后端分离的开发模式。为了提高前后端开发效率，前端需要自行模拟数据，因此此工具基于node.js和 express.js 实现，仅需要对配置文件进行修改。

### 开始 

-----

* 环境要求

 nodejs 和 npm



* 获取工具

> git clone https://github.com/leason00/mock-leason.git



* 依赖安装

​         项目目录下npm install



* 启动服务  

> npm start 或者bin目录下run  www文件



### 配置文件

----
配置文件可以是config目录下所有.js文件，但是文件必须按照给出的example.js为模板。形如：

```
module.exports = function (mock) {
    return [{
        url: '/admin',
        action: 'GET',
        result:{name: 'json test'}
    }];
};
```

显然，每个文件中可以配置多个规则，分文件好处是可以以文件去区分项目模块，方便管理。

* 最简单的接口

  ```
  // 简单get请求示例
  {
    url: '/simple',
    action: 'GET',
    result: {name: 'json test'}
  }
  ```

* 自定义返回内容

  自定义返回内容不仅，可以对返回内容进行完全定制，还可以对请求的数据进行判断验证。如：

  ```
  // 登录模拟示例
      {
          url: '/login',
          action: 'POST',
          result: function (req, res) {
              //POST方法req.body获取请求信息
              if (req.body.name === 'admin' && req.body.password === 'admin') {
                  res.send({"msg": "登录成功！","code": 0,"authorization":"fdjflsjflfds4f5df5s4f5d4f5s"});
              }else {
                  res.send({"msg": "账号或者密码错误！", "code": 1});
              }
          }
      }
  ```


* 直接返回json文件

  对于有些返回数据量非常大的，将返回数据直接写在config里面会非常难看，这时就可以使用返回json文件的方法，如：

  ```
  //返回json文件中的内容示例
  {
    url: '/json',
    action: 'GET',
    result:mock.json('./json/test.json')
  }
  ```


* 设置headers，cookies等等

  如果某些请求需要设置headers，cookies可以配置如下：

  ```
  // 设置headers，cookies等等
      {
          url: "/list",
          action: 'GET',
          result: function (req, res) {
              // 获取请求头内容
              console.log(req.get('Content-Type'));
              console.log(req.get('authorization'));
              if(req.get('authorization') != "authorization"){
                  res.send({"msg": "会话超时，请重新登录","code": 1});
              }else{
                  //POST方法req.body获取请求信息
                  console.log(req.param('name'));
                  res.send(mock.json('./json/test.json'));
              }
          },
      
          //设置Content-Type为json or text
          type: 'text',
      
          // 设置请求头
          headers: {
              authorization: "sjhfdihfishfhs454154154fsf"
          },
      
          //设置cookies
          cookies: [
              {name: 'ssid', value: 'shfdishixls', maxAge: 900000, httpOnly: true}
          ]
      }
  ```

### 固定接口

----

* 返回静态图片

  在/status/pic目录下，放入需要的图片访问：

  ```
  http://127.0.0.1:3000/status/pic/1.png
  ```


* 上传文件

  当你要测试你的上传文件组件有么有没问题，这是你就不需要去找后端要接口直接api：

  ```
  http://127.0.0.1:3000/upload
  ```

  ​上传成功返回：

  ```
  {
      "msg": "上传成功！",
      "code": 0,
      "data": {
          "file_url": "/status/upload/Gsw_hjowIWiyO8BaTmAmnRE3.png"
      }
  }
  ```


* 访问上传的图片

  ```
  http://127.0.0.1:3000/status/upload/Gsw_hjowIWiyO8BaTmAmnRE3.png
  ```