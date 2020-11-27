$(function () {
    // 点击事件 去注册
    $('#link_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    // 点击事件 去登录
    $('#link_login').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })
    // 密码框规则
    var form = layui.form
    form.verify({
        Pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function (value) {
            if (value !== $('.regBox [name=password]').val()) {
                return '俩次输入的密码不一致！'
            }
        }
    })
    // 定义layUI
    var layer = layui.layer
    // 注册功能
    $('#form_reg').on('submit', function (e) {
        // 清空默认事件
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你注册成功！')
                // 跳转到登录页面
                $('#link_login').click()
                // 清空表单
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录功能
    $('#form_login').on('submit', function (e) {
        // 清除默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你登录成功！', { icon: 6 })
                // 把token存到本地 留着后台
                localStorage.setItem('token',res.token)
                // 跳转页面
                location.href = "/index.html"
            }
        })
    })
})