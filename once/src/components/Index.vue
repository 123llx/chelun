<template>
  <div class="indexs">
    <div class="wrap">
      <section>
        <div v-for="(item, index) in brand" :key="index">
          <ul>
            <p :id="index" class="letter">{{index}}</p>
            <li v-for="(value, key) in item" :key="key" @click='getMakeList(value.MasterID)'>
              <img :data-src="value.CoverPhoto" src='../assets/timg.jpg'>
              <span>{{value.Name}}</span>
            </li>
          </ul>

        </div>
      </section>
    </div>
    <aside @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">

      <span v-for="(item, index) in letters" :key="index">{{item}}</span>
    </aside>
    <div class="mark">{{letter}}</div>
    <MakeList></MakeList>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from "vuex";
  import MakeList from "./common/makeList";
  import lazyLoad from '../util/lazyLoad.js'
  export default {
    computed: {
      ...mapState({
        letters: state => state.index.letters,
        brand: state => state.index.brand,

        letter: state => state.index.letter,
        isShow: state => state.index.isShow
      })
    },
    components: {
      MakeList
    },
    methods: {
      ...mapActions({
        initState: "index/initState",
        getMakeList: "index/getMakeList"
      }),
      ...mapMutations({
        showLetter: 'index/showLetter',
        changeLetter: 'index/changeLetter'
      }),
      touchStart(e) {
        //中间遮罩
        document.querySelector('.mark').style.display = 'block'
        this.showLetter(true);
        let letter = e.target.innerHTML;
        console.log('letter...', letter, e.target, );
        if (this.letter != letter) {
          // 改变当前字母
          this.changeLetter(letter);
        }
      },
      touchMove(e) {
        //中间遮罩
        setTimeout(() => {
          document.querySelector('.mark').style.display = 'none'
        }, 2000)

        // console.log(e.touches);
        // 获取手指的位置
        let pageY = e.touches[0].pageY;

        let index = Math.floor((pageY - this.marginTop) / this.height);

        if (index < 0) {
          index = 0;
        } else if (index > this.letters.length - 1) {
          index = this.letters.length - 1;
        }
        if (this.letter != this.letters[index]) {
          // 查询id为当前字母的元素
          let ele = document.getElementById(this.letters[index]);
          let top = ele.offsetTop;
          // 当该元素距离顶部的高度赋给滚动元素的scorllTop实现滚动
          document.querySelector('.wrap').scrollTop = top;
          // 改变当前字母
          this.changeLetter(this.letters[index]);
        }

      },
      touchEnd() {
        this.showLetter(false);
      }
    },
    updated() {
      this.height = 0.4 * window.innerWidth / 750 * 100;

      this.marginTop =
        (window.innerHeight - this.letters.length * this.height) / 2;

      lazyLoad('.wrap')
    },
    mounted() {
      this.initState();

    }
  };

</script>

<style scoped scoped lang="scss">
  .indexs {
    height: 100%;
    position: relative;

    .mark {
      overflow: hidden;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      width: 100px;
      height: 100px;
      color: #fff;
      text-align: center;
      line-height: 100px;
      font-size: 0.6rem;
      display: none;
    }
  }

  .wrap {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }

  aside {
    position: fixed;
    top: 50%;
    right: 0.1rem;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-size: 0.24rem;
      color: #666;
      font-weight: 500;
      padding: 0.02rem 0.1rem;
      height: 0.4rem;
      box-sizing: border-box;
    }
  }

  ul {
    p {
      font-size: 0.28rem;
      line-height: 0.4rem;
      background: #f4f4f4;
      padding-left: 0.3rem;
      color: #aaa;
    }

    li {
      margin: 0 0.3rem;
      height: 1rem;
      box-sizing: border-box;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
    }

    img {
      height: 0.8rem;
    }

    span {
      font-size: 0.32rem;
      margin-left: 0.4rem;
    }
  }

  mark.active {
    display: none;
  }

</style>
