<template>
  <div>
    <transition name="fadeUp">
      <div class="answer-wrap" v-show="showAnswer">
        <div class="top" @click="onClose">
          <span>请选择被保人目前或既往患有的病症</span>
          <i></i>
        </div>
        <div class="center">
          <div class="left">
            <ul>
              <li v-for="(item, i) in copyList" :key="i" :class="{active: currentIndex == i, hasVal: item.hasVal}" @click="onLeftClick(item, i)">
                {{ item.codeName }}
              </li>
            </ul>
          </div>
          <div class="right">
            <ul>
              <li v-for="(item, i) in rightList" :key="i" :class="{select: !!item.select}" @click="onRightClick(item, i)">
                {{ item.codeName }}
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div class="left" @click="onSelectedClick">
            <img src="./images/icon_2.png" alt="">
            <div class="left-text">
              <span>已选择</span>
              <span class="num">{{ selectList.length }}</span>
              <span> 项，最多可选择 10 项</span>
            </div>
          </div>
          <div class="right" @click="onNext">下一步</div>
        </div>
        <div>
          <transition name="x-mask">
            <div class="mask" v-show="showSelected"></div>
          </transition>
          <div class="list-box" v-show="showSelected || delay300" @click.stop="onSelectedClick">
            <transition name="fadeDown">
              <ul v-show="showSelected"  @click.stop="onStop">
                <li v-for="(item, i) in selectList" :key="i">
                  <div class="left">{{ item.codeName }}</div>
                  <div class="right" @click="onDelSelected(item, i)">
                    <img src="./images/icon_1.png" alt="">
                  </div>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadeRight">
      <div class="talk-box" v-show="showTalkBox">
        <div class="top" @click="onTalkBack">
          <span>智能核保小安</span>
          <i></i>
        </div>
        <div class="talk" ref="talk">
          <img class="xiaoan" src="./images/img1.png" alt="">
          <div class="talk-item talk-left">嗨！您好，我是华安智能核保小安！</div>
          <div class="talk-item talk-left">
            <div class="select-title">
              <span class="left">您已选择了被保人存在如下情况</span>
              <span class="right" @click="onClear">重新选择</span>
            </div>
            <div class="select-list">
              <div class="select-item" v-for="(item,i) in selectList" :key="i">
                {{ i + 1 }}、 {{ item.codeName }}
              </div>
            </div>
          </div>
          <div class="talk-item talk-left">我需要进一步了解被保人情况，请如实回答下列问题~</div>
          <div class="quest-big-box">
            <div class="quest-box" v-for="(item1,i) in questList" :key="i">
              <div class="quest-title">
                <span>就以下情况</span>
                <span class="num">{{ i + 1 }}</span>
                <span>进行提问</span>
              </div>
              <div class="quest-list" v-for="(item2,j) in item1" :key="j">
                <div class="list-quest talk-item talk-left">
                  <div class="list-content">{{ item2.codeName }}</div>
                  <div class="list-btns">
                    <div class="btns-item" @click="onBtnsClick({ item2, index1: i, choiceResult: '1'})">
                      <div class="btn">{{ item2.answersYes }}</div>
                    </div>
                    <div class="btns-item" @click="onBtnsClick({ item2, index1: i, choiceResult: '0'})">
                      <div class="btn">{{ item2.answersNo }}</div>
                    </div>
                  </div>
                </div>
                <div class="list-answer" v-if="item2.choiceResult">
                  <div class="talk-item talk-right">{{ item2.choiceResult == '1' ? item2.answersYes : item2.answersNo }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <my-dialog v-model="showResult">
      <div class="dialog-result">
        <div class="close" @click="showResult = false">
          <img src="./images/icon_4.png" alt="">
        </div>
        <div class="title">{{ result.title }}</div>
        <div class="desc" v-if="resultKey == 'pass' && extraRequest.length">{{ result.desc2 }}</div>
        <div class="desc" v-else>{{ result.desc }}</div>
        <div class="extra-list" v-if="resultKey == 'pass' && extraRequest.length">
          <div class="extra-item" v-for="(item,i) in extraRequest" :key="i.code">{{ item.extraRequest }}</div>
        </div>
        <img class="img" v-else :src="result.img" alt="">
        <div class="btn" @click="onResultBtn">{{ result.btnText }}</div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import myDialog from '../myDialog'
const _result = {
  fail: {
    title: '核保失败',
    desc: '很抱歉您提供的健康信息无法满足投保条件。',
    img: require('./images/img2.png'),
    btnText: '选择其他保障'
  },
  pass: {
    title: '核保通过',
    desc: '感谢您提供的被保人健康信息，现在可以继续投保了。',
    desc2: '感谢您提供的被保人健康信息，本次投保健康评估结果如下：',
    img: require('./images/img3.png'),
    btnText: '立即投保'
  }
}

export default {
  name: "answer",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showAnswer: false,
      showTalkBox: false, //开始问答页面显示变量
      currentIndex: 0,  //左侧列表当前下标
      showSelected: false,
      copyList: [], //深拷贝后的数组
      delay300: false, ////滑入时有动画, 滑出时没动画, 为了有动画, 只能新增个变量延时0.3秒控制
      resultKey: '',
      showResult: false, //审核结果弹窗
      questList: [], //下一步时问答列表初始化时默认只展示一条数据
    };
  },
  computed: {
    rightList() {
      const { currentIndex, copyList } = this;
      if (copyList[currentIndex] && copyList[currentIndex].detailCategoryList && copyList[currentIndex].detailCategoryList.length) {
        return copyList[currentIndex].detailCategoryList.map(item => ({ ...item }))
      }
      return []
    },
    selectList() {
      const { copyList } = this
      const _arr = []
      copyList.forEach(item => {
        let _hasVal = false
        if (item.detailCategoryList && item.detailCategoryList.length) {
          item.detailCategoryList.map(item2 => {
            if (item2.select) {
              _arr.push(item2)
              _hasVal = true
            }
          })
        }
        item.hasVal = _hasVal
      })
      return _arr
    },
    extraRequest() { //责任除外列表, 如果选择了并且最终通过了就展示出来, 失败不展示
      const _arr = []
      this.questList.map(item => {
        item.map(item1 => {
          if (item1.extraRequest && item1.extraRequestFlag === item1.choiceResult) _arr.push({...item1})
        })
      })
      return _arr
    },
    result() {
      return _result[this.resultKey] || {}
    }
  },
  methods: {
    onLeftClick(item, i) {
      this.currentIndex = i;
    },
    onRightClick(item, i) {
      const { copyList, currentIndex } = this
      if (this.selectList.length >= 10) {
        if (item.select) {
          copyList[currentIndex].detailCategoryList[i].select = false
        }
        return
      }
      copyList[currentIndex].detailCategoryList[i].select = !item.select
    },
    onSelectedClick() {
      if (!this.selectList.length) return
      if (this.showSelected) {
        this.showSelected = false
        this.onDelay()
      } else {
        this.delay300 = true
        this.showSelected = true
      }
    },
    onDelay() { //延时0.3秒让动画结束后再隐藏
      setTimeout(() => this.delay300 = false, 300)
    },
    onTalkBack() {
      this.questList = []
      this.showTalkBox = false
    },
    onNext() { //下一步默认只显示第一条数据
      if (!this.selectList.length) return
      this.questList = [
        [{...this.selectList[0].questionList[0]}]
      ]
      this.showTalkBox = true
    },
    onResultBtn() {
      if (this.resultKey == 'fail') { //失败
        this.$emit('fail')
        this.onClose()
      } else if (this.resultKey == 'pass') { //通过
        this.$emit('submit', this.questList)
      }
    },
    onDelSelected(item, i) {
      item.select = !item.select
    },
    onBtnsClick(option) {
      const { selectList, questList } = this
      const { item2, index1, choiceResult } = option //item2:小数组item   index1大数组index 
      const result = choiceResult == '1' ? item2.answerYesResult : item2.answerNoResult
      if (item2.select) return
      if (result == 'fail') { //已选择列表中任何一个fail都视为不通过
        this.resultKey = 'fail'
        this.showResult = true
        return
      } else if (result == 'pass') { //已选择列表中pass算当前项通过, 要大数组的所有当前项都通过才算通过
        item2.select = true
        item2.choiceResult = choiceResult
        item2.result = choiceResult == '1' ? item2.answerYesResult : item2.answerNoResult
        if (index1 == selectList.length - 1) { //大数组最后一项的pass就属于全部通过
          setTimeout(() => { //先显示出回答"是",页面滚动到底部后再弹框出来
            this.resultKey = 'pass'
            this.showResult = true
          }, 100)
        } else { //继续找下一个数组的第一个问题
          questList.push([{...selectList[index1 + 1].questionList[0]}])
        }
      } else {
        item2.select = true
        item2.choiceResult = choiceResult
        item2.result = choiceResult == '1' ? item2.answerYesResult : item2.answerNoResult
        const _item = selectList[index1].questionList.find(item => {
          return item.code == item2.result
        })
        if (_item) {
          questList[index1].push({..._item})
        } else { //找不到属于后台数据异常, 不给通过
          this.resultKey = 'fail'
          this.showResult = true
        }
      }
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$refs.talk.scrollTop = this.$refs.talk.scrollHeight
      })
    },
    onClear() { //重新选择清空数据
      this.showTalkBox = false
      setTimeout(() => {
        this.copyList = this.copyList.map(item => {
          if (item.detailCategoryList && item.detailCategoryList.length) {
            item.detailCategoryList.map(item2 => item2.select = false)
          }
          return { ...item }
        })
      }, 300)
    },
    onStop() { //遮罩层在div下面导致无点击事件, 为了阻止冒泡
      return
    },
    onClose() {
      this.showAnswer = false;
      this.$emit("input", this.showAnswer);
      this.$refs.content && (this.$refs.content.scrollTop = 0)
      this.showTalkBox = false;
      this.showSelected = false;
      this.resultKey = ''
      this.showResult = false
      this.questList = []
      this.currentIndex = 0
    },
    deepClone(data) { //深拷贝
      let type = Object.prototype.toString.call(data)
      let obj
      if (type == '[object Array]') obj = []
      else if (type == '[object Object]') obj = {}
      else return data
      if (type == '[object Array]') {
        data.map(item => obj.push(this.deepClone(item)))
      } else if (type == '[object Object]') {
        Object.keys(data).map(item => obj[item] = this.deepClone(data[item]))
      }
      return obj
    }
  },
  watch: {
    value: {
      handler(v) {
        this.showAnswer = v;
        if (v && this.list && this.list.length) { //answer整个组件每次重新显示都把数据初始化
          this.copyList = this.deepClone(this.list)
        }
      },
      immediate: true
    },
    list(v) {
      if (v) {
        this.copyList = this.deepClone(v)
      }
    },
    selectList(v) { //选中列表清空后自动收起列表
      if (!v.length) {
        this.showSelected = false
        this.onDelay()
      }
    }
  },
  mounted() {
    // this.showTalkBox = true
  },
  components: {
    myDialog
  }
};
</script>

<style scoped src="./index.scss"></style>