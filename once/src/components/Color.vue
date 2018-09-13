<template>
  <div class="color">
    <p @click="back">全部颜色</p>
    <div>
      <p class="c-type">
        <span v-for="(value,key) in  oColorTab" :key="key" @click="changeYear(value)">{{value}}</span>
      </p>
      <ul>
        <li v-for="(item,index) in  colorList" :key="index"><span :style="{backgroundColor:item.Value}"></span>{{item.Name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from "vuex";
  export default {
    computed: {
      ...mapState({
        oColorTab: state => state.img.oColorTab,
        oColorList: state => state.img.oColorList,
        colorList: state => state.img.colorList
      })
    },
    methods: {
      ...mapMutations({
        changeYear: "img/changeYear"
      }),
      ...mapActions({
        getColorList: "img/getColorList"
      }),
      back() {
        this.$router.back();
      }
    },
    mounted() {
      this.getColorList(this.$route.query.id);
    }
  };

</script>

<style scoped lang="scss">
  .color {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f4f4f4;

    >p {
      margin: 0.15rem 0;
      font-size: 0.34rem;
      color: #00afff;
      background: #fff;
      text-align: center;
      line-height: 0.8rem;
      height: 0.8rem;
    }

    >div {
      .c-type {
        margin-top: 0.15rem;
        padding-left: 0.2rem;
        font-size: 0.3rem;
        line-height: 0.76rem;
        height: 0.76rem;
        background: #fff;
        overflow-x: scroll;

        span {
          padding-right: 0.42rem;
        }

        span.active {
          color: #00afff;
        }
      }

      ul {
        margin-top: 0.15rem;
        padding: 0 0.2rem;
        overflow: hidden;
        background: #fff;

        li {
          float: left;
          width: 3.45rem;
          font-size: 0.32rem;
          line-height: 0.68rem;
          border: 1px solid #3aacff;
          box-sizing: border-box;
          margin: 0.2rem 0;
          border-radius: 0.05rem;

          &:nth-child(odd) {
            margin-right: 0.2rem;
          }

          span {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            margin-left: 0.2rem;
            vertical-align: -12%;
            background: #fe9210;
            box-sizing: border-box;
            border: 1px solid #818181;
            letter-spacing: 5px;
          }
        }
      }
    }
  }

</style>
