<template>
  <div>
    <transition :name="maskTransition">
      <div class="x-mask" @click="hide" v-show="show"></div>
    </transition>
    <transition :name="dialogTransition">
      <div :class="dialogClass" v-show="show" :style="dialogStyle">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'myDialog',
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'x-mask'
    },
    dialogTransition: {
      type: String,
      default: 'x-dialog'
    },
    dialogClass: {
      type: String,
      default: 'x-dialog'
    },
    dialogStyle: Object,
    hideOnBlur: Boolean,
  },
  methods: {
    hide () {
      if (this.hideOnBlur) {
        this.$emit('update:show', false)
        this.$emit('change', false)
        this.$emit('on-click-mask')
      }
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
      this.$emit(val ? 'on-show' : 'on-hide')
    }
  }
}
</script>

<style scoped>
.x-dialog {
    position: fixed;
    display: table;
    z-index: 5000;
    width: 100%;
    width: 5.58rem;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: transparent;
    text-align: center;
    border-radius: .12rem;
    overflow: hidden;
}
.x-mask {
    position: fixed;
    z-index: 4000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
}
.x-fade-enter-active,.x-fade-leave-active {
  opacity: 1;
  transition: opacity linear 0.2s;
}
.x-fade-enter, .x-fade-leave-to {
  opacity: 0;
}
.x-dialog-enter-active {
  animation: x-dialog-in .5s;
}
.x-dialog-leave-active {
  animation: x-dialog-out .3s;
}
@keyframes x-dialog-in {
  0% {
    transform: scale(1.185);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes x-dialog-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.85);
    opacity: 0;
  }
}
.x-mask-enter, .x-mask-leave-active {
  opacity: 0;
}
.x-mask-leave-active, .x-mask-enter-active {
  transition: opacity 300ms;
}

</style>