import axios from "axios";
import qs from "qs";

function reqCallback(resp, callback, failed) {
    let data = resp.data;
    if (data.status === 'SUCCESS' && typeof callback === 'function') { // 成功
        callback(data.result);
    } else if (data.status !== 'SUCCESS' && typeof failed === 'function') { // 失败
        failed(data.message);
    }
}

export default {
    isEmpty(str) {
        return str == null || str === '';
    },
    isNotEmpty(str) {
        return !this.isEmpty(str);
    },
    get(url, callback, failed) {
        axios.get(url).then(resp => {
            reqCallback(resp, callback, failed);
        })
    },
    post(url, param, callback, failed) {
        axios.post(url, qs.stringify(param)).then(resp => {
            reqCallback(resp, callback, failed);
        })
    },
    // 文件大小格式转换
    fileSizeTransform(size) {
        if (typeof size !== 'number') {
            return '';
        }
        if (size === 0) {
            return '0';
        }
        let arr = ['byte', 'KB', 'MB', "GB", 'TB', 'PB'];
        for (let i = 0; i < arr.length; i++) {
            let temp = size / 1024;
            if (temp < 1) {
                return size.toFixed(2) + ' ' + arr[i];
            } else {
                size = temp;
            }
        }
    }
}
