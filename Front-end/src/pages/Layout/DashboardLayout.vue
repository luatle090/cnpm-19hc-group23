<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">

    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link v-show="nvThueXe" to="/hopdong">
        <md-icon>content_paste</md-icon>
        <p>Hợp đồng</p>
      </sidebar-link>
      <sidebar-link v-show="nvBaoDuong" to="/baoduong">
        <md-icon>content_paste</md-icon>
        <p>Bảo dưỡng</p>
      </sidebar-link>
      <sidebar-link v-show="nvBaoDuong" to="/xekhachtra">
        <md-icon>content_paste</md-icon>
        <p>Kiểm tra xe khách trả</p>
      </sidebar-link>
      <sidebar-link v-show="quanLy"  to="/xeoto">
        <md-icon>content_paste</md-icon>
        <p>Xe Ô tô</p>
      </sidebar-link>
      <!-- <sidebar-link to="/baocao">
        <md-icon>content_paste</md-icon>
        <p>Báo cáo</p>
      </sidebar-link> -->
      <li to="/" v-show="quanLy">
        <a href="#" v-b-toggle.collapse-lichsu class="nav-link sidebar-menu-item sidebar-menu-padding-left">
          <md-icon>content_paste</md-icon>
          <p>Báo cáo <b class="caret"></b></p></a>
          <b-collapse id="collapse-lichsu" accordion="my-accordion" style="animation-fill-mode: both; animation-timing-function: ease-out;">
            <sidebar-link to="/baocaodoanhthu">
              <p>Doanh thu</p>
            </sidebar-link>
            <sidebar-link to="/baocaochitieu">
              <p>Chi tiêu</p>
            </sidebar-link>
          </b-collapse>
      </li>

      <!-- <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Thay Đổi Password</p>
      </sidebar-link>
      <sidebar-link to="/taikhoannganhang">
        <md-icon>account_balance</md-icon>
        <p>tai khoan ngan hang</p>
      </sidebar-link>
      <li to="/">
        <a href="#" v-b-toggle.collapse-lichsu class="nav-link sidebar-menu-item sidebar-menu-padding-left">
          <md-icon>history</md-icon>
          <p>Lịch sử giao dịch <b class="caret"></b></p></a>
          <b-collapse id="collapse-lichsu" accordion="my-accordion" style="animation-fill-mode: both; animation-timing-function: ease-out;">
            <sidebar-link to="/lichsuchuyenkhoan">
              <p>lịch sử chuyển khoản</p>
            </sidebar-link>
            <sidebar-link to="/lichsunhantien">
              <p>lịch sử nhận tiền</p>
            </sidebar-link>
          </b-collapse>
      </li>
      <sidebar-link to="/thietlapnguoinhan">
        <md-icon>content_paste</md-icon>
        <p>Thiết lập người nhận</p>
      </sidebar-link>
      <li to="/">
        <a href="#" v-b-toggle.collapse-chuyenkhoan class="nav-link sidebar-menu-item sidebar-menu-padding-left">
          <md-icon>payment</md-icon>
          <p>Chuyển khoản<b class="caret"></b></p></a>
          <b-collapse id="collapse-chuyenkhoan" accordion="my-accordion" style="animation-fill-mode: both; animation-timing-function: ease-out;">
            <sidebar-link to="/chuyenkhoannoibo">
              <p>chuyển khoản nội bộ</p>
            </sidebar-link>
            <sidebar-link to="/cklnh">
              <p>chuyển khoản liên ngân hàng</p>
            </sidebar-link>
          </b-collapse>
      </li>
      <sidebar-link to="/hopdong">
        <md-icon>content_paste</md-icon>
        <p>Hợp đồng</p>
      </sidebar-link>
      <sidebar-link to="/no">
        <md-icon>content_paste</md-icon>
        <p>Nợ</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content></dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import jwt from "jsonwebtoken";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data(){
    return{
      quanLy: false,
      nvThueXe: false,
      nvBaoDuong: false, 
    }
  },
  mounted() {
   this.role();
  },
  methods: {
    role() {
      const token = jwt.decode(localStorage.getItem("accessToken"));
      if(token.vaiTro === 1){
        this.quanLy = true;
      }
      else if (token.vaiTro === 2){
        this.nvThueXe = true;
      }
      else{
        this.nvBaoDuong = true;
      }
    },
  }
};
</script>
<style lang="scss">
  .sidebar-menu-padding-left{
    padding-left: 20px!important;
  }
</style>