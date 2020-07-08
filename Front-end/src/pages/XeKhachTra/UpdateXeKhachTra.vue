<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form v-on:submit.prevent="updateXeKhachTra">
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
                      <label>Ngày kiểm tra</label>
                    </md-datepicker>    
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tình trạng</label>
                    <md-select required v-model="baoDuong.tinhTrangBaoDuong"  @md-selected="changeTinhTrang">
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
                  <md-button type="button" to="/xekhachtra" class="btn-huy md-raised md-danger">Quay lại</md-button>
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
      ngayBaoDuong: null,
      baoDuong: {
        soHieuXe: "",
        tinhTrangBaoDuong: "",
      },
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
      title: 'Cập nhật tình trạng xe khách trả'
    };
  },

  mounted(){
    this.ngayBaoDuong = new Date();
    this.getXe();
    this.getTinhTrang('PHU_TUNG');
    this.getTinhTrang('KIEM_TRA_XE');
  },

  methods: {
    ...mapActions(['getToken']),

    async updateXeKhachTra(){
      const accessToken = await this.getToken();
      const data = {
        idXeOto: this.$route.params.id,
        ngayKiemTra: Number(this.ngayBaoDuong),
        tinhTrangKiemTra: this.baoDuong.tinhTrangBaoDuong,
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
        url: '/traxe',
        headers: {
          "x-access-token": accessToken
        },
        data,
      }).then(res => {
        const message = 'Cập nhật tình trạng thành công';
        this.$router.push({ name: 'Kiểm tra xe khách trả', params: { message: message, showMS: true } })
      }).catch(err => {
        const message = "Cập nhật tình trạng bị lỗi. Vui lòng liên hệ quản trị viên";
        this.$router.push({ name: 'Kiểm tra xe khách trả', params: { message: message, showMS: true, erro: true } })
      });
    },

    async getXe(){
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

    changeTinhTrang(){
      if(this.baoDuong.tinhTrangBaoDuong === 1){
        this.chiTiet.thangXe.tinhTrang = 11
        this.chiTiet.gheXe.tinhTrang = 11
        this.chiTiet.tuiKhi.tinhTrang = 11
        this.chiTiet.voXe.tinhTrang = 11
        this.chiTiet.ruotXe.tinhTrang = 11
        this.chiTiet.guongXe.tinhTrang = 11
      }
      else {
        this.chiTiet.thangXe.tinhTrang = "";
        this.chiTiet.gheXe.tinhTrang = "";
        this.chiTiet.tuiKhi.tinhTrang = "";
        this.chiTiet.voXe.tinhTrang = "";
        this.chiTiet.ruotXe.tinhTrang = "";
        this.chiTiet.guongXe.tinhTrang = "";
      }
    }
  }
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
