<template>
    <div>
        <div class="details-footer-placeholder">
            <transition name="footerbtn">
                <div class="details-footer" v-show="value">
                    <div class="details-agreement hairline--top">
                        <div class="checkbox" @click="switchAgreement"><i :class="['icon-checkbox', {'checked': agreementChecked}]"></i>{{label}}</div>
                        <div class="details-agreement__list">
                            <span class="text" v-for="item in agreementList" :key="item.TITLE_ID" @click="viewAgreement(item)">{{item.TITLE}}</span>
                        </div>
                    </div>
                    <div class="details-btn hairline--top">
                        <div class="grid" v-if="showGrid">
                            <div class="grid-item" v-for="item in iconList" :key="item.key" @click="toGrid(item.key)">
                                <img class="icon" :src="item.icon" alt="">
                                <span>{{item.text}}</span>
                            </div>
                        </div>
                        <slot>
                            <div :class="['money', {'zy': showGrid}]">
                                <span :class="['highlight',{'discount': this.discount}]" v-show="!isMonthPay" :num="this.discount">{{premium || 0}}元</span>
                                <span :class="['highlight',{'discount': this.discount}]" v-show="isMonthPay" :num="this.discount">首月{{initialPremium || 0}}元</span>
                                <span v-show="isMonthPay">次月起{{nextPremium || 0}}元/月</span>
                            </div>
                        </slot>
                        <div class="btn" @click="submitInsurance">立即投保</div>
                    </div>
                </div>
            </transition>
        </div>
        <agreement v-model="showAgreement" :title="agreementTitle" :content="agreementContent"></agreement>
        <div class="details-service" @click="toService" v-if="service">
            <img src="./images/zhinengkefu.png" alt="">
            <span>客服</span>
        </div>
    </div>
</template>

<script>
import agreement from '../agreement'
import Toast from 'components/toast'
import { $location } from '../../../../common/utils/browser'
import { logSitu } from '../../../../common/situRecorder'
import { queryBusinessCardInfo, webSubject } from 'services/productDetail'
export default {
    name: 'footerButton',
    components: {
        agreement
    },
    props: {
        value: {
            type: Boolean,
            default: true
        },
        checked: Boolean,
        label: {
            type: String,
            default: '本人已经仔细阅读以下相关内容：'
        },
        agreementList: {
            type: Array,
            default: () => []
        },
        premium: Number | String,
        initialPremium: Number | String,
        nextPremium: Number | String,
        discount: Number | String,
        discount: Number | String,
        service: Boolean,
        serviceLink: String,
        grid: Boolean
    },
    data () {
        return {
            agreementChecked: this.checked,
            showAgreement: false,
            agreementTitle: '',
            agreementContent: '',
            iconList: [{
                icon: require('./images/poster.png'),
                text: '海报',
                key: 'poster'
            }, {
                icon: require('./images/course.png'),
                text: '课程',
                key: 'course'
            }],
            studyUrl: null,
            showGrid: false
        }
    },
    created() {
        this.getStudyLink()
    },
    mounted () {
        const showGrid = () => {
            this.showGrid = !!(window.isWebview || (window.Handler && window.Handler.action) || window.action)  && this.grid
        }
        showGrid()
        setTimeout(() => {
            showGrid()
        }, 1000)
    },
    methods: {
        // 获取课程链接
        getStudyLink() {
            webSubject(`small-${this.$route.query.productId}-default`).then(res => {
                if (res.errCode == 0 && res.data && res.data.subjects && res.data.subjects.length && res.data.subjects[0].contents && res.data.subjects[0].contents.length && res.data.subjects[0].contents[0].properties) {
                    this.studyUrl = res.data.subjects[0].contents[0].properties.studyUrl
                }
            })
        },
        // 勾选协议
        switchAgreement () {
            this.agreementChecked = !this.agreementChecked
            this.$emit('update:checked', this.agreementChecked)
        },
        // 查看协议
        viewAgreement (item) {
            logSitu("CLICK_BUTTON",item.TITLE)
            this.agreementTitle = item.TITLE
            this.agreementContent = item.CONTENT
            this.showAgreement = true
        },
        // 立即投保
        submitInsurance () {
            this.$emit('submit')
        },
        // 客服
        toService () {
            if (!this.serviceLink) {
                console.warn('未配置客服跳转链接：service-link')
                return;
            }
            window.location.href = this.serviceLink
        },
        toGrid (key) {
            key === 'poster' ? this.onPoster() : this.onCourse()
        },
        // 海报
        onPoster () {
            const _rp_info = JSON.parse(sessionStorage.getItem('rp_info')) || {}
            let { isMulti, refereeId, issueChannel, name, phone, loginSalesCode, productId, salesCode } = _rp_info
            isMulti = isMulti ? `&isMulti=${isMulti}` : ''
            refereeId = refereeId ? `&refereeId=${refereeId}` : '';
            issueChannel = `&issueChannel=${issueChannel || this.$route.query.issueChannel}`;
            if (name && phone && !loginSalesCode) {
                $location(`/eb-web/pro/app-haiBao/index.html?productId=${productId}&salesCode=${salesCode}&name=${name}&phone=${phone}${refereeId}${isMulti}${issueChannel}`)
                return
            } else {
                const params = { salesCode: loginSalesCode || salesCode || this.$route.query.salesCode }
                queryBusinessCardInfo(params)
                    .then(res => {
                        if (res && res.errCode == '0' && res.data) {
                            const { visitingCard } = res.data
                            if (visitingCard && visitingCard.userName && visitingCard.phone) {
                                const { userName, phone } = visitingCard
                                $location(`/eb-web/pro/app-haiBao/index.html?productId=${productId || this.$route.query.productId}&salesCode=${salesCode || res.data.salesCode}&name=${userName}&phone=${phone}${refereeId}${isMulti}${issueChannel}`)
                                return
                            } else {
                                Toast('抱歉，缺少手机号和用户名，请先去“我的名片”完善个人信息！')
                            }
                        } else {
                            Toast(res.returnMsg || '网络有问题，请稍后重试~')
                        }
                    })
            }

        },
        // 课程
        onCourse () {
            if (this.studyUrl) {
                const link = `${this.studyUrl}&salesCode=${this.$route.query.salesCode}`
                $location(link)
            }
        }

    },
    computed: {
        isMonthPay () {
            return this.initialPremium && this.nextPremium
        }
    }
}
</script>

<style scoped src="./index.scss"></style>