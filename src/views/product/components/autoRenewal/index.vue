<template>
    <div class="renewal-wrapper">
        <div class="renewal-title">
            <h2>次年自动续保<i class="icon-recomd"></i></h2>
            <div class="switch-wrap" :class="{'checked': renewalSwtich}" @click="switchRenewal">
                <span class="switch-bg"></span>
                <span class="switch-bar"></span>
            </div>
        </div>
        <div class="renewal-info">
            <p>保单到期自动续，不再担心忘缴费。</p>
            <p>原产品原方案续保，免等待。</p>
            <p>自动续保开启后，中途可随时取消。</p>
            <p>续保保费按续保时对应的保费自动扣取。</p>
        </div>
        <div class="renewal-tips">开通即获抽奖机会1次，红包、代驾券等你来拿！</div>
    </div>
</template>

<script>
export default {
    name: 'autoRenewal',
    props: {
        value: Boolean
    },
    data() {
        return {
            renewalSwtich: this.value
        }
    },
    methods: {
        switchRenewal() {
            this.renewalSwtich = !this.renewalSwtich
            this.$emit('input', this.renewalSwtich)
        }
    },
    // watch: {
    //     value(newVal) {

    //     }
    // }
}
</script>

<style scoped src="./index.scss"></style>>