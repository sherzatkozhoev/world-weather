<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form__header">
      <h3 class="form__title">Choose a city</h3>
      <div class="form__description">To find city start typing and pick one from the suggestions</div>
    </div>
    <div class="form__body">
      <div class="form-group" :class="{ 'has-error': $v.value.$error }">
        <input
          class="form-group__input"
          type="text"
          placeholder="Search city"
          v-model.trim="$v.value.$model"
          @blur="$v.value.$touch()"
        >
        <div
          class="form-group__error"
          v-if="$v.value.$error"
        >Choose a city</div>
      </div>
    </div>
    <div class="form__footer">
      <div class="form__btn-group">
        <button class="btn" type="button" @click="onReset" :disabled="$v.$invalid">Clear</button>
      </div>
      <div class="form__btn-group">
        <button class="btn" type="button" @click="closeModal">Cancel</button>
        <button class="btn" type="submit">Add</button>
      </div>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AppForm',
  data: () => ({
    value: ''
  }),
  validations: {
    value: { required }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.$emit('submitForm', this.value)
      }
    },
    onReset () {
      this.value = ''
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header,
  &__body {
    margin-bottom: 50px;

    @include breakpoint-min(md) {
      margin-bottom: 65px;
    }
  }

  &__title {
    font-size: 2.8rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 15px;

    @include breakpoint-min(lg) {
      font-size: 3.2rem;
    }
  }

  &__description {
    color: #767676;
    font-size: 1.6rem;

    @include breakpoint-min(sm) {
      font-size: 1.8rem;
    }

    @include breakpoint-min(md) {
      font-size: 2rem;
    }

    @include breakpoint-min(lg) {
      font-size: 2.4rem;
    }
  }

  &__footer,
  &__btn-group {
    display: flex;
    flex-wrap: wrap;
  }

  &__footer {
    justify-content: space-between;
    margin-top: auto;

    > *:not(:last-child) {
      margin-right: 30px;
    }
  }

  &__btn-group .btn:not(:last-child) {
    margin-right: 30px;
  }
}

.form-group {
  margin-bottom: 30px;

  &__input {
    width: 100%;
    max-width: 100%;
    display: block;
    color: $color-black;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 0 0 15px;
    transition: .25s;
    outline: none;
    border: none;
    border-bottom: 1px solid $color-primary;

    @include breakpoint-min(sm) {
      font-size: 1.8rem;
    }

    @include breakpoint-min(md) {
      font-size: 2rem;
    }

    @include breakpoint-min(lg) {
      font-size: 2.4rem;
    }

    &[disabled] {
      opacity: .8;
      pointer-events: none;
    }

    @include placeholder {
      color: #C1C1C1;
    }

    .form-group.has-error & {
      border-color: $color-danger;
    }
  }

  &__error {
    color: $color-danger;
    margin-top: 10px;

    @include breakpoint-min(md) {
      font-size: 1.6rem;
    }
  }
}
</style>
