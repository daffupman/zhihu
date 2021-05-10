import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import axios from 'axios'

const icode = 'CE786FAC2911EE1A'
axios.defaults.baseURL = 'http://apis.imooc.com/api'
axios.interceptors.request.use(config => {
    config.params = { ...config.params, icode}
    if (config.data instanceof FormData) {
        config.data.append('icode', icode)
    } else {
        config.data = { ...config.data, icode}
    }
    store.commit('setLoading', true)
    return config
})
axios.interceptors.response.use(config => {
    store.commit('setLoading', false)
    return config
})
const app = createApp(App);
app.use(router).use(store).mount('#app')