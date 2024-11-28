// ==UserScript==
// @name         CHDBits AutoDownload
// @namespace    http://tampermonkey.net/
// @version      2024-10-15
// @description  彩虹岛资源快速下载
// @author       wangyunshu
// @match        *://ptchdbits.co/torrents.php*
// @icon         https://ptchdbits.co/favicon.ico?v=2022
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(async function() {
    'use strict';

    // Start
    console.log('TJUPT AutoDownload Start >>>>>');
    let data = {
        "development": {
            "serviceUrl": "http://ds920plus.internal.mrtree.vip:58080",
            "username": "wangyunshu",
            "password": "514232098zx."
        },
        "production": {
            "serviceUrl": "https://ds1821plus.internal.mrtree.vip:50444",
            "username": "wangyunshu",
            "password": "514232098zx."
        }
    }
    let env = 'development';
    // 1. 获取请求token
    let token = await getToken();
    // 2. 在指定位置添加按钮
    let itemTable = document.querySelectorAll('.torrentname');
    for (let i = 0; i < itemTable.length; i++) {
        let parent = itemTable[i].querySelector('td');
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
        btn.setAttribute('style', 'position: absolute; top: 0; right: 0; bottom: 0; height: 1.5rem; margin: auto;');
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
            url: `${data[env].serviceUrl}/authman/user/login`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": data[env].username,
                "password": data[env].password,
                "email": ''
            })
        });
        return JSON.parse(resp.responseText).result;
    }

    // 添加下载任务
    function addTask(id) {
        GM_xmlhttpRequest({
            url: `${data[env].serviceUrl}/core/download/pt/${id}`,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": token
            },
            data: JSON.stringify({
                "pt": "CHDBits",
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