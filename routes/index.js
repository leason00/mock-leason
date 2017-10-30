var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var mock = require('./../bin/routes_config');
var util = require('../public/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// 根据参数个数获取配置
function getOption(arg) {
    console.log(arg);
    var len = arg.length;
    // 默认配置
    var option = {
        headers: {
            'Cache-Control': 'no-cache'
        },
        statusCode: 200,
        cookies: [],
        timeout: 0
    };
    if (len === 0) {
        return create_routes;
    }
    else if (len === 1) {
        var newOption = arg[0];
        if (util.isObject(newOption)) {
            util.each(newOption, function (value, key) {
                if (key === 'headers') {
                    util.each(newOption.headers, function (headervalue, headerkey) {
                        option.headers[headerkey] = newOption.headers[headerkey];
                    })
                }
                else {
                    option[key] = newOption[key];
                }
            });
        }
    }
    else {
        option.url = arg[0];
        option.result = arg[1];
    }
    return option;
}

function create_routes() {
    var option = getOption(arguments);

    if (!option.url || !option.result) {
        return;
    }
    
    //  ['get','post','delete','put'...]
    var action = option.action || 'use';

    router[action.toLowerCase()](option.url, function (req, res) {
        // 设置header
        res.set(option.headers);
        
        // 设置Content-Type
        option.type && res.type(option.type);
        
        // 设置status code
        res.status(option.statusCode);
        
        // 设置cookie
        util.each(option.cookies, function (item, index) {
            var name = item.name;
            var value = item.value;
            delete item.name;
            delete item.value;
            res.cookie(name, value, item);
        });
        
        // 返回result
        if (util.isFunction(option.result)) {
            option.result(req, res);
        }
        else if (util.isArray(option.result) || util.isObject(option.result)) {
            !option.type && res.type('json');
            res.json(option.result);
        }
        else {
            !option.type && res.type('text');
            res.send(option.result.toString());
        }
        
    });
}

//返回文件
create_routes.file = function (file) {
    return fs.readFileSync(path.resolve('../status',file));
};

//返回json
create_routes.json = function (json) {
    return fs.readFileSync(path.resolve('../status',json), 'utf8');
};

// //返回图片
create_routes.pic = function (pic) {
    return path.resolve(__dirname, '..') + '/status/pic/' + pic;
};

mock(create_routes);



module.exports = router;
