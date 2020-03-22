<template>
  <nav class="suyan__nav">
      <div style="float: left">
        <h1 class="navbar__brand"><a>素焉商城</a></h1>
      </div>
      <div style="float: right; margin: 7px 20px;">
          <Dropdown>
            <a href="javascript:void(0)">
                <Avatar icon="ios-person" />
                用户名
            </a>
            <DropdownMenu slot="list">
                <DropdownItem>修改密码</DropdownItem>
                <DropdownItem>退出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      </div>
  </nav>
  
</template>


<style>
</style>

<script>
export default {
    data () {
        return {
            isCollapsed: false
        }
    },
    computed: {
        sidebarFold: {
            get () { return this.$store.state.sidebarFold },
            set (val) { this.$store.commit('updateSidebarFold', val) }
        },
    },
}
</script>
