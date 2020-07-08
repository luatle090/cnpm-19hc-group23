import Vuex from "vuex";
import Vue from "vue";
import auth from "./modules/auth";
import chuyenKhoan from "./modules/chuyenKhoan";
import lib from './modules/lib';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        chuyenKhoan,
        lib
    }
})