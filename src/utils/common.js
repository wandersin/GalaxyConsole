export default {
    isEmpty(str) {
        return str == null || str === '';
    },
    isNotEmpty(str) {
        return !this.isEmpty(str);
    }
}
