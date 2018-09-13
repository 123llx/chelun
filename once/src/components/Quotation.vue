<template>
  <div>
    <div class="wrap">
      <header>
        <p>可向多个商家咨询最低价，商家及时回复</p>
      </header>
      <div class="content">
        <button @click="showCity(true)">当前选择：{{currentCity?currentCity:city.name+city.id}}</button>
      </div>
      <footer>
        <button>询最低价</button>
      </footer>
   
    </div>
       <citySelect :class=" isShowCity?'active':''"></citySelect>
  </div>
</template>

<script>
  import citySelect from './common/citySelect.vue';
  import {
    mapState,
    mapMutations
  } from 'vuex';
  export default {
    computed: {
      ...mapState({
        isShowCity: state => state.quotation.isShowCity,
        currentCity: state => state.quotation.currentCity,
        city: state => state.quotation.city
      })
    },
    methods: {
      ...mapMutations({
        showCity: 'quotation/showCity'
      })
    },
    components: {
      citySelect
    }
  }

</script>

<style scoped lang="scss">
  //   <header>
  //         <p>可向多个商家咨询最低价，商家及时回复</p>
  //       </header>
  // <div class="content"></div>
  // <footer>
  //   <button>询最低价</button>
  // </footer> 
  .wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: .32rem;
    display: flex;
    flex-direction: column;
    position: relative;

    header {
      height: .6rem;
      line-height: .6rem;
      width: 100%;
      background: #79cd92;
      text-align: center;
      z-index: 99;

      p {
        color: #fff;
        font-size: .3rem;
        display: inline-block;
      }
    }

    .content {
    flex: 1;
    width: 100%;
    height: auto;
    background: #f4f4f4;
    overflow-y: scroll;

    }

    footer {
      width: 100%;
      z-index: 99;
      height: 1rem;
      line-height: 1rem;
      position: absolute;
      bottom: 0;
      left: 0;

      button {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background: #3aacff;
        text-align: center;
        font-size: .34rem;
        color: #fff;
        outline: none;
        border: none;
      }
    }
  }

</style>
