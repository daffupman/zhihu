<template>
  <div class="container">
    <global-header :user="user"/>
    <column-list :list="list"/>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
                        placeholder="请输入邮箱地址"
                        type="text"
                        v-model="emailVal"/>
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password"
                        placeholder="请输入密码"
                        :rules="passwordRules"
                        v-model="passwordVal"/>
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, {ColumnProps} from '@/views/ColumnList.vue'
import GlobalHeader, {UserProps} from '@/views/GlobalHeader.vue'
import ValidateInput, {RuleProps} from '@/views/ValidateInput.vue'
import ValidateForm from '@/views/ValidateForm.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: 'wangzhengjin'
}

const mockData: ColumnProps[] = [{
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧'
    // , avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test4专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 5,
    title: 'test5的专栏',
    description: '这是的test5专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 6,
    title: 'test6的专栏',
    description: '这是的test6专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const inputRef = ref<any>()
    const emailVal = ref('')
    const passwordVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailRules: RuleProps = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '电子邮箱地址格式不正确' }
    ]
    const passwordRules: RuleProps = [
      { type: 'required', message: '密码不能为空' },
    ]
    const onFormSubmit = (result: boolean) => {
      console.log("result",result)
    }

    return {
      list: mockData,
      user: currentUser,

      emailRef,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,

      onFormSubmit,
    }
  }
})

</script>

<style>
</style>
