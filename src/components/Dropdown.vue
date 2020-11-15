<template>
  <select v-model="selected" class="select" @change="changeLocale">
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'Dropdown',
  data() {
    return {
      selected: 'ru',
      options: [
        { text: 'Ru', value: 'ru' },
        { text: 'En', value: 'en' }
      ]
    }
  },
  methods: {
    changeLocale() {
      this.$i18n.locale = this.selected
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .lang-select__btn .button {
  border-color: transparent !important;
}

.select {
  display: inline-flex;
  border: none;
  width: 50px;
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  background: #fff;
}
</style>
