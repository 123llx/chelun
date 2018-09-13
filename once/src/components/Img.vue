<template>
  <div class="content">
    <div class="car-img">
      <div class="tit">
        <router-link class="p" :to="{path:'/color',query:{id:SerialID}}"><span>颜色</span></router-link>
        <router-link class="p" :to="{path:'/type',query:{id:SerialID}}"><span>车款</span></router-link>

      </div>
      <div class="list">
        <ul v-for="(item,index) in oImgList" :key="index">
          <li v-for="(value,key) in item.List" :key="key">
            <img v-lazy="value.Url">
            <div v-if="key==0">
              <p>{{item.Name}}</p>
              <p>{{item.Count}}张</p>
            </div>
          </li>
        </ul>

      </div>


    </div>

  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        SerialID: ""
      };
    },
    computed: {
      ...mapState({
        oImgList: state => state.img.oImgList
      })
    },
    methods: {
      ...mapActions({
        getImgList: "img/getImgList"
      })
    },
    mounted() {
      this.getImgList(this.$route.query.id);
      this.SerialID = this.$route.query.id;
    }
  };

</script>

<style scoped lang="scss">
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 0.32rem;
    background: #f4f4f4;

    .car-img {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .tit {
        position: fixed;
        background: #fff;
        top: 0;
        width: 100%;
        height: 0.8rem;
        display: flex;
        align-items: center;

        .p {
          flex: 1;
          text-align: center;
          color: #454545;
          display: inline-block;

          span::after {
            content: "";
            display: inline-block;
            padding-top: 0.16rem;
            padding-right: 0.16rem;
            border-top: 2px solid #ccc;
            border-right: 2px solid #ccc;
            -webkit-transform: rotate(135deg);
            transform: rotate(135deg);
            margin-left: 0.2rem;
            vertical-align: 5%;
          }
        }
      }
    }

    .list {
      flex: 1;
      width: 100%;
      background: #fff;
      border-bottom: 0.4rem solid #f4f4f4;
      overflow: hidden;
      position: absolute;
      top: 0.98rem;
      bottom: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      display: flex;
      flex-wrap: wrap;

      ul {
        display: flex;

        li {
          position: relative;
          float: left;
          margin-right: 0.06rem;
          margin-bottom: 0.06rem;
          width: 2.46rem;
          height: 2.46rem;
          padding: 0;

          &:nth-child(3n + 3) {
            margin-right: 0;
          }

          img {
            width: 100%;
            height: 100%;
          }

          div {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            background: rgba(56, 90, 130, 0.5);

            p {
              color: #fff;
              display: block;
            }

            p:first-child {
              font-size: 0.28rem;
              margin-top: 0.8rem;
            }
          }
        }
      }
    }
  }

</style>
