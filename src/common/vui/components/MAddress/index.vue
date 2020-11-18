<template>
  
   <picker
    
    :data='dataList'
    @change="changePicker"
    @cancel="cancel"
    @done="done"

    >
    </picker>
  
    
</template>
<script>
import Picker from "../Picker/index.vue";
import data from "../../datas/china_address_v4.json";
// console.log("data", data);
export default {
  components: {
    Picker
  },
  props: {
    // show: {
    //   type: Boolean,
    //   default: false
    // },
    sourceData: {
      type: Array,
      default: function(){
        return data;
      }
    }
  },
  // mounted() {
  created() {
    // this.sourceData.forEach(v => {
    data.forEach(v => {
      if (!v.parent) {
        if (!this.province) {
          this.province = v.value;
        }
        this.dataList[0].push({
          name: v.name,
          value: v.value
        });
      }
      if (v.parent == this.province) {
        // /  console.log(v);
        // if (v.name == "市辖区") {
        //   this.province = v.value;
        //   return;
        // }
        //  this.province = v.value;
        if (!this.city) {
          this.city = v.value;
        }
        this.dataList[1].push({
          name: v.name,
          value: v.value
        });
      }
      // console.log("city", this.city);
      if (v.parent == this.city) {
        // if (!this.city) {
        //   this.city = v.value;
        // }
        this.dataList[2].push({
          name: v.name,
          value: v.value
        });
      }
    });
    console.log("city", this.dataList);
  },
  computed: {
    // 计算属性的 getter
  },

  methods: {
    cancel(){
      this.$emit('cancel');
    },
    done(value){
      this.$emit('done',value);
    },
    getData(value) {
      // console.log("getData-", this.dataList[0]);
      let arr = [];
      data.forEach(v => {
        // console.log("getData-", v);
        if (v.parent == value) {
          arr.push(v);
        }
      });
      // console.log("getData-", arr);
      return arr;
    },
    changePicker(a, b) {
      console.log("changePicker", a, b);
      // this.dataList[a+1] =[]
      this.$set(this.dataList, a + 1, this.getData(b));

      console.log(this.dataList);
    }
  },
  data() {
    return {
      province: "",
      city: "",
      county: "",
      town: "",
      dataList: [
        [],
        [],
        []
        // []/

        // ['2015','2015','2015','2015','2015'],
        // ['1月','2月','3月'],
        // ['0','1','2']
      ]
      // dataList:[]
    };
  }
};
</script>

 