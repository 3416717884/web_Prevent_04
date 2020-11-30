$(function () {
    // 补零
    function dri(n) {
        return n < 10 ? '0' + n : n
    }
    // 过滤器
    template.defaults.imports.dateFormat = function (time) {
        var dr = new Date(time)

        var n = dr.getFullYear()
        var y = dri(dr.getMonth() + 1)
        var r = dri(dr.getDate())
        var nn = dri(dr.getHours())
        var yy = dri(dr.getMinutes())
        var rr = dri(dr.getSeconds())
        return `${n} - ${y} - ${r} ${nn}:${yy}:${rr}`
    }
    // 获取layer
    var layer = layui.layer
    // 获取form
    var form = layui.form
    // 定义参数
    var q = {
        pagenum: '1',
        pagesize: '2',
        cate_id: '',
        state: ''
    }
    // 获取 数据
    initTable()
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(layer.message)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                // 分页
                renderPage(res.total)
            }
        })
    }
    //  列表分类
    initCate()
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 重新渲染一下 layUI
                form.render()
            }
        })
    }
    // 筛选功能
    $('#form-search').submit(function (e) {
        // 清楚默认
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        // 获取 数据
        initTable()
    })
    // 分页
    function renderPage(total) {
        // 定义分页
        var laypage = layui.laypage
        laypage.render({
            elem: 'titleBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                // 获取 数据
                if (!first) {
                    initTable()
                }

            }
        })
    }
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        // 获取 id
        var id = $(this).attr('data-id')
        // console.log(id);
        // 询问框
        layer.confirm('确认删除文章?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你删除成功！')
                    var len = $('.btn-delete').length
                    if (len == 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    // 获取 数据
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})  