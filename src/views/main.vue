<style scoped lang="less">
</style>
<template>
    <div>
        <main-sidebar />
        <main-content/>
    </div>
</template>
<script>
    import MainContent from './main-content'
    import MainSidebar from './main-sidebar'
    export default {
        components: {
            MainContent,
            MainSidebar,
        }
    }
</script>
