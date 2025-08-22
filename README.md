serve -s dist -l 3000

- [ ] echarts 取消所有动画，避免出现尺寸修改更新缓慢
- [ ] login 中 email 必须要 username 才行，因为后端 oauth2 验证，看看可不可以改正
- [ ] 前后端请求管理，以登陆页面为例子，toast string 应该是什么
- [x] 左上角管理员图标制作
- [x] 403 和 404 页面制作
- [x] 刷新角色不是当前角色，变成了第一个角色
- [ ] 在请求中添加 AbortSignal 在组件消失或者其他东西发生变化时取消请求
- [ ] 在 npm run build 后的页面中点击登陆会直接发送login me sidebar 请求而无论 login 是否返回


```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        # 设置静态文件服务的根目录
        root   D:\01frontend\vite-project\dist;  # 修改为你 React 项目的 dist 文件夹路径
        index  index.html;

        # 默认路由 - 将 React 应用的所有请求转发到 index.html（适用于前端路由）
        location / {
            try_files $uri /index.html;  # 处理前端路由
        }

        # 代理 API 请求 - 将所有 API 请求代理到后端
        location /api/ {
            rewrite ^/api/(.*)$ /$1 break;
            proxy_pass http://127.0.0.1:8000;  # 后端 API 地址（不带 /api 前缀）
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # 错误页面配置
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```