$(function () {
    // 获取到 路径
    var url = 'http://ajax.frontend.itheima.net'
    // 拦截所有的Ajax
    $.ajaxPrefilter(function (params) {
        // 拦截路径 在路径前面添加 url
        params.url = url + params.url
    })
})