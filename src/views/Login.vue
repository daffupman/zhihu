<template>
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
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RuleProps } from '@/views/ValidateInput.vue'
import ValidateForm from '@/views/ValidateForm.vue'

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm,
  },
  setup() {
    const emailVal = ref('')
    const router = useRouter()
    const store = useStore()
    const passwordVal = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const emailRules: RuleProps = [
      {type: 'required', message: '电子邮箱地址不能为空'},
      {type: 'email', message: '电子邮箱地址格式不正确'}
    ]
    const passwordRules: RuleProps = [
      {type: 'required', message: '密码不能为空'},
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(data => {
          router.push('/')
        }).catch(e => {
          console.log(e)
        })
      }
    }

    return {
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

<style scoped>

</style>