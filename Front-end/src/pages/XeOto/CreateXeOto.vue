<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form v-on:submit.prevent>
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">{{ title }}</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div v-show="update" class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số hiệu xe</label>
                    <md-input required disabled v-model.trim="xe.soHieuXe" type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <md-select v-model="xe.idHangXe" required placeholder="Hãng xe" @md-selected="getDongXe">
                          <md-option v-for="hangXe in dsHangXe" 
                            :key="hangXe.idHangXe" 
                            :value="hangXe.idHangXe"
                          >{{ hangXe.tenHangXe }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <md-select v-model="xe.idDongXe" required placeholder="Hãng xe" >
                        <md-option v-for="dongXe in dsDongXe" 
                          :key="dongXe.idDongXe" 
                          :value="dongXe.idDongXe"
                        >{{ dongXe.tenDongXe }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <md-select v-model="xe.idLoaiXe" required placeholder="Loại xe">
                      <md-option v-for="loaiXe in dsLoaiXe"
                        :key="loaiXe.idLoaiXe" 
                        :value="loaiXe.idLoaiXe"
                      >{{ loaiXe.tenLoaiXe }}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Màu sắc</label>
                    <md-input v-model.trim="xe.mauSac" required type="text" ></md-input>
                  </md-field>
                </div>
                 <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Giá thuê</label>
                    <span class="md-prefix">$</span>
                    <md-input v-model.number="xe.giaThue" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Giá trị thật của xe</label>
                    <span class="md-prefix">$</span>
                    <md-input v-model.number="xe.giaTriXe" @keyup.native="tinhTienDatCoc" required></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Phần trăm đặt cọc</label>
                    <md-input v-model.number="xe.phanTramDatCoc" 
                      min="0" max="120" 
                      @keyup.native="tinhTienDatCoc" 
                      required 
                      step=".01"
                      type="number"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số tiền đặt cọc</label>
                    <span class="md-prefix">$</span>
                    <md-input v-model="xe.tienDatCoc" disabled ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/xeoto" class="btn-huy md-raised md-danger">Quay lại</md-button>
                  <md-button v-show="!update" type="submit" @click="themMoi" class="md-raised md-success">Thêm mới</md-button>
                  <md-button v-show="update" type="submit" @click="capNhat" class="md-raised md-success">Cập nhật</md-button>
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
  props: {
    update:{
      type: Boolean
    }
  },
  data() {
    return {
      dsHangXe: [],
      dsDongXe: [],
      dsLoaiXe: [],
      oldHangXe: -1,
      title: "Thêm mới xe thuê",
      xe: {
        idXeOto: "",
        soHieuXe: "",
        giaTriXe: "",
        giaThue: "",
        phanTramDatCoc: null,
        tienDatCoc: null,
        mauSac: "",
        idLoaiXe: null,
        idDongXe: null,
        idHangXe: null,
      },

      money: {
        thousands: ".",
        precision: 0
      },
    };
  },

 mounted() {
    this.getHangXe();
    this.getLoaiXe();
    if(this.update === true){
      this.getXeOtoById(this.$route.params.id);
    }
  },

  methods: {
    ...mapActions(["getToken"]),

    tinhTienDatCoc(){
      this.xe.tienDatCoc = this.xe.giaTriXe * this.xe.phanTramDatCoc / 100;
    },

    async getHangXe(){
      const accessToken = await this.getToken();
      axios.get('/hangxe', {
        headers: {
            "x-access-token": accessToken
        }
      }).then(res => {
          this.dsHangXe = res.data;
      }).catch( err => {
          console.log(err);
      });
    },

    async getDongXe(){
      const accessToken = await this.getToken();
      axios.get(`/dongxe/hangxe/${this.xe.idHangXe}`, {
        headers: {
            "x-access-token": accessToken
        }
      }).then(res => {
          this.dsDongXe = res.data;
          if(-1 !== this.oldHangXe){
            this.xe.idDongXe = null;
            console.log(this.xe.idDongXe);
          }
          this.oldHangXe = this.xe.idHangXe;           
      }).catch( err => {
          console.log(err);
      });
    },

    async getLoaiXe(){
      const accessToken = await this.getToken();
      axios.get('/loaixe', {
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        this.dsLoaiXe = res.data;
      }).catch( err => {
        console.log(err);
      });
    },

    async getXeOtoById(id){
      this.title = "Cập nhật xe ô tô";
      const accessToken = await this.getToken();
      axios.get(`/xeoto/${id}`, {
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        this.xe = res.data;
      }).catch(err => {
        console.log(err);
      });
    },

    async themMoi(){
      const accessToken = await this.getToken();
      const xe = this.xe;
      delete xe.idXeOto;
      axios({
        method: 'post',
        url: '/xeoto',
        headers: {
          "x-access-token": accessToken
        },
        data: xe,
      }).then(res => {
        if(res.status === 201){
          const message = "Thêm mới xe ô tô thành công";
          this.$router.push({ name: 'Xe Ô tô', params: { message: message, showMS: true } })
        }
      }).catch(err => {
        const message = "Thêm mới xe ô tô bị lỗi. Vui lòng liên hệ quản trị viên";
        this.$router.push({ name: 'Xe Ô tô', params: { message: message, showMS: true, erro: true } })
      });
    },

    async capNhat(){
      const accessToken = await this.getToken();
      const xe = this.xe;
      delete xe.tienDatCoc;
      axios({
        method: 'patch',
        url: `/xeoto/${this.xe.idXeOto}`,
        headers: {
          "x-access-token": accessToken
        },
        data: xe
      }).then(res => {
        if(res.status === 200){
          const message = "Cập nhật xe ô tô thành công";
          this.$router.push({ name: 'Xe Ô tô', params: { message: message, showMS: true } })
        }
      }).catch(err => {
        const message = "Cập nhật xe ô tô bị lỗi. Vui lòng liên hệ quản trị viên";
        this.$router.push({ name: 'Xe Ô tô', params: { message: message, showMS: true, erro: true } })
      });
    }



  },
  directives: {
    money: VMoney
  },
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
