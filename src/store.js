import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        // 侧边栏, 折叠状态
        sidebarFold: false,
        
        // 主入口标签页
        mainTabs: [],
        menuActiveName: '',
        mainTabsActiveName: '',
    },

    mutations: {
        updateSidebarFold (state, fold) {
          state.sidebarFold = fold
        },
        updateMainTabs (state, tabs) {
        state.mainTabs = tabs
        },
        updateMenuActiveName (state, name) {
          state.menuActiveName = name
        },
        updateMainTabsActiveName (state, name) {
          state.mainTabsActiveName = name
        },
    }
})
