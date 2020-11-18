<template>
    <div class="dinput-wrap">
        <div :class="['dinput-box', {'hairline--bottom': borderBottom}]">
            <label v-if="label" v-text="label"></label>
            <input
              :placeholder="placeholder"
              v-model="val"
              @focus="onFocus"
              @blur="onBlur"
              :type="type"
              :maxLength="maxLength"
              @keyup="replaceVal($event)"
            >
            <span class="clear" v-if="showClearBtn" @click="onClear"></span>
        </div>
    </div>
</template>

<script>
import { isIOS, isAndroid } from '../../../../common/utils/browser'
import { formatYhCard } from '../../../../common/utils/card'
export default {
    name: 'dInput',
    props: {
        label: String,
        placeholder: String,
        clearable: Boolean,
        value: Number | String,
        borderBottom: Boolean,
        maxLength: Number | String,
        inputType: String,
        toUpperCase: { //大写
            type: Boolean,
            default: false
        },
        toLowerCase: { //小写
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'text'
        },
    },
    data () {
        return {
            val: this.value,
            isFocus: false
        }
    },
    mounted () {
        // 解决安卓输入框被键盘挡住问题
        if (isAndroid()) {
            window.addEventListener('resize', () => {
                const activeElement = document.activeElement
                if (activeElement && activeElement.tagName == 'INPUT') {
                    setTimeout(() => {
                        activeElement.scrollIntoViewIfNeeded()
                    }, 100)
                }
            })
        }
    },
    methods: {
        onClear () {
            this.val = ''
        },
        onFocus () {
            this.isFocus = true
            this.$emit('focus')
        },
        replaceVal(e) {
            this.val = this.val || ''
            if (this.inputType == 'number') { //只能输入数字
                this.val = this.val.replace(/\D/g, '')
            } else if (this.inputType == 'money') { //只能输入数字和点 --钱
                this.val = this.val.replace(/[^0-9.]/g, '')
            } else if (this.inputType == 'bankcard') { //银行卡
                this.val = this.val.replace(/\D/g, '')
                this.val = formatYhCard(this.val)
            } else if (this.inputType == 'phone') {
                this.val = this.val.replace(/[^0-9-]/g, '')
            } else if (this.inputType == 'idcard') { //身份证
                this.val = this.val.replace(/[^0-9xX]/g, '')
            } else if (this.inputType == 'name') { //姓名
                this.val = this.val.replace(/[^·a-zA-Z\u4e00-\u9fa5]/g, '')
            }
            if (this.val && this.toUpperCase) {
                this.val = this.val.toUpperCase()
            } else if (this.val && this.toLowerCase) {
                this.val = this.val.toLowerCase()
            }
            if (this.maxLength && this.val && this.val.length > this.maxLength) {
                this.val = this.val.substr(0, this.maxLength)
            }
        },
        onBlur () {
            setTimeout(() => {
                this.isFocus = false
            }, 0)
            this.$emit('blur')

            // 解决IOS输入框键盘收起，页面不回弹问题
            if (isIOS()) {
                setTimeout(() => {
                    document.body.scrollTop = document.documentElement.scrollTop = 0
                }, 100)
            }

        }
    },
    computed: {
        showClearBtn () {
            return this.clearable && this.val != '' && this.isFocus
        }
    },
    watch: {
        value (v) {
            this.val = v
        },
        val (v) {
            this.$emit('input', v)
        }
    }
}
</script>

<style scoped src="./index.scss"></style>
