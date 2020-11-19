<template>
    <div class="radio-wrapper">
        <h2 class="radio-title"><span class="left">{{title}}<i class="doubt" v-if="doubt" @click="$emit('doubt')"></i></span><span class="info">{{info}}</span></h2>
        <ul class="radio-list">
            <li :class="['radio-item',{
                'radio-item--active': index == currentIndex,
                'radio-item--long': long}]" 
                v-for="(item, index) in data" :key="index" @click="onClick(index, item)">{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number|String,
            default: 0
        },
        title: String,
        info: String,
        doubt: Boolean,
        data: {
            type: Array,
            default: () => []
        },
        long: Boolean
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        onClick(index, item) {
            this.currentIndex = index
            this.$emit('change', index, item)
            this.$emit('input', index)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(newVal) {
                this.currentIndex = newVal
            }
        }
    }
}
</script>

<style scoped src="./index.scss"></style>