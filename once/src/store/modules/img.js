import {
  getImgList,
  getColorList
} from '../../api/index.js'
let state = {
  oImgList: [],
  oColorTab: [],
  oColorList: [],
  colorList: []
}

let mutations = {
  //处理图片列表的地址
  imgList: (state, payload) => {
    payload.map((item, index) => {
      item.List.map((value, key) => {
        value.Url = value.Url.slice(0, -7) + '3.jpg'
      })

    })
    state.oImgList = payload;

    // console.log(state.oImgList)
  },
  upColor: (state, payload) => {
    let arr = [];
    for (var i in payload) {
      arr.push(i)
    }
    arr.sort((a, b) => {
      return b - a
    })
    state.oColorTab = arr;
    // state.oColorList = payload;



  },
  changeYear: (state, payload) => {
    // console.log(payload)
    for (let i in state.oColorList) {
      // console.log(i)
      // console.log(state.oColorList[i])
      if (i == payload) {
        // alert(i)
        state.colorList = state.oColorList[i]
        console.log(state.colorList )
      }
    }
  }
}

let actions = {
  getImgList: ({
    commit
  }, payload) => {
    getImgList(payload).then(body => {
      commit('imgList', body.data)
    })
  },
  getColorList: ({
    commit
  }, payload) => {
    // console.log(payload)
    getColorList(payload).then(body => {
      // console.log(body)
      commit('upColor', body.data)
      state.oColorList = body.data

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
