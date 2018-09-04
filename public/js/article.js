

layui.use(['layedit', 'layer', 'element'], function(){
  const $ = layui.$
  const layedit = layui.layedit;
  const layer = layui.layer


  const idx = layedit.build('comment-txt', {
    tool: [],
    height: 160
  }); //建立编辑器

  $(".layui-unselect.layui-layedit-tool").hide()

  

  $(".comment button").click(async () => {
    let content = layedit.getContent(idx).trim()

    if(content.length === 0)return layer.msg("评论内容不能为空")

    const data = {
      content,
      article: $(".art-title").data("artid")
    }

    $.post("/comment", data, (data) => {
      layer.msg(data.msg, {
        time: 1000,
        end(){
          if(data.status === 1){
            // 评论成功就重载页面
            window.location.reload()
          }
        }
      })
    })
  })
});