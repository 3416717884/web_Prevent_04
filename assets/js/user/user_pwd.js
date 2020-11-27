$(function () {
    // 过去 layer
    var layer = layui.layer
    // 获取 form
    var form = layui.form
    form.verify({
        Pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码不能和新密码一致！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '您输入的俩次新密码不一致！'
            }
        }
    })
    // 提交密码
    $('.layui-form').submit(function (e) {
        // 清除默认提交
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你修改密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})