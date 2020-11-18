import Vue from 'vue'
import {format} from '../../utils/date'
Vue.filter('date', format)