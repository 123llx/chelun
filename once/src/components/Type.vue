<template>
  <div>
    <div class="back">
      <p @click="back">全部车款</p>
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
                <span>{{value.market_attribute.official_refer_price}}</span>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
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
        id: ""
      };
    },
    computed: {
      ...mapState({
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
      }),
      back() {
        this.$router.back();
      }
    },
    mounted() {
      this.getDetaiData(this.$route.query);
      this.id = this.$route.query.id;
      // console.log(this.$route.query.id)
    }
  };

</script>

<style scoped lang="scss">
  .back {
    width: 100%;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.32rem;

    p {
      width: 100%;
      height: 100%;
      color: #00afff;
    }
  }

  .cart-list {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;

    section {
      height: 600px;
      overflow: hidden;
      overflow-y: scroll;

      div {
        //  overflow-y: scroll;
      }
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
      // border-bottom: 0.18rem solid #f4f4f4;
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
    }

    ul>li:last-child {
      border-bottom: 0;
    }
  }

  .type>span.active {
    color: #3aacff;
  }

</style>
