# 功能整合控制台
CalaxyConsole是一个实用工具合集, 包括一些如随机密码生成等小工具, 也可以对接Archimedes系统对系统进行权限管理, 参数配置等; 在集成Archimedes前, 可以使用离线工具, 在集成Archimedes后可以使用完整的图片OCR和其他的功能
## 部署方式
### 本地启动
```shell
npm run serve
```
### 构建
```shell
# 测试环境
npm run build.dev

# 生产环境
npm run build.prod
```
> 注意: 构建前需根据需要修改.env.{{env}}中对应的配置文件
## 功能简介
### 核心功能
* 图片OCR
* PT资源批量下载
* 图片外链生成
### 系统管理
* 系统参数配置
* 用户权限设置
### 实用工具
* JsonViewer
* 随机密码生成
## 技术栈
### 前端
* Vue
* JavaScript
### 后端
* Java
* MariaDB
* Redis
* Solr
* Nginx
## 更新日志
* v2.3.3
    * 定时任务和系统内部操作添加trace_id
    * 前端所有请求添加时间戳, 后端接收前端时间戳
    * 兼容通过parameter传参方式鉴权的情况
* v2.3.2
    * 日志包含trace_id属性
    * 去除显式的trace_id打印
    * 下线数据库日志
* v2.3.1
    * 定时任务优化, 添加active字段, 并添加失败自动暂停
    * 集成ELK日志采集
    * 新增webhook采集
* v2.2.3.1
    * fix bug
* v2.2.3
    * 同时支持DS1821+和DS920+
    * DownloadStation接口切换至DownloadStation2
* v2.2.2
    * 优化图片OCR监测, 系统用户通过邮箱与nas用户关联, 自动监测图片变更
    * 优化参数批量查询接口, 固定参数返回顺序
    * 图片OCR前端页面优化, 添加按参数名搜索
* v2.2.1
    * 文件扫描root_path修改为系统参数
    * 解决服务互耦导致部分功能失效的问题
    * 修改头像查询接口
    * 优化token校验逻辑
* v2.2.0
    * token逻辑改版
    * Prophet改版, 优化体验
* v2.1
    * JDK版本升级至17
    * Springboot版本升级至3.1.0
* v2.0
    * Archimedes正式发布