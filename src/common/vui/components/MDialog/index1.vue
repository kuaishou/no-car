<template>
  <div v-if="show" class="mdialog-mask" :closeFn='closeFn' :Mask='Mask' @click.capture='clickMask'>
    <div class="mdialog-body">
      <span @click="close" class="mdialog-close" v-if='closeBtn'></span>
      <div class="mdialog-title" v-if='title'>
        {{title}}
      </div>


      <div v-if='slotIf' class="mdialog-content">
        <slot></slot>
      </div>
      <div v-else-if='content' v-html="content" class="mdialog-content"></div>


      <iframe frameborder="0" class="iframe" v-else :src="iframeUrl"></iframe>
      <div v-if="false" class="mdialog-footer">footer</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      slotIf: {
        type: Boolean,
        default: true
      },
      Mask: {
        type: Boolean,
        default: false
      },
      closeBtn: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: null
      },
      iframeUrl: {
        type: String,
        default: null
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: null
      },
      closeFn: {
        type: Function,
        default: null
      }
    },
    methods: {
      clickMask(e){
        if(!this.Mask){return}
        // console.log(e.target.className);
        if(e.target.className.indexOf('mdialog-mask')>-1){
          this.close();
        }
      },
      load(url) {
        return new Promise(r => {
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                console.log(xhr.responseText);
                r(xhr.responseText);
              }
            }
          };
          xhr.open("GET", url, true);
          xhr.send(null);
        });
      },
      close() {
        this.show = false;
        if (this.closeFn) {
          this.closeFn();
        }
      },
    },
    mounted() {
      // console.log('md-mounted');
      this.show = 1;
    },
    data() {
      return {
        show: 1
      }
    },
    watch: {
      iframeUrl() {
        if (this.iframeUrl) {
          this.content = "";
        }

      },
      content() {
        if (this.content) {
          this.iframeUrl = "";
        }
      }
    },
    created() {
      this.show = 1;

      this.$nextTick(() => {
        if (this.url) {
          this.load(this.url).then(r => {
            // console.log(r);
            this.content = r;
            this.iframeUrl = "";
          });
        }
        // console.log('iframeUrl')
        // if(this.iframeUrl){
        //   console.log('iframeUrl')
        //   this.$loading();
        // }
      });
    }
  };
</script>

<style lang="less" scoped>
  .mdialog-mask {
    position: fixed;
    // position: absolute;
    // position: relative;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99998;
  }

  .iframe {
    height: 100%;
    width: 100%;
  }

  .centerXY_M .mdialog-body {
    top: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
  }

  .mdialog-body {
    position: absolute;
    top: 0;
    left: 50%;
     transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background: white;
    border-radius: 8px;
    overflow: hidden;
  }

  .mdialog-title {
    height: 120px;
    line-height: 120px;
    background: white;
    text-align: center;
    position: relative;
    font-size: 32px;
    /*px*/
    border-bottom: 1px solid #ccc;/*no*/
  }

  .mdialog-close {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozODk4Mjk2MS04MGM1LWE1NDctODZjMy1mNDc1NTg0MDhhN2UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDIwOUNGODExOTlFMTFFNzgxODE5RDAxMjU5Q0FBQTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDIwOUNGODAxOTlFMTFFNzgxODE5RDAxMjU5Q0FBQTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwN2EwN2FiLWU5ZWYtZGM0Yy04YTYzLWQ1YjU2OTNkZDM4MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozODk4Mjk2MS04MGM1LWE1NDctODZjMy1mNDc1NTg0MDhhN2UiLz4gPC9y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') center center/auto 60% no-repeat;
    width: 120px;
    height: 120px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 2
  }

  .mdialog-content {
    flex: 1;
    overflow: scroll;
  }

  .mdialog-footer {
    height: 100px;
    line-height: 100px;
    background: white;
  }
</style>