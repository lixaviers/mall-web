<template>
  <div class="suyan__content__wrapper">
      <div v-if="$route.meta.isTab">
          <Dropdown trigger="click" class="suyan__tabs__tools">
              <a href="javascript:void(0)"><Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                  <DropdownItem @click.native="tabsCloseCurrentHandle">关闭当前标签页</DropdownItem>
                  <DropdownItem @click.native="tabsCloseOtherHandle">关闭其它标签页</DropdownItem>
                  <DropdownItem @click.native="tabsCloseAllHandle">关闭全部标签页</DropdownItem>
                  <DropdownItem divided @click.native="tabsRefreshCurrentHandle">刷新当前标签页</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          <Tabs type="card" 
              @on-click="selectedTabHandle"
              @on-tab-remove="removeTabHandle"
              v-model="mainTabsActiveName"
              closable class="suyan__tabs">
              <TabPane
                v-for="item in mainTabs"
                :key="item.name"
                :label="item.tabName"
                :name="item.name">
              </TabPane>
          </Tabs>
          
          <!-- 主入口标签页 -->
          <div v-for="item in mainTabs"
              :key="item.name"
              :label="item.tabName"
              :name="item.name">
                <Card dis-hover v-if="item.name === mainTabsActiveName" class="suyan__content">
                    <keep-alive>
                        <router-view />
                    </keep-alive>
                </Card>
          </div>
      </div>
      <div v-else>
        <!-- 主入口标签页 -->
          <Card dis-hover class="suyan__content">
              <keep-alive>
                  <router-view />
              </keep-alive>
          </Card>
      </div>
      
  </div>
  
</template>


<style>
</style>

<script>
export default {
    computed: {
        mainTabs: {
            get () {
                return this.$store.state.mainTabs
            },
            set (val) {
                this.$store.commit('updateMainTabs', val)
            }
        },
        menuActiveName: {
          get () {
            return this.$store.state.menuActiveName
          },
          set (val) {
            this.$store.commit('updateMenuActiveName', val)
          }
        },
        mainTabsActiveName: {
            get () {
                return this.$store.state.mainTabsActiveName
            },
            set (val) {
                this.$store.commit('updateMainTabsActiveName', val)
            }
        },
    },
    created() {
    },
    methods: {
      // tabs, 选中tab
      selectedTabHandle(tab) {
        tab = this.mainTabs.filter(item => item.name === tab)
        if (tab.length >= 1) {
          this.$router.push({name: tab[0].name})
        }
      },
      // tabs, 删除tab
      removeTabHandle(tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
            this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
              this.mainTabsActiveName = this.$route.name
            })
        } else {
          this.menuActiveName = ''
          this.$router.push({name: 'home'})
        }
      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle () {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle () {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      // tabs, 关闭全部
      tabsCloseAllHandle () {
        this.mainTabs = []
        this.menuActiveName = ''
        this.$router.push({name: 'home'})
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle () {
        var tab = this.$route;
        this.removeTabHandle(tab.name);
        this.$nextTick(() => {
          this.$router.push({ name: tab.name, query: tab.query, params: tab.params })
        });
      }
    }
}
</script>
