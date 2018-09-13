import {
  getDetailList
} from '../../api/index';

let state = {
  listMin: [],
  list: [],
  currentYear: '全部',
  // detailID: ''
}
let getters = {
  years(state) {
    if (!state.list.list) {
      return [];
    }
    let arr = (state.list.list).map(item => {
      return item.market_attribute.year;
    })
    let types = new Set(arr)
    return ['全部', ...types];
  },
  lists(state) {
    if (!state.list.list) {
      return [];
    }
    // 把排量和吸气类型相同的数据做个合并
    function merge(arr) {
      let types = [];
      let obj = {};
      // console.log('arr..', arr);
      arr.forEach(item => {
        let type = item.exhaust_str + '/' + item.max_power_str + ' ' + item.inhale_type;
        if (types.indexOf(type) == -1) {
          types.push(type);
          obj[type] = [item];
        } else {
          obj[type].push(item);
        }
      })
      return obj;
    }

    if (state.currentYear == '全部') {
      return merge(state.list.list)
    } else {
      return merge(state.list.list.filter(item => {
        return item.market_attribute.year == state.currentYear;
      }))
    }
  }

}
let mutations = {
  // 改变年份
  changeYear(state, payload) {
    state.currentYear = payload;
    // alert(1)
    console.log(payload)
  },
  updateList: (state, payload) => {
    //顶部图片数据
    state.listMin = payload
    //处理列表数据
    //    console.log(payload.list)

    //1.按照年份划分数据 降序 1
    payload.list.sort((a, b) => {
      //a,b分别是数组中的每一项
      if (b.market_attribute.year != a.market_attribute.year) {
        return b.market_attribute.year - a.market_attribute.year
      } else {
        // 按照排量排序 升序
        if (b.exhaust_str > a.exhaust_str) {
          return -1;
        } else if (b.exhaust_str < a.exhaust_str) {
          return 1;
        } else {
          // 按照功率排序 升序
          if (b.max_power_str > a.max_power_str) {
            return -1;
          } else if (b.max_power_str < a.max_power_str) {
            return 1;
          } else {
            // 按照指导价格排序 升序
            if (b.market_attribute.dealer_price_min > a.market_attribute.dealer_price_min) {
              return -1;
            } else {
              return 1
            }
          }
        }
      }
    })
    state.list = payload
    // console.log(payload)
  }
}
let actions = {
  getDetaiData: ({
    commit
  }, payload) => {
    // state.detailID = payload.id
    getDetailList(payload.id).then(body => {
      commit('updateList', body.data);
    })

  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
