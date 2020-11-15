<template>
  <div>
    <div class="shapes">
      <div class="shapes-1">
        <div class="circle"></div>
        <img src="/img/shape.svg" alt="" class="shape" />
        <img src="/img/triangle.svg" alt="" class="triangle" />
        <img src="/img/vawes.svg" alt="" class="waves" />
      </div>
      <div class="shapes-2">
        <div class="circle"></div>
        <img src="/img/shape.svg" alt="" class="shape" />
        <img src="/img/triangle.svg" alt="" class="triangle" />
        <img src="/img/vawes.svg" alt="" class="waves" />
      </div>
    </div>
    <div class="container">
      <Header />
      <main>
        <div class="columns is-desktop">
          <div class="column">
            <p class="main__overview">
              {{ $t(`main.development`) }}<br />
              {{ $t(`main.offer`) }}
            </p>
            <img class="main__img" src="/img/main-image.png" alt="main image" />
          </div>
          <div class="column">
            <div class="main__content-wrapper">
              <div class="main__content">
                <div class="main__title">
                  <div class="text">
                    {{ $t(`main.products`) }}
                    <ul>
                      <li class="word">{{ $t(`main.backend`) }}</li>
                      <li class="word">{{ $t(`main.frontend`) }}</li>
                      <li class="word">{{ $t(`main.ux`) }}</li>
                      <li class="word">{{ $t(`main.mobile`) }}</li>
                    </ul>
                  </div>
                </div>
                <div class="main__presentation">
                  <p class="main__presentation-description">
                    {{ $t(`main.presentation`) }}
                  </p>
                  <a
                    href="/presentation/presentation.pdf"
                    class="main__presentation-download"
                    target="_blank"
                  >
                    <img src="/img/pdf-icon.svg" alt="pdf icon" />
                    <span>{{ $t(`main.download`) }}</span>
                  </a>
                </div>
                <form action="#" class="main__presentation-form">
                  <span>{{ $t(`main.email`) }}</span>
                  <div class="field has-addons">
                    <div class="control">
                      <label>
                        <input
                          v-model="email"
                          class="input is-danger"
                          type="email"
                          placeholder="email"
                        />
                      </label>
                      <div v-if="formHasError" class="has-text-danger mt-2 form__error">
                        {{ $t(`main.validation`) }}
                      </div>
                    </div>
                    <div class="control">
                      <a class="button is-danger" @click="submitForm">
                        {{ $t(`main.downloadButton`) }}
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'

export default {
  name: 'Main',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      email: '',
      formHasError: false,
      timer: '',
      rotateCounter: 0,
      rotationId: null,
      wordArray: [],
      currentWord: 0
    }
  },
  computed: {
    isValidEmail() {
      const re = new RegExp('^[a-zA-Z0-9_\.\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,6}$')
      return re.test(this.email)
    }
  },
  mounted() {
    this.rotateShapes()
    this.animateTitle()
  },
  beforeDestroy() {
    clearInterval(this.timer)
    cancelAnimationFrame(this.rotationId)
  },
  methods: {
    submitForm() {
      if (!this.isValidEmail) {
        this.formHasError = true
      }
    },
    rotateShapes() {
      const rotate = document.querySelectorAll('img.triangle, img.waves')

      rotate.forEach(item => {
        item.style.transform = `rotate(${
          this.rotateCounter > 360
            ? ((this.rotateCounter = 0), cancelAnimationFrame(this.rotationId))
            : (this.rotateCounter += 0.1)
        }deg)`
      })

      this.rotationId = requestAnimationFrame(this.rotateShapes)
    },
    animateTitle() {
      const words = document.getElementsByClassName('word')
      words[this.currentWord].style.opacity = 1
      words.forEach(word => this.splitLetters(word))
      this.timer = setInterval(() => this.changeWord(), 3000)
    },
    changeWord() {
      let cw = this.wordArray[this.currentWord]
      let nw =
        this.currentWord === this.wordArray.length - 1
          ? this.wordArray[0]
          : this.wordArray[this.currentWord + 1]

      for (let i = 0; i < cw.length; i++) {
        this.animateLetterOut(cw, i)
      }

      for (let i = 0; i < nw.length; i++) {
        nw[i].className = 'letter behind'
        nw[0].parentElement.style.opacity = 1
        this.animateLetterIn(nw, i)
      }

      this.currentWord = this.currentWord === this.wordArray.length - 1 ? 0 : this.currentWord + 1
    },
    animateLetterOut(cw, i) {
      setTimeout(() => {
        cw[i].className = 'letter out'
      }, i * 80)
    },
    animateLetterIn(nw, i) {
      setTimeout(() => {
        nw[i].className = 'letter in'
      }, 340 + i * 80)
    },
    splitLetters(word) {
      const content = word.innerHTML
      word.innerHTML = ''
      const letters = []
      content.split('').forEach((w, i) => {
        const letter = document.createElement('span')
        if (w === ' ') {
          const letter = document.createElement('span')
          letter.innerHTML = '&#8194;'
          word.appendChild(letter)
          letters.push(letter)
        }

        letter.className = 'letter'
        letter.innerHTML = content.charAt(i)
        word.appendChild(letter)
        letters.push(letter)
      })

      this.wordArray.push(letters)
    }
  }
}
</script>

<style scoped lang="scss">
main {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
}

.main {
  &__overview {
    margin-bottom: 10px;
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 22px;
    letter-spacing: -0.05em;
    text-align: left;
    color: #000;

    img {
      display: flex;

      @include tablet-only {
        max-width: 290px;
      }
    }

    @include tablet-only {
      text-align: center;
    }

    @include mobile {
      text-align: center;
      font-size: 16px;
    }
  }

  &__img {
    margin-right: auto;
    display: flex;
    max-width: 100%;

    @include tablet-only {
      max-width: 80%;
      margin: 0 auto;
    }

    @include mobile {
      margin: 0 auto;
      max-width: 230px;
    }
  }

  &__title {
    position: relative;
    margin-bottom: 50px;
    font-weight: 900;
    font-size: 30px;
    text-align: left;
    letter-spacing: -0.05em;
    color: #333333;

    @include tablet-only {
      font-size: 20px;
      text-align: center;
    }

    @include mobile {
      font-size: 20px;
      text-align: center;
    }

    ul {
      display: inline-flex;
      position: relative;
      width: 76%;

      @include desktop-only {
        width: 100%;
      }

      @include tablet-only {
        justify-content: center;
        min-width: 220px;
        width: 100%;
      }

      @include mobile {
        display: flex;
        justify-content: center;
        font-size: 20px;
        width: 100%;
        height: auto;
      }

      li {
        position: absolute;
        top: -34px;
        height: auto;

        @include tablet-only {
          display: flex;
          top: -20px;
          font-size: 20px;
        }

        @include mobile {
          display: flex;
          justify-content: center;
          top: 0;
          font-size: 20px;
          height: 30px;
        }
      }
    }
  }

  &__presentation {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 50px;

    @include tablet-only {
      flex-wrap: wrap;
      justify-content: center;
    }

    @include mobile {
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 40px;
    }
  }

  &__presentation-description {
    margin: 0 12px 0 0;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    font-size: 18px;
    text-align: left;
    max-width: 100%;
    color: #000000;

    @include tablet-only {
      margin: 0 0 14px 0;
      max-width: 348px;
      text-align: center;
    }

    @include mobile {
      margin: 0 0 14px 0;
      max-width: 348px;
      font-size: 14px;
      text-align: center;
    }
  }

  &__presentation-download {
    display: flex;
    align-items: center;
    padding: 14px 26px;
    min-width: 240px;
    background: #000;

    @include tablet-only {
      min-width: 300px;
    }

    @include mobile {
      min-width: 90%;
    }

    span {
      width: 100%;
      color: #fff;
      font-family: 'Raleway', sans-serif;
      white-space: nowrap;
    }

    img {
      margin-right: 10px;
    }
  }

  &__presentation-form {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;

    @include tablet-only {
      flex-wrap: wrap;
      justify-content: center;
    }

    @include mobile {
      flex-wrap: wrap;
      justify-content: center;
    }

    span {
      display: inline;
      margin: 0 22px 0 0;
      text-align: left;
      font-family: 'Raleway', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #000000;

      @include tablet-only {
        display: inline-block;
        margin: 0 0 14px 0;
        font-size: 14px;
      }

      @include mobile {
        display: inline-block;
        margin: 0 0 14px 0;
        font-size: 14px;
      }
    }
  }

  &__content {
    margin: 0 0 48px 0;

    &-wrapper {
      align-items: center;
      display: flex;
      height: 100%;
      max-width: 100%;

      @include tablet-only {
        max-width: 490px;
        margin: 0 auto;
      }
    }
  }

  &__animation {
    &.is-active {
      display: inline-flex;
      justify-content: center;
      position: relative;
      top: 0;
      opacity: 1;
      transition: opacity 1s, top 1s;
    }
  }
}

.form__error {
  position: absolute;
  left: 56%;
  width: 100%;
  transform: translateX(-50%);
}

::v-deep .field.has-addons {
  position: relative;
  width: 100%;
  font-family: 'Raleway', sans-serif;

  @include tablet-only {
    width: 60%;
  }

  @include mobile {
    width: 90%;
  }
}

.field.has-addons .control:not(:last-child) {
  width: 100%;
}

.shapes {
  position: absolute;
  width: 100%;
  height: 80%;
  display: flex;
  top: 16%;
  left: 0;
  flex-wrap: wrap;
}

.shapes-1,
.shapes-2 {
  position: relative;
  width: 100%;
  height: 50%;
  z-index: 0;

  .waves {
    width: 60px;
  }

  .triangle {
    position: absolute;
    left: 68%;
    height: 120px;

    @include mobile {
      left: 5%;
      top: 40%;
    }
  }

  .circle {
    position: absolute;
    bottom: 0;
    left: 40px;
    width: 90px;
    height: 90px;
    border-radius: 100%;
    border: 1px solid #5aa7b2;
    animation: move-shapes-gorizontal 5s linear infinite alternate;
  }

  .shape {
    animation: move-shapes 4s linear infinite alternate;

    @include mobile {
      left: 0;
    }
  }
}

.shapes-2 {
  height: 50%;

  .waves {
    position: absolute;
    right: 20%;
    bottom: 10%;

    @include mobile {
      right: 70%;
    }
  }

  .triangle {
    position: absolute;
    left: 50%;
  }

  .circle {
    position: absolute;
    left: 50%;
    bottom: 10%;
    animation: move-shapes 4s linear infinite alternate;
  }

  .shape {
    position: absolute;
    left: 0;
    animation: move-shapes 5s linear infinite alternate;
  }
}
</style>
