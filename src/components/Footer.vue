<template>
  <footer class="footer">
    <ul class="footer__contacts">
      <li class="footer__contact">{{ $t(`footer.contactUs`) }}</li>
      <li class="footer__contact-call">
        <img src="/img/tel.svg" alt="telephone" />
        <a href="tel:+79778186689" class="">+7 (977) 818-66-89</a>
      </li>
      <li class="footer__contact-mail">
        <img src="/img/mail.svg" alt="email" />
        <a href="mailto:work@softlex.pro">work@softlex.pro</a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  border-top: 1px solid #f2f2f2;
  z-index: 0;
  background: transparent;

  @include tablet-only {
    border-top: none;
  }

  @include mobile {
    border-top: none;
  }

  &__contacts {
    display: flex;
    max-width: 100%;

    @include tablet-only {
      justify-content: center;
      border-top: none;
    }

    @include mobile {
      flex-wrap: wrap;
      max-width: 194px;
      margin: 0 auto;
      border-top: none;
    }

    li {
      @include mobile {
        justify-content: center;
      }

      &:first-child {
        margin: 0 48px 0 0;
        font-family: 'Raleway', sans-serif;

        @include mobile {
          margin: 0 0 10px 0;
        }
      }

      &:nth-child(2) {
        margin-right: 38px;

        @include mobile {
          margin-right: 0;
        }
      }
    }
  }

  &__contact-call,
  &__contact-mail {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;

    a {
      color: #000000;
      white-space: nowrap;
    }

    img {
      margin-right: 14px;
    }
  }
}
</style>
