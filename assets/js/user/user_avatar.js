$(function () {
    // 获取layer
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 给上传按钮设置点击事件
    $('#btnfile').click(function () {
        // 触发上传图片的点击
        $('#file').click()
    })
    // 给上传文件筐 绑定 change 事件
    $('#file').change(function (e) {
        // 选择用户要裁剪的图片
        var file = e.target.files[0]
        if (file === undefined) {
            return layer.msg('请上传文件！')
        }
        // 根据图片地址创建一个对应的url地址
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 上传头像
    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // 上传Ajax
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你更新头像成功!')
                // 重新渲染
                window.parent.getUserInof()
            }
        })
    })
})