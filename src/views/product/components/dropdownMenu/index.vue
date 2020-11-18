<template>
    <div :class="['dropdown-menu', {'dropdown-menu--opened': isShow}]">
        <transition name="fade">
            <div class="dropdown-overlay" @click="close" v-show="isShow"></div>
        </transition>
        <div class="dropdown-menu__bar hairline--bottom">
            <!-- <div class="dropdown-menu__item">
                <span class="dropdown-menu__title dropdown-menu__title--down">
                    <div class="ellipsis">全部商品</div>
                </span>
            </div> -->
            <div class="dropdown-menu__item" v-for="(item,index) in dataList" :key="index" @click="dropdown(item)">
                <span :class="['dropdown-menu__title', {
                'dropdown-menu__title--active': item.show
            }]">
                    <div class="ellipsis">{{item.list[item.index || 0]}}</div>
                </span>
            </div>
        </div>
        <transition name="slide" v-for="(items,indexs) in dataList" :key="indexs">
            <div class="dropdown-item" v-show="items.show">
                <div class="dropdown-item__content">
                    <div :class="['dropdown-item__option', {
                        'dropdown-item__option--active': index === items.index
                    }]" v-for="(item,index) in items.list" :key="index"  @click="changeHandler(items, index)">
                        <span>{{item}}</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            dataList: [],
            isShow: false
        }
    },
    methods: {
        dropdown(item) {
            this.close()
            item.show = true
            this.isShow = true
        },
        close() {
            this.isShow = false
            this.dataList.map(item => {
                item.show = false
            })
        },
        changeHandler(items, index){
            items.index = index
            this.close()
            const result = this.dataList.map(item => item.index)
            this.$emit('change', result)
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(newVal) {
                newVal.forEach(item => {
                    this.$set(item, 'show', false)
                })
                this.dataList = newVal
            }
        }
    }
}
</script>

<style scoped src="./index.scss"></style>