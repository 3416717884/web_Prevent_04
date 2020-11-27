$(function () {
    // 获取用户信息
    getUserInof()
    // 退出
    $('#logout').on('click', function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地存储
            localStorage.removeItem('token')
            // 跳转 登录页
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
// 定义 layUI
var layer = layui.layer
// 全局函数
function getUserInof() {
    // 获取用户信息
    $.ajax({
        url: '/my/userinfo',
        // headers : {
        //     // 重新登录  token过期时间12小时
        //     Authorization : localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 请求成功 渲染头像
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 判断 用户昵称
    var name = user.nickname || user.username
    $("#welcome").html('欢迎&nbsp&nbsp' + name)
    // 判断用户是否有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
        $('.layui-nav-img').hide()
    }
}