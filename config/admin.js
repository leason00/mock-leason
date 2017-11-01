/**
 *
 * Created by leason on 2017/10/30.
 */
module.exports = function (mock) {
    return [{
        url: '/admin',
        action: 'GET',
        result:{name: 'json test'}
    },{
        url: '/admin1',
        action: 'GET',
        result:mock.mock('mock/test.json')
    }];
};