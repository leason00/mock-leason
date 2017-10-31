var fs = require('fs');

module.exports = function(mock) {

    var files = fs.readdirSync('../config');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    
    for (var f of js_files) {
        var result = require('../config/' + f)(mock);
        for (var i of result) {
            mock(i);
        }
    }
    
    //返回静态图片
    mock({
        url: '/status/pic/:filename',
        action: 'GET',
        result: function (req, res) {
            res.sendfile(mock.pic(req.params.filename));
        }
    });
    
    // 返回上传的图片
    mock({
        url: '/status/upload/:filename',
        action: 'GET',
        result: function (req, res) {
            res.sendfile(mock.pic_upload(req.params.filename));
        }
    });
    
    // 文件上传
    mock({
        url: '/upload',
        result: function (req, res) {
            if(req.method == "GET"){
                res.send("<form method=\"post\" enctype=\"multipart/form-data\" action=\"/upload\"><input type=\"file\" name=\"file\"><input type=\"submit\"></form>");
            }else{
                res.send({
                    "msg": "上传成功！",
                    "code": 0,
                    "data": { "file_url": "/status/upload/" + req.files.file.path.split("\\")[3]}
                });
            }
        }
    });
};


