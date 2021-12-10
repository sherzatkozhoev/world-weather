<template>
  <transition name="modal" appear>
    <div class="modal" @click="$emit('closeModal')">
      <div class="modal__content" @click.stop>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal'
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(#0B0B0B, .5);
  z-index: $zindex-modal;

  &__content {
    width: 100%;
    padding: 25px 20px;
    max-height: 100%;
    max-width: 750px;
    min-height: 360px;
    position: relative;
    border-radius: 4px;
    background-color: $color-white;
    box-shadow: 0 16px 24px rgba(0, 0, 0, .14), 0 6px 30px rgba(0, 0, 0, .12), 0 8px 10px rgba(0, 0, 0, .2);
    transition: .3s;
    overflow: auto;

    @include breakpoint-min(sm) {
      padding: 24px;
      min-height: 397px;
    }

    .modal-enter &,
    .modal-leave-to & {
      transform: translateY(-50px);
      opacity: 0;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity .4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
