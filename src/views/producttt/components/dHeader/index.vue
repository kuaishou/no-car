<template>
    <div class="header-wrapper">
        <div class="header-title" v-if="isHeader">
            <img src="../../../productDetail/images/logo.png" alt="">
            <span class="line"></span> 
            <span>{{title}}</span>
        </div>
        <div class="header-mobile">
            <ul class="header-mobile__list" ref="mobile" :style="mobileStyle">
                <li :class="['header-mobile__item', {
                    'header-mobile__item--active': index === currentIndex
                }]" :style="{background: mobileColor}" v-for="(item, index) in mobileList" :key="index">{{item}} 刚投保成功</li>
            </ul>
        </div>
        <div class="header-banner">
            <img :src="bannerSrc" alt="">
        </div>
        <div class="header-card">
            <slot>
                <div class="header-card__title">
                    <slot name="title">标题文案</slot>
                </div>
                <div class="header-card__desc">
                    <slot name="desc">
                        <p>描述文案</p>
                    </slot>
                </div>
                <div class="header-card__money">
                    <slot name="money">
                        金额文案：<span class="light">666元</span>
                    </slot>
                </div>
            </slot>
            <div class="header-card__btn" @click="$emit('submit')">立即投保</div>
            <div class="header-card__list">
                <span class="header-card__list__item" v-for="item in tags" :key="item.name"><img v-if="item.icon" :src="item.icon" alt="">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        bannerSrc: String,
        tags: {
            type: Array,
            default: () => [{name: '标签一'},{name: '标签二'},{name: '标签三'}]
        },
        delay: Number | String,
        mobileList: {
            type: Array,
            default: () => []
        },
        mobileColor: String,
        isHeader: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            mobileStyle: {},
            mobileData: this.mobileList,
            currentIndex: 1
        }
    },
    methods: {
        scrollMobile() {
            this.$nextTick(() => {
                const { mobile } = this.$refs
                const mHeight = mobile.offsetHeight
                const cLength = this.mobileData.length
                const cHeight = mHeight / cLength
                setInterval(() => {
                    if (this.currentIndex > cLength - 2) {
                        this.mobileStyle = {
                            marginTop: '0px',
                            transition: 'none'
                        }
                        this.currentIndex = 0
                        let arr = this.mobileData.splice(-2)
                        this.mobileData = [...arr,...this.mobileData]
                    }
                    setTimeout(()=>{
                        this.mobileStyle = {
                            marginTop: `-${(this.currentIndex) * cHeight}px`,
                            transition: 'margin .5s'
                        }
                        this.currentIndex++
                    }, 20)
                }, +this.delay || 3e3)
            })
        }
    },
    mounted () {
        if (this.mobileData.length) {
            this.scrollMobile()
        }
    },
}
</script>

<style src="./index.scss"></style>