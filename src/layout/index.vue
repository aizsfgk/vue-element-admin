<template>
  <!-- app wrap -->
  <div :class="classObj" class="app-wrapper">
    <!-- 如果是mobile特殊逻辑 -->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container" />

    <!-- 主窗口 wrap -->
    <div :class="{hasTagsView:needTagsView}" class="main-container">

      <!-- 导航栏 wrap -->
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 导航栏 -->
        <navbar />
        <!-- 面包屑 -->
        <tags-view v-if="needTagsView" />
      </div>

      <!-- 主窗口 -->
      <app-main />

      <!-- 右侧仪表盘 -->
      <right-panel v-if="showSettings">
        <!-- 设置 -->
        <settings />
      </right-panel>

    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout', // 名字
  components: {
    AppMain, // 主窗口
    Navbar, // 导航
    RightPanel, // 右侧仪表盘
    Settings, // 设置
    Sidebar, // 侧边栏
    TagsView // 面包屑
  },
  mixins: [ResizeMixin], // 混入，增加一些选项合并逻辑
  computed: {
    ...mapState({ // 我们可以使用 mapState 辅助函数帮助我们生成计算属性
      sidebar: state => state.app.sidebar, // 侧边栏
      device: state => state.app.device, // 装置
      showSettings: state => state.settings.showSettings, // 展示设置
      needTagsView: state => state.settings.tagsView, // tagsView
      fixedHeader: state => state.settings.fixedHeader // 固定头部
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      // Action 通过 store.dispatch 方法触发
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background:rgb(48, 65, 86);
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 80px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
