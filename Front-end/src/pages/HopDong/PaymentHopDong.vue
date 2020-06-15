<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <b-alert v-model="show" :variant="erro ? 'danger' : 'success'"  dismissible>{{ message }}</b-alert>
        <form v-on:submit.prevent="thanhToanHopDong">
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">{{ title }}</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Mã hợp đồng</label>
                    <md-input required disabled v-model.trim="maHD" type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Họ tên</label>
                    <md-input v-bind:value="hoTen" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>CMND</label>
                    <md-input required v-model.number="CMND" disabled type="text"> </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Địa chỉ</label>
                    <md-input v-model.trim="diaChi" required disabled type="text" ></md-input>
                  </md-field>
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="ngayThueXe" required md-immediately :md-disabled-dates="disabledDates">
                      <label>Ngày thuê xe</label>
                    </md-datepicker>    
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="ngayTraXe" required md-immediately :md-disabled-dates="disabledDates">
                      <label>Ngày trả xe</label>
                    </md-datepicker>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số hiệu xe</label>
                    <md-input v-model.trim="soHieuXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Chi phí đền bù</label>
                    <md-input v-model.trim="chiPhiDenBu" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tổng thanh toán</label>
                    <md-input v-model.trim="thanhToan" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/hopdong" class="btn-huy md-raised md-danger">Quay lại</md-button>
                  <md-button type="submit" class="md-raised md-success">Thanh toán hợp đồng</md-button>
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
  name: "createHopDong",
  data() {
    return {
      erro: false,
      show: false,
      maHD: "HD0001",
      hoTen: "Lê Hoàng Luật",
      CMND: "025423231",
      diaChi: "227 Nguyễn Văn Cừ, Q.5",
      ngayTraXe: "22/06/2020",
      ngayThueXe: "14/06/2020",
      soHieuXe: "Innova01",
      message: "",
      title: "Thanh toán hợp đồng",
      chiPhiDenBu: "100.000 VNĐ",
      thanhToan: "500.000 VNĐ",

      disabledDates: date => {
        const day = date.getDay()

        return day >= 0 && day <= 6
      },
      
      money: {
        thousands: ",",
            precision: 0,
            masked: false
       },
       
    };
  },

  methods: {
    thanhToanHopDong(){
      this.show = true;
      this.message = "Thanh toán hợp đồng thành công";
    }
  },
   directives: {
        money: VMoney
    }
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
