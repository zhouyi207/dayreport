serve -s dist -l 3000

- [ ] echarts 取消所有动画，避免出现尺寸修改更新缓慢
- [ ] login 中 email 必须要 username 才行，因为后端 oauth2 验证，看看可不可以改正
- [ ] 前后端请求管理，以登陆页面为例子，toast string 应该是什么
- [x] 左上角管理员图标制作
- [x] 403 和 404 页面制作
- [x] 刷新角色不是当前角色，变成了第一个角色
- [ ] 在请求中添加 AbortSignal 在组件消失或者其他东西发生变化时取消请求
- [ ] 在 npm run build 后的页面中点击登陆会直接发送login me sidebar 请求而无论 login 是否返回