<template>
  <li class="dropdown-option" :class="{'is-disabled': disabled}">
    <slot></slot>
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "DropdownItem",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped>
.dropdown-option.is-disabled * {
  /*color: #6c757d;*/
  color: darkgoldenrod;
  pointer-events: none;
  background-color: transparent;
}
</style>