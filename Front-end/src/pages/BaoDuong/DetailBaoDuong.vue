<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">{{ title }}</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số hiệu xe</label>
                    <md-input required disabled v-model.trim="baoDuong.soHieuXe" type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label >Ngày bảo dưỡng</label>
                    <md-select v-model="ngayBaoDuong" @md-selected="getBaoDuong">
                        <md-option v-for="ngay in dsNgayBaoDuong"
                            :key="ngay.idLichSuBaoDuong" 
                            :value="ngay.ngayBaoDuong"
                        >{{ ngay.ngayBaoDuong }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tình trạng</label>
                    <md-input v-model="baoDuong.tinhTrangBaoDuong" required disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Lốp xe</label>
                    <md-input required v-model="chiTiet.ruotXe" disabled type="text"> </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Vỏ xe</label>
                    <md-input v-model.trim="chiTiet.voXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Ghế xe</label>
                    <md-input v-model.trim="chiTiet.gheXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Gương chiếu hậu</label>
                    <md-input v-model.trim="chiTiet.guongXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Hệ thống thắng xe</label>
                    <md-input v-model.trim="chiTiet.thangXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Túi khí</label>
                    <md-input v-model.trim="chiTiet.tuiKhi" required disabled type="text" ></md-input>
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
      title: "Chi tiết bảo dưỡng"
    };
  },

  mounted(){
    this.getNgayBaoDuong();
  },

  methods: {
    ...mapActions(['getToken']),

    async getBaoDuong(){
      //console.log(id);
      //this.title = "Cập nhật xe ô tô";
      let properties = {};
      if(this.ngayBaoDuong){
        properties.ngayBaoDuong = this.ngayBaoDuong;
      }
      const accessToken = await this.getToken();
      axios.get(`/baoduong/${this.$route.params.id}`, {
        headers: {
          "x-access-token": accessToken
        },
        params: properties
      }).then(res => {
        this.baoDuong = res.data.baoDuong;
        this.chiTiet = res.data.chiTiet;
      }).catch(err => {
        console.log(err);
      });
    },

    async getNgayBaoDuong(){
      const accessToken = await this.getToken();
      
     
      axios.get(`/baoduong/ngaybaoduong/${this.$route.params.id}`, {
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        this.dsNgayBaoDuong = res.data;
        for(const obj of this.dsNgayBaoDuong){
          if(Number(obj.ngayMacDinh) === 1){
            this.ngayBaoDuong = obj.ngayBaoDuong;
            break;
          }
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
