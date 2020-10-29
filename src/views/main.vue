<style scoped lang="less">
</style>
<template>
    <div>
        <main-sidebar />
        <main-content/>
    </div>
</template>
<script>
    import MainContent from './mainContent'
    import MainSidebar from './mainSidebar'
    export default {
        components: {
            MainContent,
            MainSidebar,
        }
    }
</script>
