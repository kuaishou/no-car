<template>
    <div>
        
        <slot></slot>
    </div>
</template>
<script>
// @vuese
// @group 待完善
export default {
    name:"VRadioGroup",
    props:{
        value:String,
    },
    created(){ 
        console.log('******',this.value)
        this.$on("on-change",r=>{
            // this.value =r;
            console.log('***=',r)
            this.$emit('input',r)
        })
    },
    data(){
        return {
            currentValue: this.value,
           radioGroup:true
        }
    }
}
</script>

