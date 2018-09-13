import {
  getCityList
} from '../../api'
let state = {
  locationCity: '',
  provinces: [],
  cities: [],
  isShowCity: false

}
let mutations = {
  updataProvinces(state, payload) {
    state.provinces = payload
  },
  updataCities(state, payload) {
    state.cities = payload;
    state.isShowCity = true
  },
  hideCity(state, payload) {
    state.isShowCity = false
  }

}

let actions = {
  getCityList({
    commit
  }, payload) {
    console.log(payload)
    // 获取城市列表(如果传省份id返回城市列表，如果不传返回省份列表)
    if (payload) {
      getCityList(payload)
        .then(body => {
          commit('updataCities', body.data)
        })
    } else {
      getCityList({
          commit
        }, payload)
        .then(body => {
          commit('updataProvinces', body.data)
        })
    }

  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
