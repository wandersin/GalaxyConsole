import axios from "axios";

export default {
    isEmpty(str) {
        return str == null || str === '';
    },
    isNotEmpty(str) {
        return !this.isEmpty(str);
    },
    get(url, callback, failed) {
        axios.get(url).then(resp => {
            let data = resp.data;
            if (data.status === 'SUCCESS') { // 成功
                if (typeof callback === 'function') {
                    callback(data.result);
                }
            } else {
                if (typeof failed === 'function') {
                    failed(data.message);
                }
            }
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
