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
};


