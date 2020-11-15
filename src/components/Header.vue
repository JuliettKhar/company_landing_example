<template>
  <header class="header">
    <nav>
      <div class="columns is-mobile">
        <div class="column is-3-desktop is-3-mobile">
          <router-link to="" class="header__logo">
            <img src="/img/logo.svg" alt="logo" />
          </router-link>
        </div>
        <div class="column is-7-desktop is-6-mobile">
          <router-link to="" class="header__partner-link">
            <span>{{ $t(`header.partners`) }}</span>
            <img src="/img/arrow.svg" alt="arrow" class="is-hidden-mobile" />
          </router-link>
        </div>
        <div class="column is-2-desktop is-3-mobile">
          <div class="header__select">
            <LangSelect />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import LangSelect from './Dropdown'

export default {
  name: 'Header',
  components: {
    LangSelect
  }
}
</script>

<style scoped lang="scss">
.header {
  padding: 48px 0;

  &__logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: auto;
    margin: 0;

    @include mobile {
      display: flex;
      height: 100%;
      justify-content: center;
      margin: 0 auto;
    }

    img {
      height: 100%;
      width: auto;

      @include tablet-only {
        height: auto;
        width: auto;
      }

      @include mobile {
        height: 38px;
        width: auto;
      }
    }
  }

  &__partner-link {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    height: 100%;
    font-weight: 600;
    font-size: 16px;
    white-space: nowrap;
    color: #000;
    background: #fff;

    span {
      margin-right: 18px;

      @include mobile {
        margin-right: 0;
        font-size: 14px;
      }
    }

    @include tablet-only {
      justify-content: center;
    }

    @include mobile {
      padding: 12px 6px;
      color: #fff;
      background: #c3002f;
      justify-content: center;
      white-space: normal;
    }
  }

  &__select {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;

    @include mobile {
      align-items: center;
    }
  }
}
</style>
