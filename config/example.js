/**
 *
 * Created by leason on 2017/10/30.
 */
module.exports = function (mock) {
    return [
  
    // 简单get请求示例
    {
        url: '/simple',
        action: 'GET',
        result: {name: 'json test'}
    },
        
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
    },
        
    //返回json文件中的内容示例
    {
        url: '/json',
        action: 'GET',
        result:mock.json('./json/test.json')
    },
        
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
    }]
};