$(function () {
    // 获取layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    // 获取数据
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                var htmlStr = template('tpl-art-cate', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 关闭层
    var indexAll = null
    // 添加类别
    $('#btn-add').on('click', function () {
        indexAll = layer.open({
            type: '1',
            title: '添加文章分类',
            content: $('#tpl-search').html(),
            area: ['500px', '260px']
        });
    })
    // 添加类别 ajax
    $('body').on('submit', '#form-add', function (e) {
        // 清楚默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你成功添加文章！')
                // 获取数据
                initArtCateList()
                // 关闭层
                layer.close(indexAll)
            }
        })
    })
    // 关闭层
    var indexEdit = null
    // 点击编辑
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: '1',
            title: '修改文章分类',
            content: $('#tpl-edit').html(),
            area: ['500px', '260px']
        });
        // 获取点击表单里面的内容
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                // 通过form 铺设上去
                form.val('form-edit', res.data)
            }
        })
    })
    // 修改
    $('body').on('submit', '#form-edit', function (e) {
        // 清楚默认
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                layer.msg('恭喜你修改文章成功！')
                // 获取数据
                initArtCateList()
                // 关闭层
                layer.close(indexEdit)
            }
        })
    })
    // 删除
    $('tbody').on('click', '.btn-detele', function () {
        // 获取 id
        var id = $(this).siblings('.btn-edit').attr('data-id')
        // console.log(id);
        layer.confirm('确认删除分类?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你删除分类列表成功！')
                    // 获取数据
                    initArtCateList()
                    layer.close(index);
                }
            })

        });

    })
})  