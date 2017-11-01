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
module.exports = function (mock_url) {
    var items = require(mock_url);
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
    return items;
};
