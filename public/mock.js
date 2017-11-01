/**
 *
 * Created by leason on 2017/10/31.
 */
var Mock = require('mockjs');

function analysis(item) {
    
    for(var a in item){
        
        if(typeof item[a] == 'object'){
            
            if(item[a] instanceof Array){
                analysis(item[a][0]);
            }else{
                analysis(item[a]);
            }
            
        }else{
            if(item[a].toString().indexOf('RegExp_') >= 0){
                item[a] = new RegExp(item[a].split('RegExp_')[1])
            }
        }
        
    }
}

// 深度copy
function extendDeep(parent, child) {
    
    var i,
        proxy;
    
    proxy = JSON.stringify(parent); //把parent对象转换成字符串
    proxy = JSON.parse(proxy); //把字符串转换成对象，这是parent的一个副本
    
    child = child || {};
    
    
    for(i in proxy) {
        if(proxy.hasOwnProperty(i)) {
            child[i] = proxy[i];
        }
    }
    
    proxy = null; //因为proxy是中间对象，可以将它回收掉
    
    return child;
}

module.exports = function (mock_url,page,limit) {

    var items = extendDeep(require(mock_url));

    var result;
    analysis(items.data);

    if(items.total ==0){
        result = Mock.mock(items.data)
    }else{
        result = [];
        for (var i=0; i<items.total;i++){
            result.push(Mock.mock(items.data));
        }
        
    }
    items.data = result;
    if(page != 0){
        items.data = result.slice((page-1)*limit,page*limit);
    }

    return items;
};
