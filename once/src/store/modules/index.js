import {
  getBrandList,
  getMakeList
} from '../../api/index.js';
let state = {
  letters: [],
  brand: {},
  letter: '',     // 当前选中的品牌字母
  isShow: false,  // 是否显示字母弹框
  brandId: '', //首页右侧品牌id
  makeList: '', // 车系列表
  isShowList: false
}

let mutations = {
  initState: (state, payload) => {
    // 数据处理
    let letters = [];
    let brand = {};
    payload.forEach((item) => {

      let spell = item.Spelling.slice(0, 1); //字母
      //   console.log(spell)
      if (letters.indexOf(spell) == -1) {
        // 把新字母放到letters列表  
        letters.push(spell)
        // 在brand里新建一项并赋值为一个数组
        brand[spell] = [item];

      } else {
        brand[spell].push(item)
      }
    });

    state.letters = letters;
    state.brand = brand;
  },
  touchstart:()=>{
    state.isShowList = true;
  },
  touchend:()=>{
    state.isShowList = false;
  },
  changemake: (state, payload) => {
    state.brandId = payload.id;
    state.makeList = payload.list
    state.isShowList = true;
    console.log(state.isShowList)
    // state.isShowList=true
  },
  // 控制字母的显示和隐藏
  showLetter: (state, payload)=>{
    state.isShow = payload;
},
// 该变letter
changeLetter: (state, payload)=>{
    state.letter = payload;
},
  hideMakeList: (state, payload)=> {
    state.isShowList = false
  }

}
let actions = {
  initState: ({
    commit
  }, payload) => {
    getBrandList().then(body => {
      if (body.code == 1) {
        commit('initState', body.data);
      } else {
        alert(body.msg);
      }
    })
  },
  getMakeList: ({
    commit
  }, payload) => {
    // console.log(payload)
    getMakeList(payload).then(body => {
      // console.log(body.data)
      commit('changemake', {
        id: payload,
        list: body.data
      })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
