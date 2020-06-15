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
                    <md-datepicker v-model="ngayBaoDuong" required disabled md-immediately>
                      <label>Ngày bảo dưỡng</label>
                    </md-datepicker>    
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tình trạng</label>
                    <md-input v-model="tinhTrang" required disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Lốp xe</label>
                    <md-input required v-model="lopXe" disabled type="text"> </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Vỏ xe</label>
                    <md-input v-model.trim="voXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Ghế xe</label>
                    <md-input v-model.trim="gheXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Gương chiếu hậu</label>
                    <md-input v-model.trim="guongChieuHau" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Hệ thống thắng xe</label>
                    <md-input v-model.trim="thangXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Túi khí</label>
                    <md-input v-model.trim="tuiKhi" required disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/baoduong" class="btn-huy md-raised md-danger">Quay lại</md-button>
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
  name: "detailBaoDuong",
  data() {
    return {
      erro: false,
      show: false,
      voXe: "Bình thường",
      lopXe: "Bình thường",
      tinhTrang: "Đã bảo dưỡng",
      tuiKhi: "Bình thường",
      thangXe: "Bình thường",
      guongChieuHau: "Bình thường",
      ngayBaoDuong: "14/06/2020",
      gheXe: "Bình thường",
      soHieuXe: "Innova02",
      message: "",
      title: "Chi tiết bảo dưỡng"
    };
  },

};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
