// ==UserScript==
// @name         PT AutoDownload
// @namespace    https://core.mrtree.vip:50443
// @version      v0.2
// @description  自动下载pt站资源
// @author       wangyunshu
// @match        *://tjupt.org/torrents.php*
// @icon         https://tjupt.org/assets/favicon/favicon.png
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async function() {
    'use strict';

    // Start
    console.log('TJUPT AutoDownload Start >>>>>');
    let data = {
        "serviceUrl": "https://core.mrtree.vip:50443",
        "username": "{{username}}",
        "password": "{{password}}"
    }
    // 1. 获取请求token
    let token = await getToken();
    // 2. 在指定位置添加按钮
    let itemTable = document.querySelectorAll('.torrentname');
    for (let i = 0; i < itemTable.length; i++) {
        let parent = itemTable[i].querySelector('tr');
        // 2.1 查询所有的a标签
        let allLinks = parent.querySelectorAll('a');
        // 2.2 提取id
        let idRegex = /[?&]id=([^&]*)/;
        let id = '';
        allLinks.forEach(link => {
            let href = link.href;
            let match = href.match(idRegex);
            // 如果匹配到 id，则输出第一个 id 值
            if (match && match[1]) {
                id = match[1]
            }
        });
        if (id === undefined || id === '') {
            continue;
        }
        // 2.3 生成按钮
        parent.setAttribute('style', 'position: relative;')
        let btn = document.createElement('button');
        btn.innerText = '快速下载';
        btn.setAttribute('class', 'medium');
        btn.setAttribute('style', 'position: absolute; top: 0; right: 3rem; bottom: 0; height: 2rem; margin: auto; border-radius: 10px; background: #fbe7df;');
        btn.setAttribute('task-id', id);
        btn.onmouseover = function() {
            this.style.cursor = 'pointer';
        }
        // 2.4 绑定点击事件
        btn.onclick = function() {
            addTask(id);
        }
        parent.appendChild(btn);
    }

    // 获取token
    async function getToken() {
        let resp = await httpRequestPromise({
            url: `${data.serviceUrl}/authman/user/login`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": data.username,
                "password": data.password,
                "email": ''
            })
        });
        return JSON.parse(resp.responseText).result;
    }

    // 添加下载任务
    function addTask(id) {
        GM_xmlhttpRequest({
            url: `${data.serviceUrl}/core/download/pt/${id}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": token
            },
            data: JSON.stringify({
                "pt": "TJU",
                "synology": "DS1821plus"
            }),
            onload(downloadResp) {
                if (JSON.parse(downloadResp.response).status === 'SUCCESS') {
                    alert(`添加下载任务成功: ${id}`);
                } else {
                    console.log(JSON.parse(downloadResp.response));
                    alert('添加下载任务失败, 请检查后重试');
                }
            }
        });
    }

    // 封装异步调用
    function httpRequestPromise(details) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                ...details,
                onload: (response) => {
                    resolve(response);
                },
                onerror: (error) => {
                    reject(error);
                }
            });
        })
    }
})();