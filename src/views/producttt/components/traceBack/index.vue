<template>
    <div>
        <footer-button v-bind="$attrs" ref="footerButton" :agreement-list="noticeList" :checked.sync="agreementChecked" @submit="$emit('submit')">
            <slot></slot>
        </footer-button>
        <!-- 协议公共弹窗 -->
        <agreement v-model="showAgreement" :content="agreementContent" :title="agreementTitle" footer :show-cancel-btn="showCancelBtn" cancel-btn-text="部分为是" :confirm-btn-text="confirmBtnText" @confirm="onConfirm" @cancel="onCancel" :slide-to-bottom="isOpen" :checked="isOpen" :btn-time="isOpen"></agreement>
        <welcome-dialog v-model="showDialog" confirm-button-text="确定">
            <div class="insure-process">
                <img class="insure-process__icon" src="../../images/insure-process.png" alt="">
                <p class="insure-process__title">您已进入华安保险投保流程</p>
                <p class="insure-process__text">温馨提示：请仔细阅读投保须知、保险条款等信息，为维护您的合法权益，您的操作轨迹将被记录</p>
            </div>
        </welcome-dialog>
    </div>
</template>

<script>
import footerButton from '../footerButton'
import agreement from '../agreement'
import { noticeInfo } from 'services/productDetail'
import welcomeDialog from 'components/dialog/dialog.vue'
import raf from 'utils/raf'
export default {
    components: {
        footerButton,
        agreement,
        welcomeDialog
    },
    props: {
        checked: Boolean
    },
    data () {
        return {
            showAgreement: false,
            agreementTitle: '',
            agreementContent: '',
            agreementChecked: this.checked,
            noticeList: [],
            stepTotal: 0,  // 总共几个协议
            step: 1,  // 当前第几个协议
            currentIndex: -1,
            showCancelBtn: false,
            confirmBtnText: '',
            showDialog: false,
            traceSwitch: true, // 回溯开关
            isOpen: false
        }
    },
    created() {
        this.getNoticeInfo()
    },
    mounted(){
         const showSwitch = () => {
            // 展业App渠道
           let isApp = !!(window.isWebview || (window.Handler && window.Handler.action) || window.action || navigator.userAgent.indexOf("Html5Plus") > -1 || this.$route.query.memory == '1'); //memory连接中关闭可回溯标识
           this.isOpen = !isApp && this.traceSwitch;
           if(this.isOpen){
                this.showDialog = true
           }else{
                this.showDialog = false
           }
        }
        setTimeout(() => {
            showSwitch()
        }, 1000)
    },
    methods: {
        // 获取协议
        getNoticeInfo () {
            let requestData = JSON.stringify(this.$route.query)
            noticeInfo({ requestData }).then(res => {
                if (res.resultCode == '000000' && res.noticeList.length) {
                    this.noticeList = res.noticeList
                    this.stepTotal = this.noticeList.length
                }
            })
        },
        trace(opt) {
            // 可回溯开关关闭的话要走老流程
            if (!this.isOpen) {
                if (!opt) {
                    this.$emit('confirm')
                    return
                }
                this.agreementTitle = opt.title
                this.agreementContent = opt.content
                this.showCancelBtn = true
                this.confirmBtnText = '以上全否'
                this.showAgreement = true
                this.step = this.stepTotal
                return
            }

            // 每次触发都要把步骤设为第一个协议，不然中途关闭协议再来就出问题了
            this.step = 1
            this.currentIndex = -1
            if (opt) {
                this.agreementTitle = opt.title
                this.agreementContent = opt.content
                this.showCancelBtn = true
                this.confirmBtnText = '以上全否'
                // 存在健康告知，需要在总协议数量上增加
                this.stepTotal = this.noticeList.length + 1
                this.showAgreement = true
            } else {
                this.initAgreement()
            }
        },
        onCancel() {
            this.$emit('cancel', this.close)
        },
        close() {
            this.showAgreement = false
        },
        onConfirm() {
            if (this.step === this.stepTotal) {
                this.$emit('confirm')
                return
            }
            this.step++
            this.showAgreement = false
            raf(this.initAgreement)
        },
        initAgreement() {
            this.showCancelBtn = false
            this.confirmBtnText = '确定'
            this.currentIndex++
            this.agreementTitle = this.noticeList[this.currentIndex].TITLE
            this.agreementContent = this.noticeList[this.currentIndex].CONTENT
            this.showAgreement = true
        },
        // 提供一个方法供外部单独查看某个协议使用
        viewAgreement(index){
            const item = this.noticeList[index]
            this.$refs.footerButton.viewAgreement(item)
        }
    },
    watch: {
        agreementChecked (newVal) {
            this.$emit('update:checked', newVal)
        }
    }

}
</script>

<style scoped>
.insure-process{
    padding: .48rem;
    text-align:center;
    &__icon{
        display: block;
        width: .96rem;
        height: .96rem;
        margin: 0 auto .32rem;
    }
    &__title{
        font-weight: 700;
        font-size: .32rem;
        color: #333;
    }
    &__text{
        font-size: .28rem;
        color: #9E9E9E;
        padding-top: 8px
    }
  
}
>>> .dialog-footer{
    margin: 0 .48rem .48rem;
    background: #FF3F61;
    border-radius: .12rem;
    .dialog-confirm{
        color: white;
        font-weight: 500;
        font-size: .32rem;
    }
}
</style>