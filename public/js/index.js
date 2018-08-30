layui.use(["element", "laypage"], () => {
  let element = layui.element
  let laypage = layui.laypage
  const $ = layui.$
  
  element.tabDelete('demo', 'xxx')
 


  laypage.render({
    elem: "laypage",
    count: $("#laypage").data("maxnum"),
    limit: 5,
    groups: 3,
    curr: location.pathname.replace("/page/", ""),
    jump(obj, f){
      $("#laypage a").each((i, v) => {
        let pageValue = `/page/${$(v).data("page")}`
        v.href = pageValue
      })
    }
  })
})
