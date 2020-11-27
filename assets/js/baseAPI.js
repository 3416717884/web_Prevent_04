$(function () {
    // 获取到 路径
    var url = 'http://ajax.frontend.itheima.net'
    // 拦截所有的Ajax
    $.ajaxPrefilter(function (params) {
        // 拦截路径 在路径前面添加 url
        params.url = url + params.url
        // 给路径拥有 /my/ 的添加 headers
        if (params.url.indexOf('/my/') !== -1) {
            params.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        // 拦截所有响应 判断身份
        params.complete = function (res) {
            var obj = res.responseJSON
            if (obj.status !== 0 && obj.message == '身份认证失败！') {
                // 清空本地
                localStorage.removeItem('token')
                // 跳转
                location.href = '/login.html'
            }
        }
    })
})