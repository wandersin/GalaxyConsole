<template>
    <div id="app">
        <div id="app-header"></div>
        <div id="app-lefter"></div>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {}
}
</script>
<style>
#app-header {
    position: absolute;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}

#app-lefter {
    position: absolute;
    top: 3rem;
    left: 0;
    height: calc(100% - 3rem);
    width: 10rem;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
}
</style>
