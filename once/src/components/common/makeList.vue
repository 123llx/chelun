<template>
  <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" ref="listBox" :class="isShowList?'masks active':'masks'">
    <section>
      <div>
        <ul v-for="(item,index) in makeList" :key='index'>

          <p class="title">{{item.GroupName}}</p>
          <router-link class="li" v-for="(value,key) in item.GroupList" :key='key' :to="{path:'/detail',query:{id:value.SerialID}}">
            <img v-lazy="value.Picture">
            <div>
              <p>{{value.AliasName}}</p>
              <p>{{value.DealerPrice}}</p>
            </div>
          </router-link>

        </ul>
      </div>
    </section>

  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  export default {
    computed: {
      ...mapState({
        makeList: state => state.index.makeList,
        isShowList: state => state.index.isShowList
      })
    },
    methods: {
      ...mapMutations({
        hideMakeList: "index/hideMakeList"
      }),
      touchstart(e) {
        this.touch = e.touches[0];

      },
      touchmove(e) {
        let touch = e.touches[0];
        this.offsetX = touch.pageX - this.touch.pageX;
        console.log(this.offsetX);
        if (this.offsetX > 0) {

          this.$refs.listBox.style = `transform:translate3d(${this.offsetX}px,0,0)`;
          // console.log(this.$refs.listBox)
        }
      },
      touchend() {
        this.$refs.makeList.style = ``;
        if (this.offsetX > 100) {
          this.hideMakeList();
        }
      },
      mounted() {
        // console.log(this.makeList)

      },
    }
  };

</script>

<style scoped lang='scss'>
  a {
    color: #ccc;
    text-decoration: none;
  }

  .masks {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    right: 0;
    top: 0;
    width: 75%;
    height: 100%;
    overflow: scroll;
    background: #fff;

    section {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;

      ul>p {
        margin-left: 1px;
        font-size: .28rem;
        line-height: .48rem;
        background: #f2f2f2;
        padding-left: .3rem;
        color: #717171;
      }

      ul>.li {
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;

        img {
          margin: 0 0.1rem 0 0.2rem;
          width: 1.8rem;
          height: 1.2rem;
        }

        div {
          display: inline-block;

          p:first-child {
            font-size: 0.34rem;
            color: #5f687a;
          }

          p:nth-child(2) {
            margin-top: 0.1rem;
            font-size: 0.28rem;
            color: red;
          }
        }
      }
    }

  }

  .masks.active {
    transform: translate3d(0, 0, 0);
    transition: transform .3s linear;
  }

</style>
