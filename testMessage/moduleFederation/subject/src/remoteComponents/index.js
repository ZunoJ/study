import { defineAsyncComponent } from 'vue'

export const list = defineAsyncComponent(() => import('lib_remote/list'))

export const xxxx = defineAsyncComponent(() => import('vue2lib_remote/xxxx'))
