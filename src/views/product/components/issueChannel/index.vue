<template>
    <div class="channel-billing" v-if="showChannel">
        <div class="channel-title">
            <h2>渠道出单</h2>
            <div :class="['switch-wrap', {'checked': switchOff}]" @click="switchOff = !switchOff">
                <span class="switch-bg"></span>
                <span class="switch-bar"></span>
            </div>
        </div>
        <div class="channel-content" v-show="switchOff">
            <div class="channel-content__select">
                <label>业务类型</label>
                <div class="channel-content__text" :title="businessType.text" @click="onBusiness">{{businessType.text || '请选择'}}</div>
            </div>
            <div class="channel-content__select" v-show="businessType">
                <label>代理人/经办渠道</label>
                <div class="channel-content__text" :title="agent.text" @click="onAgent">{{agent.text || '请选择'}}</div>
            </div>
            <div class="channel-content__select" v-show="businessType.name == '银行代理' && agent">
                <label>网点信息</label>
                <div class="channel-content__text" :title="website.text" @click="onWebsitet">{{website.text || '请选择'}}</div>
            </div>
        </div>
        <div class="channel-share" v-show="switchOff && isShare" @click="onShare">分享给客户</div>
        <van-popup v-model="showPicker" position="bottom" id="issueChannel">
            <van-picker title="标题" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker=false" />
        </van-popup>
    </div>
</template>

<script>
import { getSaleDeptAndBizSource, getSaleChannelCode, getNodeCode } from 'services/productDetail'
import { nativeShare } from 'utils/native'
import Toast from 'components/toast';
import queryProduct from '../../config/product'
let firstIn = true
export default {
    props: {
        value: Boolean
    },
    data () {
        return {
            switchOff: this.value,
            businessType: '',
            agent: '',
            businessOptions: [],
            agentOptions: [],
            websiteOptions: [], // 网点下拉值
            deptCode: '',
            stepFlag: '',
            columns: [],
            showPicker: false,
            showChannel: false,
            website: '' // 网点信息
        }
    },
    mounted(){
        const showChannel = () => {
            // 展业App渠道
            this.showChannel = !!(window.isWebview || (window.Handler && window.Handler.action) || window.action) 
            this.showChannel && this.getChannelInfo();
        }
        showChannel()
        setTimeout(() => {
            showChannel()
        }, 1000)
        // this.getChannelInfo()
    },
    methods: {
        // 获取渠道信息
        getChannelInfo () {
            getSaleDeptAndBizSource({
                employNo: this.$route.query.salesCode,
                issueChannel: this.$route.query.issueChannel
            }).then(res => {
                if (res.result) {
                    this.deptCode = res.result.deptList && res.result.deptList.length && res.result.deptList[0].code
                    if (res.result.bizSourceList) {
                        res.result.bizSourceList.map(item => {
                            item['text'] = `${item.code} ${item.name}`
                        })
                        this.businessOptions = res.result.bizSourceList || []
                    }
                }
            })
        },
        // 获取代理人、经办渠道
        getSaleChannelCode () {
            getSaleChannelCode({
                bizSourceCode: this.bizSourceCode,
                deptCode: this.deptCode,
                productId: this.$route.query.productId,
                salesCode: this.$route.query.salesCode||''
            }).then(res => {
                if (res.result) {
                    res.result.dataList.map(item => {
                        item['text'] = `${item.code} ${item.name}`
                    })
                    this.agentOptions = res.result.dataList || []
                }
            })
        },
        // 网点信息
        getNodeCode() {
            getNodeCode({
                chaCode: this.websiteCode,
                deptCode: this.deptCode,
                productId: this.$route.query.productId
            }).then(res => {
                if (res.result) {
                    res.result.nodeCodeList.map(item => {
                        item['text'] = `${item.code} ${item.name}`
                    })
                    this.websiteOptions = res.result.nodeCodeList || []
                }
            })
        },  
        // 业务类型
        onBusiness () {
            this.columns = this.businessOptions
            this.showPicker = true
            this.stepFlag = 'businessType'
        },
        // 代理人、经办渠道
        onAgent () {
            if (!this.agentOptions.length) {
                Toast('请与分公司联系确认该出单机构项下是否有配置经办渠道信息')
                return
            }
            this.columns = this.agentOptions
            this.showPicker = true
            this.stepFlag = 'agent'
        },
        // 网点信息
        onWebsitet () {
            if (!this.websiteOptions.length) {
                Toast('请与分公司联系确认该出单机构项下是否有配置网点信息')
                return
            }
            this.columns = this.websiteOptions
            this.showPicker = true
            this.stepFlag = 'website'
        },
        onConfirm (res) {
            if (this.stepFlag === 'businessType') {
                if (this.businessType.text !== res.text) {
                    this.businessType = res
                    this.agent = ''
                    this.website = ''
                    this.getSaleChannelCode()
                }
                this.$emit('change', this.deptCode, res.code , 'businessType')
            } else if (this.stepFlag === 'agent') {
                this.agent = res
                // 部门code，代理人code
                this.$emit('change', this.deptCode, res.code , 'agent')
                if (this.businessType.text.indexOf('银行代理') > -1 ) {
                    this.website = ''
                    this.getNodeCode()
                }
            } else {
                this.website = res
                // 部门code，代理人code
                this.$emit('change', this.deptCode, res.code, 'website')
            }
            this.showPicker = false
        },
        // 分享客户
        onShare () {
            const _product = queryProduct(this.$route.query.productId)
            let url = `${location.href}&shareExtenterpCode=${this.agent.code}&departmentCode=${this.deptCode}&isChannelShare=true`
            if (this.businessType.text.indexOf('银行代理') > -1) {
                url = url + `&businesSource=${this.businessType.code}&extBranchCode=${this.website.code}`
            }
            const _url = url
            var _options = {
                title: _product.productName,
                desc: _product.productDesc,
                text:  _product.productDesc,
                titleUrl: _url,
                siteUrl: _url,
                url: _url,
                imgUrl:  _product.productImg,
            };
            nativeShare(JSON.stringify(_options));
        }
    },
    computed: {
        bizSourceCode () {
            return this.businessType && this.businessType.code || ''
        },
        websiteCode () {
            return this.agent && this.agent.code || ''
        },
        isShare() {
            if (this.businessType.name == '银行代理') {
                if (this.website)  return true
                 else  return false
            } else {
                if (this.agent) return true
                 else return false
            }
        }
    },
    watch: {
        switchOff (newVal) {
            this.$emit('input', newVal)
        },
        // 解决select组件层级不够，被底部立即投保遮挡问题
        showPicker(newVal) {
            if (newVal && firstIn) {
                this.$nextTick(() => {
                    firstIn = false
                    document.querySelector('body').append(document.getElementById('issueChannel'))
                })
            }
        }
    }
}
</script>

<style src="./index.scss"></style>