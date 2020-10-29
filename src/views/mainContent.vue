<template>
  <div class="suyan__content__wrapper" :class="{ 'site': this.$route.meta.parentName }">
      <div>
        <!-- 主入口标签页 -->
          <!-- <div v-if="$route.name === 'home'" class="suyan__content">
              <keep-alive>
                  <router-view />
              </keep-alive>
          </div>
          <el-card v-else shadow="always" class="suyan__content">
              <keep-alive>
                  <router-view />
              </keep-alive>
          </el-card> -->
          
          <div class="suyan__content">
              <keep-alive>
                  <router-view />
              </keep-alive>
          </div>
      </div>
      
  </div>
  
</template>


<style>
</style>

<script>
export default {
    computed: {
    },
    created() {
    },
    methods: {
    }
}
</script>
