<template>
  <div class="wrap">
    <div class="scroll">
      <div>
        <router-link class="img" :to="{path:'/img',query:{id}}">
          <img :src="listMin.CoverPhoto">
        </router-link>
        <div class="info">
          <div>
            <p>{{listMin.market_attribute&&listMin.market_attribute.dealer_price}}</p>
            <p>指导价格：{{listMin.market_attribute&&listMin.market_attribute.official_refer_price}}</p>
          </div>
          <div class="action"><button>{{listMin.BottomEntranceTitle}}</button></div>
        </div>
        <div class="cart-list">
          <div class="type">
            <span @click="changeYear(item)" v-for="(item,index) in years" :key="index" :class="currentYear==item?'active':''">{{item}}</span>
          </div>
          <section>
            <div>
              <ul v-for="(item, index) in lists" :key="index">
                <p>{{index}}</p>
                <li v-for="(value, key) in item" :key="key">
                  <p>{{value.market_attribute.year+'款 '+value.car_name}}</p>
                  <p>{{`${value.max_power}马力${value.gear_num}档${value.trans_type}`}}</p>
                  <p>
                    <span>{{`指导价${value.market_attribute.dealer_price_min}`}}</span>
                    <span>{{value.market_attribute.official_refer_price}}起</span>
                  </p>
                  <button>询问底价</button>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
    <router-link class="bottom" :to="{path:'/quotation',query:{id}}">
      <p>询问低价</p>
      <p>本地经销商为你报价</p>
    </router-link>
  </div>

</template>

<script>
  import {
    mapState,
    mapActions,
    mapGetters,
    mapMutations
  } from "vuex";
  export default {
    data() {
      return {
        id: ''
      }
    },
    computed: {
      ...mapState({
        listMin: state => state.detail.listMin,
        currentYear: state => state.detail.currentYear
      }),
      ...mapGetters({
        years: "detail/years",
        lists: "detail/lists"
      })
    },
    methods: {
      ...mapActions({
        getDetaiData: "detail/getDetaiData"
      }),
      ...mapMutations({
        changeYear: "detail/changeYear"
      })
    },
    mounted() {
      this.getDetaiData(this.$route.query);
      this.id = this.$route.query.id;
      console.log(2)
      // console.log(this.$route.query.id)

    },beforeRouteEnter (to, from, next) {
      next()
      console.log(1)
      // ...
    },beforeRouteLeave (to, from, next) {
      next()

      console.log(3)
      // ...
    }
  };

</script>

<style scoped lang='scss'>
  .wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #eeeeee;

    >.scroll {
      width: 100%;
      height: 100%;
      overflow-y: scroll;

      div {
        // overflow-y: scroll;
      }
    }

    .img {
      // width: 100%;
      // height: 3.29rem;
      display: flex;
      position: relative;
      height: 3.29rem;
      overflow: hidden;

      img {
        // display: inline-block;
        // width: 100%;
        // height: 100%;
        // display: flex;
        width: 100%;
        top: 50%;
        // -webkit-transform: translateY(-50%);
        transform: translateY(-52%);
        position: absolute;
      }
    }

    .info {
      display: flex;
      width: 100%;
      padding: 0.36rem 0.2rem 0.3rem;
      background: #fff;
      margin-top: 0.1rem;

      p {
        font-size: 0.26rem;
        color: silver;

        &:nth-child(1) {
          font-size: 0.36rem;
          color: red;
          font-weight: 500;
        }
      }

      .action {
        position: relative;
        padding-top: 0.2rem;
        width: 50%;

        button {
          position: absolute;
          top: 0;
          right: 0;
          background: #00afff;
          color: #fff;
          border-radius: 0.1rem;
          font-size: 0.32rem;
          height: 0.7rem;
          width: 3.45rem;
          border: none;
          box-sizing: border-box;
          outline: none;
        }
      }
    }

    .cart-list {
      display: flex;
      flex-direction: column;

      section {
        // overflow-y: scroll;
        // height: 456px;
      }

      .type {
        flex: 1;
        border-top: 0.15rem solid #f4f4f4;
        padding: 0 0.3rem;
        font-size: 0.32rem;
        height: 0.77rem;
        line-height: 0.77rem;
        background: #fff;

        span {
          padding-right: 0.46rem;
          font-size: 0.32rem;
        }
      }

      ul>p {
        padding: 0 0.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.26rem;
        color: #999;
        background: #f4f4f4;
      }

      ul>li {
        padding: 0 0.2rem;
        border-bottom: 0.18rem solid #f4f4f4;
        background: #fff;
        overflow: hidden;

        p:nth-child(1) {
          padding: 0.26rem 0 0.18rem;
          font-size: 0.3rem;
          line-height: 1;
          color: #3d3d3d;
        }

        p:nth-child(2) {
          color: #bdbdbd;
          font-size: 0.26rem;
        }

        p:nth-child(3) {
          text-align: right;
          padding-bottom: 0.1rem;
          font-size: 0.24rem;
          color: #818181;

          span:nth-child(2) {
            font-size: 0.3rem;
            color: #ff2336;
            margin-left: 0.1rem;
          }
        }

        button {
          border: none;
          border-top: 1px solid #eee;
          width: 110%;
          height: .8rem;
          font-size: .32rem;
          color: #00afff;
          background: #fff;
          font-weight: 500;
          margin-left: -.3rem;
          outline: none;
        }
      }

      ul>li:last-child {
        border-bottom: 0;
      }
    }
  }

  .type>span.active {
    color: #3aacff;
  }

  .bottom {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    background: #3aacff;
    height: 1rem;
    color: #fff;
    text-align: center;
    text-decoration: none;
  }

  .bottom p:first-child {
    font-size: .32rem;
    margin-top: .12rem;
    font-weight: 500;
  }

  .bottom p:nth-child(2) {
    font-size: .24rem;
  }

</style>
