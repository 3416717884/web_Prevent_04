$(function () {
    // 获取 form
    var form = layui.form
    // 获取 layer
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称长度为 1 ~ 6 之间'
            }
        }
    })
    // 用户渲染
    initUserInfo()
    // 获取
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止默认重置
        e.preventDefault()
        initUserInfo()
    })
    // 表单提交
    $('.layui-form').submit(function (e) {
        // 阻止默认提交
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你成功修改用户信息！')
                // 渲染到页面
                window.parent.getUserInof()
            }
        })
    })
})