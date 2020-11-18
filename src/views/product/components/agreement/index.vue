<template>
    <transition name="fadeUp">
        <div class="agreement-wrap" v-show="showAgreement">
            <div class="agreement-header hairline--bottom">
                <span class="agreement-title">{{title}}</span>
                <span class="agreement-close" @click="close"></span>
            </div>
            <div class="agreement-content" :style="contentStyle" ref="content" @scroll.prevent="onScroll">
                <slot>
                    <div class="padding" v-html="content"></div>
                </slot>
            </div>
            <div class="agreement-footer hairline--top" v-if="footer">
                <div class="agreement-footer__checked hairline--bottom" @click="agreementChecked=!agreementChecked" v-if="checked">
                    <i :class="['icon-checkbox', {'checked': agreementChecked}]"></i>
                    <span>本人已经仔细阅读并确认以上内容</span>
                </div>
                <div class="agreement-footer__btn">
                    <span v-if="showCancelBtn" :class="[{'disabled': this.isDisabled && this.btnRelation}]" @click="onButton('cancel')">{{this.cancelBtnText}}<i v-if="count">（{{count}}s）</i></span>
                    <span v-if="showConfirmBtn" :class="['confirm',{'disabled': this.isDisabled}]" @click="onButton('confirm')">{{this.confirmBtnText}}<i v-if="count">（{{count}}s）</i></span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import raf from 'utils/raf'
import Toast from 'components/toast'
export default {
    name: 'Agreement',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: String,
        content: String,
        footer: Boolean,       // 是否显示底部协议、按钮组
        checked: {             // 是否显示协议勾选控制
            type: Boolean,
            default: true
        },
        slideToBottom: Boolean, // 是否开启滑到底部控制
        showConfirmBtn: {       // 是否显示确定按钮
            type: Boolean,
            default: true
        },
        confirmBtnText: {       // 确定按钮文本
            type: String,
            default: '确定'
        },
        showCancelBtn: Boolean, // 是否显示取消按钮
        btnRelation: {          // 取消按钮同确认按钮一样控制事件
            type: Boolean,
            default: true
        },      
        cancelBtnText: {        // 取消按钮文本
            type: String,
            default: '取消'
        },
        btnTime: {              // 是否开启倒计时控制
            type: Boolean,
            default: true
        },
        countNum: {             // 按钮倒计时秒数
            type: Number,
            default: 5
        }

    },
    data () {
        return {
            showAgreement: false,
            agreementChecked: false,
            disabled: true,
            count: 0,
            isBottom: false,
        }
    },
    methods: {
        close () {
            this.showAgreement = false
            this.$emit('input', this.showAgreement)
        },
        init () {
            this.agreementChecked = false
            this.count = 0
            this.isBottom = false
        },
        initContent () {
            const initHeight = () => {
                this.contentHeight = this.$refs.content.offsetHeight
                this.contentScroll = this.$refs.content.scrollHeight
                // 初始化的时候执行一遍，以免页面高度不构成滚动条导致不激活到底事件
                // this.scrollEvent(this.$refs.content)
            }
            raf(initHeight)
            setTimeout(initHeight, 500) // fix渲染延迟高度获取错误
        },
        onScroll (e) {
            this.$emit('scroll', e)
            this.scrollEvent(e.target)
        },
        scrollEvent(el) {
            // 滑动到底部
            if (this.slideToBottom && !this.isBottom) {
                const sTop = el.scrollTop
                if (sTop >= this.contentScroll - this.contentHeight - 50) {
                    this.isBottom = true
                } else {
                    this.isBottom = false
                }
            }
        },
        onButton (name) {
            if (this.isDisabled) return
            if (this.btnRelation || (!this.btnRelation && name === 'confirm')) {
                this.scrollEvent(this.$refs.content)
                // this.$nextTick(() => {
                    if (this.slideToBottom && !this.isBottom) {
                        Toast('请滑到底部阅读完整内容')
                        return
                    }
                    if (this.checked && !this.agreementChecked) {
                        Toast('请勾选并阅读以上内容')
                        return
                    }
                // });
            }
            this.$emit(name)
        },
        countDown () {
            clearInterval(this.timer)
            this.count = this.countNum
            this.timer = setInterval(() => {
                if (this.count == 0) {
                    clearInterval(this.timer)
                    this.disabled = false
                    return
                }
                this.count--
            }, 1e3)
        }

    },
    computed: {
        contentStyle () {
            if (this.footer) {
                return {
                    bottom: this.checked ? '1.68rem' : '.9rem'
                }
            }
            return null
        },
        isDisabled() {
            // return this.checked && !this.agreementChecked || this.btnTime && this.count || this.slideToBottom && !this.isBottom
            return this.checked && !this.agreementChecked || this.btnTime && this.count
        }
    },
    watch: {
        value: {
            handler (newValue) {
                this.showAgreement = newValue
                if (newValue) {
                    // 初始化开关参数
                    this.init() 
                    // 滚动条回到顶部
                    raf(() => { this.$refs.content.scrollTop = 0 })
                    // 打开滑动到底开关才执行
                    if (this.slideToBottom) this.initContent(), Toast('请滑到底部阅读完整内容');
                    // 打开按钮倒计时才执行
                    if (this.footer && this.btnTime) this.countDown()
                }
            },
            immediate: true
        }
    }
}
</script>

<style scoped src="./index.scss"></style>