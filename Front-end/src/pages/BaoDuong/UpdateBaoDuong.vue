<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form v-on:submit.prevent="update">
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
                    <md-datepicker v-model="ngayBaoDuong" required md-immediately>
                      <label>Ngày bảo dưỡng</label>
                    </md-datepicker>    
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tình trạng</label>
                    <md-select required v-model="baoDuong.tinhTrangBaoDuong">
                      <md-option v-for="tt in dsTinhTrangBaoDuong"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Ruột xe</label>
                    <md-select required v-model="chiTiet.ruotXe.tinhTrang">
                      <md-option v-for="tt in dsTinhTrangPhuTung"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Vỏ xe</label>
                    <md-select required v-model="chiTiet.voXe.tinhTrang">
                      <md-option v-for="tt in dsTinhTrangPhuTung"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Ghế xe</label>
                    <md-select required v-model="chiTiet.gheXe.tinhTrang">
                      <md-option v-for="tt in dsTinhTrangPhuTung"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Gương chiếu hậu</label>
                    <md-select required v-model="chiTiet.guongXe.tinhTrang">
                      <md-option v-for="tt in dsTinhTrangPhuTung"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Hệ thống thắng xe</label>
                    <md-select required v-model="chiTiet.thangXe.tinhTrang">
                      <md-option v-for="tt in dsTinhTrangPhuTung"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Túi khí</label>
                    <md-select required v-model="chiTiet.tuiKhi.tinhTrang">
                      <md-option v-for="tt in dsTinhTrangPhuTung"
                          :key="tt.idTinhTrang" 
                          :value="tt.idTinhTrang"
                      >{{ tt.moTa }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/baoduong" class="btn-huy md-raised md-danger">Quay lại</md-button>
                  <md-button type="submit" class="md-raised md-success">Cập nhật</md-button>
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
      // erro: false,
      // show: false,
      // voXe: "Thay thế",
      // lopXe: "Thay thế",
      // tinhTrang: "Hỏng hóc",
      // tuiKhi: "Bình thường",
      // thangXe: "Thay thế",
      // guongChieuHau: "Bình thường",
      // ngayBaoDuong: "14/06/2020",
      // gheXe: "Bình thường",
      // soHieuXe: "Innova01",
      // message: "",
      ngayBaoDuong: null,
      baoDuong: {
        soHieuXe: "",
        tinhTrangBaoDuong: "",
      },
      // chiTiet:{
      //   voXe: "",
      //   tuiKhi: "",
      //   gheXe: "",
      //   ruotXe: "",
      //   guongXe: "",
      //   thangXe: "",
      // },

      chiTiet: {
        tuiKhi: {
          id: "",
          tinhTrang: ""
        },
        voXe: {
          id: "",
          tinhTrang: ""
        },
        ruotXe: {
          id: "",
          tinhTrang: ""
        },
        guongXe: {
          id: "",
          tinhTrang: ""
        },
        thangXe: {
          id: "",
          tinhTrang: ""
        },
        gheXe: {
          id: "",
          tinhTrang: ""
        },
      },
      dsTinhTrangBaoDuong: [],
      dsTinhTrangPhuTung: [],
      title: "Cập nhật tình trạng bảo dưỡng"
    };
  },

  mounted(){
    this.getBaoDuong();
    this.ngayBaoDuong = new Date();
    this.getTinhTrang('PHU_TUNG');
    this.getTinhTrang('BAO_DUONG');
    //this.getPhuTung();
  },


  methods: {
    ...mapActions(['getToken']),

    async getBaoDuong(){
      const accessToken = await this.getToken();
      axios.get(`/xeoto/${this.$route.params.id}`, {
        headers: {
          "x-access-token": accessToken
        },
      }).then(res => {
        this.baoDuong.soHieuXe = res.data.soHieuXe;
      }).catch(err => {
        console.log(err);
      });
    },

    async getTinhTrang(code){
      const accessToken = await this.getToken();
      axios.get(`/tinhtrang/${code}`, {
        headers: {
          "x-access-token": accessToken
        },
      }).then(res => {
        if(code == 'PHU_TUNG'){
          this.dsTinhTrangPhuTung = res.data;
        }
        else{
          this.dsTinhTrangBaoDuong = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },

    async getPhuTung(){
      const accessToken = await this.getToken();
      axios.get(`/phutung`, {
        headers: {
          "x-access-token": accessToken
        },
      }).then(res => {
        for(const obj of res.data){
          obj.idPhuTung
        }
      }).catch(err => {
        console.log(err);
      });
    },

    async update(){
      const accessToken = await this.getToken();
      const data = {
        idXeOto: this.$route.params.id,
        ngayBaoDuong: Number(this.ngayBaoDuong),
        tinhTrang: this.baoDuong.tinhTrangBaoDuong,
        chiTiet: [
          {
            idPhuTung: 1,
            tinhTrang: this.chiTiet.voXe.tinhTrang
          },
          {
            idPhuTung: 2,
            tinhTrang: this.chiTiet.ruotXe.tinhTrang
          },
          {
            idPhuTung: 3,
            tinhTrang: this.chiTiet.tuiKhi.tinhTrang
          },
          {
            idPhuTung: 4,
            tinhTrang: this.chiTiet.thangXe.tinhTrang
          },
          {
            idPhuTung: 5,
            tinhTrang: this.chiTiet.gheXe.tinhTrang
          },
          {
            idPhuTung: 6,
            tinhTrang: this.chiTiet.guongXe.tinhTrang
          },
        ]
      }
      axios({
        method: 'post',
        url: '/baoduong',
        headers: {
          "x-access-token": accessToken
        },
        data,
      }).then(res => {
        const message = 'Cập nhật bảo dưỡng thành công';
        this.$router.push({ name: 'Bảo dưỡng', params: { message: message, showMS: true } })
      }).catch(err => {
        const message = "Cập nhật bảo dưỡng bị lỗi. Vui lòng liên hệ quản trị viên";
        this.$router.push({ name: 'Bảo dưỡng', params: { message: message, showMS: true, erro: true } })
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
