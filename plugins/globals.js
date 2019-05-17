import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.component('vue-markdown', VueMarkdown)
Vue.use(Element, { locale })
