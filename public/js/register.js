layui.use('element', function(){
  const element = layui.element;
  const $ = layui.$

  //$submit = $(".layui-show button[type!=reset]")
  let $username = $(".layui-show input[name=username]")
  let $password = $(".layui-show input[name=password]")
  
  /* $username.on("input", () => {
    let username = $username.val()
    if(val.length < 6)return
  }) */

  $password.eq(1).on("blur", function(){
    
    const pwd = $password.val()
    if($(this).val() !== pwd){
      alert("两次密码不一致")
      $(this).val("")
    }
  })
});