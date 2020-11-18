<template>
  <div v-if="show" class="mdialog-mask">
    <div class="mdialog-body">
      <div class="mdialog-title">
        {{title}}
        <span @click="close" class="mdialog-close">x</span>
      </div>
      <div v-html="content" v-if="content" class="mdialog-content"></div>

      <iframe frameborder="0" class="iframe" v-else :src="iframeUrl"></iframe>
      <div v-if="false" class="mdialog-footer">footer</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // text: String,
    // value: Boolean,
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
      default: "提示"
    },
    content: {
      type: String,
      default: null
    }
  },
  methods: {
    load(url) {
      return new Promise(r => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
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
      // alert("ss");
      this.show = false;
    }
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    // console.log("1this.url", this);
    // console.log("1this.url", this.url);
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
    console.log("sss");
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
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.iframe {
  height: 100%;
  width: 100%;
}
.mdialog-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background: white;
}
.mdialog-title {
  height: 120px;
  line-height: 120px;
  background: white;
  text-align: center;
  position: relative;
  font-size: 32px; /*px*/
  border-bottom: 1px solid #ccc; /*no*/
  .mdialog-close {
    // background-image: url('../../assets/close.png');
    display: inline-block;
    width: 100px;
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 50px;
  }
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

