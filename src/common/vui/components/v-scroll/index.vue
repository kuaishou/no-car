<template>
  <div
    class="scroll-wrapper"
    ref="wrapper"
  >
    <div class="scroll-content">
      <!--内容-->
      <slot>
      </slot>
      <!--上拉刷新loading、操作完成状态-->
      <slot
        name="pullup"
        :pullUpLoad="pullUpLoad"
        :isPullUpLoad="isPullUpLoad"
      >
        <div
          class="vui-pullup-wrapper"
          v-if="pullUpLoad"
        >
          <div
            class="before-trigger"
            v-if="!isPullUpLoad"
          >
            <span>{{ pullUpTxt }}</span>
          </div>
          <div
            class="after-trigger"
            v-else
          >
            <v-loading></v-loading>
          </div>
        </div>
      </slot>
    </div>

    <div
      v-if="pullDownRefresh"
      class="vui-pulldown"
      ref="pulldown"
    >
      <!--下拉刷新bubble、loading、操作完成状态-->
      <slot
        name="pulldown"
        :pullDownRefresh="pullDownRefresh"
        :pullDownStyle="pullDownStyle"
        :beforePullDown="beforePullDown"
        :isPullingDown="isPullingDown"
        :bubbleY="bubbleY"
      >

        <div
          class="vui-pulldown-wrapper"
          :style="pullDownStyle"
        >
          <div
            class="before-trigger"
            v-show="beforePullDown"
          >
            <v-bubble
              :y="bubbleY"
              class="bubble"
            ></v-bubble>
          </div>
          <div
            class="after-trigger"
            v-show="!beforePullDown"
          >
            <div
              v-show="isPullingDown"
              class="loading"
            >

              <v-loading></v-loading>
            </div>
            <div
              v-show="!isPullingDown"
              class="vui-pulldown-loaded"
            >

              <span>{{ refreshTxt }}</span>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import VBubble from "../v-bubble";
import VLoading from "../v-loading/index.vue";
// import VuiTip from "../vui-tip";
import mixinsOptions from "../../mixins/options";
//
const EVENT_PULLING_DOWN = "pulling-down";
const EVENT_PULLING_UP = "pulling-up";
const DEFAULT_STOP_TIME = 600;
const DEFAULT_REFRESH_TXT = "刷新完成";
function getRect(el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}
// @vuese
// @group 6 布局
/*
组件引入
```typescript
import { Vue, Component, Provide } from "vue-property-decorator";
import VScroll from "@/common/vui/components/v-conetent/v-scroll.vue";

@Component({
  components: {
    VScroll
  }
})
export default class extends Vue {}
```
展示文案以及better-scroll参数样例
```typescript
options: {
  pullUpLoad: {
    txt: {
      more: "加载完成~", //上拉加载完成文案
      noMore: "没有更多数据了~" //无更多数据文案
    },
    threshold: 10000
  },
  pullDownRefresh: {
    threshold: 80,
    stop: 80
  }
}
```

*/
export default {
  name: "VScroll",
  // minxin options参数
  mixins: [mixinsOptions],
  components: {
    VBubble,
    // VuiTip,
    VLoading
  },
  methods: {
    _onPullUpLoad() {
      this.scroll.on("pullingUp", this._pullUpHandle);
    },
    _offPullUpLoad() {
      this.scroll.off("pullingUp", this._pullUpHandle);
    },
    _pullUpHandle() {
      this.isPullUpLoad = true;
      //页面上拉
      this.$emit(EVENT_PULLING_UP);
    },
    _onPullDownRefresh() {
      this.scroll.on("pullingDown", this._pullDownHandle);
      this.scroll.on("scroll", this._pullDownScrollHandle);
    },

    _pullDownHandle() {
      if (this.resetPullDownTimer) {
        clearTimeout(this.resetPullDownTimer);
      }
      this.beforePullDown = false;
      this.isPullingDown = true;
      //页面下拉
      this.$emit(EVENT_PULLING_DOWN);
    },
    _reboundPullDown(next) {
      const { stopTime = DEFAULT_STOP_TIME } = this.pullDownRefresh;
      setTimeout(() => {
        this.scroll.finishPullDown();
        next();
      }, stopTime);
    },
    _afterPullDown(dirty) {
      this.resetPullDownTimer = setTimeout(() => {
        this.pullDownStyle = `top: -${this.pullDownHeight}px`;
        this.beforePullDown = true;
        dirty && this.refresh();
      }, this.scroll.options.bounceTime);
    },
    _getPullDownEleHeight() {
      // if (!this.$refs.pulldown) {
      //   return;
      // }
      const pulldown = this.$refs.pulldown.firstChild;
      // console.log("_getPullDownEleHeight", getRect(pulldown).height);
      this.pullDownHeight = getRect(pulldown).height;
      // console.log("this.pullDownHeight=", getRect(pulldown).height);
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$nextTick(() => {
        this.pullDownStop = getRect(pulldown).height;
        this.beforePullDown = true;
        this.isPullingDown = false;
      });
    },
    _pullDownScrollHandle(pos) {
      // console.log("_pullDownScrollHandle", pos);
      //   this.beforePullDown = true;
      if (this.beforePullDown) {
        //   console.log('this.pullDownHeight=',pos,pos.y, this.pullDownHeight)
        this.bubbleY = Math.max(0, pos.y - this.pullDownHeight);
        this.pullDownStyle = `top:${Math.min(
          pos.y - this.pullDownHeight,
          0
        )}px`;
      } else {
        this.bubbleY = 0;
        this.pullDownStyle = `top:${Math.min(pos.y - this.pullDownStop, 0)}px`;
      }
      // console.log("******beforePullDown", this.bubbleY);
    },
    _calculateMinHeight() {
      if (this.$refs.listWrapper) {
        this.$refs.listWrapper.style.minHeight =
          this.pullDownRefresh || this.pullUpLoad
            ? `${getRect(this.$refs.wrapper).height + 1}px`
            : 0;
      }
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      // this._calculateMinHeight();
      // console.log("滑动节点=", this.$refs.wrapper);
      let options = Object.assign(
        {
          // // momentum: false,
          // pullDownRefresh: {
          //   threshold: 80,
          //   stop: 80
          // }
        },
        this.options
      );
      this.scroll = new BScroll(this.$refs.wrapper, options);
      if (this.pullDownRefresh) {
        this._getPullDownEleHeight();
        this._onPullDownRefresh();
      }
      if (this.pullUpLoad) {
        this._onPullUpLoad();
      }
    },
    refresh() {
      this._calculateMinHeight();
      this.scroll && this.scroll.refresh();
    },
    forceUpdate(dirty = false) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown(() => {
          this._afterPullDown(dirty);
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        dirty && this.refresh();
      } else {
        dirty && this.refresh();
      }
    },
    resetPullUpTxt() {
      this.pullUpDirty = true;
    },
    activated() {
      /* istanbul ignore next */
      this.enable();
    },
    deactivated() {
      /* istanbul ignore next */
      this.disable();
    },
    mounted() {
      this.$nextTick(() => {
        this.initScroll();
      });
    },
    beforeDestroy() {
      this.destroy();
    },
    destroy() {
      this.scroll && this.scroll.destroy();
      this.scroll = null;
    }
  },
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      bubbleY: 0,
      pullDownStyle: "",
      pullDownStop: 40,
      pullDownHeight: 60
    };
  },
  computed: {
    refreshTxt() {
      const pullDownRefresh = this.pullDownRefresh;
      return (pullDownRefresh && pullDownRefresh.txt) || DEFAULT_REFRESH_TXT;
    },
    pullUpTxt() {
      const pullUpLoad = this.pullUpLoad;
      const txt = pullUpLoad && pullUpLoad.txt;
      const moreTxt = (txt && txt.more) || "";
      const noMoreTxt = (txt && txt.noMore) || "";
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    pullUpLoad() {
      return this.options.pullUpLoad;
    },
    pullDownRefresh() {
      // return false;
      let pullDownRefresh = this.options.pullDownRefresh;
      if (!pullDownRefresh) {
        return pullDownRefresh;
      }
      if (pullDownRefresh === true) {
        pullDownRefresh = {};
      }
      return Object.assign({ stop: this.pullDownStop }, pullDownRefresh);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    }
    // pullDownRefresh: {
    //   handler(newVal, oldVal) {
    //     if (newVal) {
    //       this.scroll.openPullDown(newVal);
    //       if (!oldVal) {
    //         this._onPullDownRefresh();
    //         this._calculateMinHeight();
    //       }
    //     }
    //     if (!newVal && oldVal) {
    //       this.scroll.closePullDown();
    //       this._offPullDownRefresh();
    //       this._calculateMinHeight();
    //     }
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  }
};
</script>

<style lang="less">
.scroll-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.vui-pulldown-wrapper {
  position: absolute;
  width: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all;
  .before-trigger {
    height: 90px;
    line-height: 0;
    padding-top: 6px;
  }
  .after-trigger .loading {
    padding: 8px 0;
  }
  .vui-pulldown-loaded {
    padding: 12px 0;
  }
}
.vui-pulldown-loaded {
  padding-top: 40px;
}
.vui-pullup-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .before-trigger {
    padding: 22px 0;
    min-height: 1em;
  }
  .after-trigger {
    padding: 19px 0;
  }
}
</style>
