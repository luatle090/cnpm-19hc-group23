<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <b-alert v-model="show" :variant="erro ? 'danger' : 'success'"  dismissible>{{ message }}</b-alert>
        <form v-on:submit.prevent="updateBaoDuong">
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">{{ title }}</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số hiệu xe</label>
                    <md-input required disabled v-model.trim="soHieuXe" type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="ngayKiemTra" required md-immediately>
                      <label>Ngày kiểm tra</label>
                    </md-datepicker>    
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tình trạng</label>
                    <md-input v-model="tinhTrang" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Lốp xe</label>
                    <md-input required v-model="lopXe" type="text"> </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Vỏ xe</label>
                    <md-input v-model.trim="voXe" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Ghế xe</label>
                    <md-input v-model.trim="gheXe" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Gương chiếu hậu</label>
                    <md-input v-model.trim="guongChieuHau" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Hệ thống thắng xe</label>
                    <md-input v-model.trim="thangXe" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Túi khí</label>
                    <md-input v-model.trim="tuiKhi" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/xekhachtra" class="btn-huy md-raised md-danger">Quay lại</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { VMoney } from "v-money";
import { mapActions } from "vuex";

export default {
  name: "updateBaoDuong",
  data() {
    return {
      dsNgayBaoDuong: [],
      ngayBaoDuong: "",
      baoDuong: {
        soHieuXe: "",
        tinhTrangBaoDuong: "",
      },
      chiTiet: {
        tuiKhi: "",
        voXe: "",
        ruotXe: "",
        guongXe: "",
        thangXe: "",
        gheXe: "",
      },
      title: "Chi tiết tình trạng xe khách trả"
    };
  },

  mounted(){
    this.getDetail();
  },

  methods: {
    ...mapActions(['getToken']),

    async getDetail(){
      let properties = {};
      if(this.ngayBaoDuong){
        properties.ngayBaoDuong = this.ngayBaoDuong;
      }
      const accessToken = await this.getToken();
      // axios.get(`/traxe/${this.$route.params.id}`, {
      //   headers: {
      //     "x-access-token": accessToken
      //   },
      //   params: properties
      // }).then(res => {
      //   this.baoDuong = res.data.baoDuong;
      //   this.chiTiet = res.data.chiTiet;
      // }).catch(err => {
      //   console.log(err);
      // });
    },
  }
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
