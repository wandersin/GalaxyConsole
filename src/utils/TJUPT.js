// ==UserScript==
// @name         PT AutoDownload
// @namespace    https://mrtree.vip:51443
// @version      0.1
// @description  自动下载pt站资源
// @author       wangyunshu
// @match        *://tjupt.org/torrents.php*
// @icon         https://tjupt.org/assets/favicon/favicon.png
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    function getUserInfo(env) {
        console.log(`Current env: ${env}`);
    }

    getUserInfo('development');

    // Start
    console.log('TJUPT AutoDownload Start >>>>>');

    let serviceUrl = 'https://ds1821plus.internal.mrtree.vip:50444';
    let username = 'wangyunshu';
    let password = '514232098zx.';

    // 测试环境
    // let serviceUrl = 'http://ds920plus.internal.mrtree.vip:58080';
    // let username = 'wangyunshu';
    // let password = '514232098zx.';

    // 查找所有保存按钮
    let download = document.querySelectorAll('.download');
    for(let i = 0; i < download.length; i++) {
        // 获取种子id
        let id = '';
        // 1. 查询所有的a标签
        let allLinks = download[i].parentElement.parentElement.parentElement.querySelectorAll('a');
        let idRegex = /[?&]id=([^&]*)/;
        // 2. 提取id
        allLinks.forEach(link => {
            let href = link.href;
            let match = href.match(idRegex);
            // 如果匹配到 id，则输出第一个 id 值
            if (match && match[1]) {
                id = match[1]
            }
        });
        // 创建按钮
        if (id !== '') {
            let tmp = download[i].parentElement.parentElement.parentElement.children[1];
            tmp.setAttribute('style', 'position: relative;');
            let btn = document.createElement("button");
            btn.innerHTML = '快速下载';
            btn.setAttribute('class', 'medium');
            btn.setAttribute('style', 'position: absolute; top: 0; right: 0; margin: 0; border-radius: 10px; background: lightgray;');
            btn.onclick = function() {
                // 获取token
                GM_xmlhttpRequest({
                    url: `${serviceUrl}/authman/user/login`,
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        "username": username,
                        "password": password,
                        "email": ''
                    }),
                    onload(tokenResp) {
                        if (JSON.parse(tokenResp.response).status !== 'ok') {
                            alert('获取token失败, 请检查后重试');
                            return;
                        }
                        let token = JSON.parse(tokenResp.response).result;
                        // 添加下载任务
                        GM_xmlhttpRequest({
                            url: `${serviceUrl}/core/download/pt/${id}`,
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
                                console.log();
                                if (JSON.parse(downloadResp.response).status === 'ok') {
                                    alert('添加下载任务成功');
                                } else {
                                    alert('添加下载任务失败, 请检查后重试');
                                }
                            }
                        });
                    }
                });
            }
            tmp.appendChild(btn);
        }
    }
})();