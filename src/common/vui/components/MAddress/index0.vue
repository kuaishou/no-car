<template>
  <popup-picker
    :fixed-columns="hideDistrict ? 2 : 0"
    :columns="3"
    :data="list"
    :title="title"
    v-model="currentValue"
    show-name
    :inline-desc="inlineDesc"
    :placeholder="placeholder"
    :value-text-align="valueTextAlign"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    :display-format="displayFormat"
    :popup-style="popupStyle"
    :popup-title="popupTitle"
    :show.sync="showValue"
    :disabled="disabled"
    @on-shadow-change="onShadowChange"
    @on-hide="emitHide"
    @on-show="$emit('on-show')">
    <template slot="title" slot-scope="props">
      <slot
        name="title"
        :label-class="props.labelClass"
        :label-style="props.labelStyles"
        :label-title="props.title">
        <label
          :class="[props.labelClass,labelClass]"
          :style="props.labelStyle"
          v-if="props.labelTitle"
          v-html="props.labelTitle"></label>
      </slot>
    </template>
  </popup-picker>
</template>

<script> 
// import name2value from '../../filters/name2value'
// import value2name from '../../filters/value2name'
import PopupPicker from '../PopupPicker'
function name2value(name, list) {
  let rs = map(name, (one, index) => {
    let parent = ''
    if (index === 2) {
      // 可能存在区名一样的情况，比如南山区
      parent = find(list, item => {
        return item.name === name[1]
      }) || { value: '__' }

      if (specialMap[name[0]]) {
        parent = {
          value: specialMap[name[0]]
        }
      }
      return find(list, item => {
        return item.name === one && item.parent === parent.value
      })
    } else {
      if (index === 1 && specialMap[name[0]]) {
        return {
          value: specialMap[name[0]]
        }
      }
      return find(list, item => {
        return item.name === one
      })
    }
  })

  return map(rs, one => {
    return one ? one.value : '__'
  }).join(' ')
}
 function value2name(value, list, delimiter) {
  if (value && !list.length) {
    return ''
  }
  if (!delimiter) {
    delimiter = ' '
  }

  let rs = map(value, (one, index) => {
    if (list.length && Object.prototype.toString.call(list[0]) === '[object Array]') {
      return find(list[index], item => {
        return item.value === one
      })
    } else {
      return find(list, item => {
        return item.value === one
      })
    }
  })
  rs = rs.filter(one => {
    return typeof one !== 'undefined'
  })
  return map(rs, one => {
    return one.name
  }).join(delimiter).replace('--', '')
}
export default {
  name: 'x-address',
  components: {
    PopupPicker
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    rawValue: Boolean,
    list: {
      type: Array,
      required: true
    },
    labelWidth: String,
    inlineDesc: String,
    placeholder: String,
    hideDistrict: Boolean,
    valueTextAlign: String,
    confirmText: String,
    cancelText: String,
    displayFormat: {
      type: Function,
      default: (val, names) => names
    },
    popupStyle: Object,
    popupTitle: String,
    show: Boolean,
    disabled: Boolean
  },
  created () {
    if (this.currentValue.length && this.rawValue) {
      const parsedVal = name2value(this.currentValue, this.list)
      if (/__/.test(parsedVal)) {
        console.error('[VUX] Wrong address value', this.currentValue)
        this.currentValue = []
      } else {
        this.currentValue = parsedVal.split(' ')
      }
    }
    if (this.show) {
      this.showValue = true
    }
  },
  methods: {
    emitHide (val) {
      this.$emit('on-hide', val)
    },
    getAddressName () {
      return value2name(this.value, this.list)
    },
    onShadowChange (ids, names) {
      this.$emit('on-shadow-change', ids, names)
    }
  },
  data () {
    return {
      currentValue: this.value,
      showValue: false
    }
  },
  computed: {
    nameValue () {
      return value2name(this.currentValue, this.list)
    },
    labelClass () {
      return {
        'vux-cell-justify': this.$parent.labelAlign === 'justify' || this.$parent.$parent.labelAlign === 'justify'
      }
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (val.length && !/\d+/.test(val[0])) {
        const id = name2value(val, this.list).split(' ')
        if (id[0] !== '__' && id[1] !== '__') {
          this.currentValue = id
          return
        }
      }
      this.currentValue = val
    },
    show (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('update:show', val)
    }
  }
}
</script>
