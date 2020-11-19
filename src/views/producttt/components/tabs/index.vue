<template>
    <div :class="getClass" ref="tabWrap">
        <div :class="['tabs-nav',{'tabs-nav--fixed hairline--bottom': isFixed}]" v-if="tabsList.length" v-show="showNav">
            <div
                ref="tabItem"
                :class="['tabs-item', { 'tabs-item--active': index === currentIndex }]"
                :style="{ color: index === currentIndex ? color : '' }"
                v-for="(item, index) in tabsList" :key="index" @click="itemClick(item, index)"
            >
                <span class="tabs-text">{{item.name}}</span>
            </div>
            <div class="tabs-line" :style="lineStyle"></div>
        </div>
        <div class="tabs-nav--placeholder" v-if="tabsList.length"></div>
    </div>
</template>

<script>
/**
 * 使用： <tabs v-model="currentIndex" :data="data"></tabs>
 * @attribute  value 绑定索引值
 * @attribute  type tab类型，支持两种类型，默认：line，可选：card
 * @attribute  data tabs数据，格式： [{name: '标签名称', anchor: '锚点名称'}]
 * @attribute  color 选中颜色，同时改变文字和下划线颜色
 * @attribute  offsetTop 开启滚动导航后，锚点滚动与顶部的距离，默认是0，导航开启吸顶的效果的话，默认就是导航高度
 * @attribute  scrollNav 是否开启滚动导航，默认开启
 * @attribute  fixed 是否开启吸顶效果，默认开启
 * tips：凡是开启了滚动导航的，data对象里面必须传入锚点名称，外部对应dom需加入对应属性anchor="锚点名称"，如：<div anchor="锚点名称"></div>
 */


export default {
    props: {
        value: Number | String,
        type: String,
        data: {
            type: Array,
            default: () => []
        },
        color: String,
        offsetTop: {
            type: Number | String,
            default: 0
        },
        scrollNav: Boolean,
        fixed: Boolean,
    },
    data () {
        return {
            tabsList: [],
            lineStyle: {},
            currentIndex: 0,
            isFixed: false,
            watchValue: true,
            showNav: true
        }
    },
    mounted () {
        const self = this
        this.$nextTick(() => {
            this._setLine()
            this.pages = this._getScrollPage()
            this.scrollElem = this._getScroller(this.$el)
            this.scrollElem.addEventListener('scroll', this._scrollHandler, false)
            this.wrapHeight = this.$refs.tabWrap.offsetHeight
            window.addEventListener('resize', this._setLine, false)
            if (window.Handler && window.Handler.action || window.action) {
                self.scrollElem.addEventListener('touchmove', function(e) {
                    self.$emit('scroll', this.scrollTop)
                    self.showNav = !self.isFixed
                })
                self.scrollElem.addEventListener('touchend', function(e) {
                    self.showNav = true
                })
            }
        })
    },
    computed: {
        getType() {
            return this.type === 'card'
        },
        getClass() {
            return  this.getType ? 'tabs-card': 'tabs-wrapper hairline--bottom'
        }
    },
    methods: {
        itemClick (item, index) {
            this.currentIndex = index
            this._setLine()
            if ( !this.getType && this.scrollNav && item.anchor) this.scrollIntoView(item.anchor)
            this.$emit('change', index, item)
        },
        scrollIntoView (name) {
            const _el = this._getDom(name)
            if (_el) {
                _el.scrollIntoView()
                if (this.fixed) this.scrollElem.scrollTop -= this.wrapHeight
            }
        },
        _scrollHandler () {
            let scrollTop = this.scrollElem.scrollTop
            if (this.scrollNav) {
                this.pages.length && this.pages.map((item, index) => {
                    let distance = item.el.offsetTop - this.wrapHeight
                    if (+this.offsetTop) distance -= (+this.offsetTop)
                    if (scrollTop >= distance) this.currentIndex = index
                })
            }
            if (this.fixed) {
                let _top = this.$refs.tabWrap.offsetTop
                this.isFixed = scrollTop >= _top
            }
            this.$emit('scroll', scrollTop)
        },
        _setLine () {
            this.$nextTick(() => {
                const itemEl = this.$refs.tabItem[this.currentIndex]
                const left = itemEl.offsetLeft + itemEl.offsetWidth / 2
                const lineStyle = {
                    backgroundColor: this.color,
                    transform: `translateX(${left}px) translateX(-50%)`,
                }
                if (!this.getType) {
                    const width = itemEl.offsetWidth / 4
                    lineStyle['width'] = `${width}px`
                }
                this.lineStyle = lineStyle
            })
        },
        _getDom (name) {
            return document.querySelector(`[anchor=${name}]`)
        },
        // 获取tab对应page
        _getScrollPage () {
            let pageList = []
            this.tabsList.forEach(item => {
                if (item.anchor) {
                    let el = this._getDom(item.anchor)
                    el && pageList.push({
                        anchor: item.anchor,
                        el: el
                    })
                }
            })
            return pageList
        },
        // 获取滚动dom
        _getScroller (el, root = window) {
            const overflowScrollReg = /scroll|auto/i;
            let node = el;
            while (
                node &&
                node.tagName !== 'HTML' &&
                node.nodeType === 1 &&
                node !== root
            ) {
                const { overflowY } = window.getComputedStyle(node);
                if (overflowScrollReg.test(overflowY)) {
                    if (node.tagName !== 'BODY') {
                        return node;
                    }
                    const { overflowY: htmlOverflowY } = window.getComputedStyle(node.parentNode)
                    if (overflowScrollReg.test(htmlOverflowY)) {
                        return node;
                    }
                }
                node = node.parentNode
            }
            return root
        }
    },
    watch: {
        value: {
            handler(newVal) {
                if (!this.getType && this.watchValue && !isNaN(newVal)) {
                    this.$nextTick(() => {
                        let num = +newVal
                        this.currentIndex = Math.max(0, Math.min(num, this.tabsList.length))
                        let anchor = this.tabsList[this.currentIndex].anchor
                        this.scrollIntoView(anchor)
                        this.watchValue = false
                    })
                }
            },
            immediate: true
        },
        data: {
            handler (newVal) {
                this.tabsList = newVal
            },
            immediate: true
        },
        currentIndex (newVal) {
            this._setLine()
            this.$emit('input', newVal)
        }
    },
    destroyed () {
        this.scrollElem && this.scrollElem.removeEventListener('scroll', this._scrollHandler, false)
        window.removeEventListener('resize', this._setLine, false)
    }
}
</script>

<style scoped src="./index.scss"></style>