<style scoped lang="less">
</style>
<template>
    <div>
        <main-navbar />
        <main-sidebar />
        <main-content/>
    </div>
</template>
<script>
    import MainContent from './main-content'
    import MainNavbar from './main-navbar'
    import MainSidebar from './main-sidebar'
    export default {
        components: {
        MainContent,
        MainNavbar,
        MainSidebar,
        }
    }
</script>
