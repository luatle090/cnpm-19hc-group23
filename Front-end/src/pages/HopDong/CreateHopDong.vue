<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form v-on:submit.prevent="submit">
          <md-card>
            <md-card-header data-background-color="green">
              <h4 class="title">{{ title }}</h4>
            </md-card-header>
            <md-card-content>
              <div class="md-layout">
                <div v-show="update" class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Mã hợp đồng</label>
                    <md-input required disabled v-model.trim="hopDong.maHopDong" type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Họ tên</label>
                    <md-input v-model="hoTen" disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-autocomplete required v-model="hopDong.CMND" 
                    :md-options="dsCMND"
                    @md-changed='getInfoKH'
                  >
                    <label>CMND</label>
                  </md-autocomplete>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Địa chỉ</label>
                    <md-input v-model="diaChi" disabled type="text" ></md-input>
                  </md-field>
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="hopDong.ngayThueXe"  required md-immediately>
                      <label>Ngày thuê xe</label>
                    </md-datepicker>    
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="hopDong.ngayTraXe" required md-immediately>
                      <label>Ngày trả xe</label>
                    </md-datepicker>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-autocomplete v-model.trim="hopDong.soHieuXe" 
                    :md-options="dsSoHieuXe"
                    @md-changed='getInfoXe'
                    required
                  >
                    <label>Số hiệu xe</label>
                    <!-- <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.soHieuXe }}</template> -->
                  </md-autocomplete>
                </div>
                 <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Giá thuê</label>
                    <span class="md-prefix">$</span>
                    <md-input v-model="giaThue" disabled type="text" ></md-input>
                  </md-field>
                </div>
                 <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tiền đặt cọc</label>
                    <span class="md-prefix">$</span>
                    <md-input v-model="tienDatCoc" disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Hãng xe</label>
                    <md-input v-model.trim="tenHangXe" disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Dòng xe</label>
                    <md-input v-model.trim="tenDongXe" disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/hopdong" class="btn-huy md-raised md-danger">Quay lại</md-button>
                  <md-button v-show="!update" type="button" class="btn-huy md-raised md-success" @click="showDialog = true">Thêm khách hàng </md-button>
                  <md-button v-show="!update" type="submit" class="md-raised md-success">Tạo hợp đồng</md-button>
                  <md-button v-show="update" type="submit" class="md-raised md-success">Cập nhật hợp đồng</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Thêm thông tin khách hàng</md-dialog-title>
      
          
      <md-card-content>
        <div class="md-layout primary" v-if="showMessage">
          <div class="md-layout-item md-size-90">
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-100">
                  <label>{{ message }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="md-layout primary" v-else>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Họ tên</label>
              <md-input required v-model.trim="khachHang.hoTen" type="text"> </md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>CMND</label>
              <md-input maxlength='9' v-model.trim="khachHang.CMND" required type="text" ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Số điện thoại</label>
              <md-input v-model.number="khachHang.SDT" required type="text" maxlength='9' ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Địa chỉ</label>
              <md-input v-model.trim="khachHang.diaChi" required type="text" ></md-input>
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-dialog-actions>
        <md-button class="md-danger md-raised" @click="resetDialog">Đóng</md-button>
        <md-button class="md-primary" v-show="!showMessage" @click="themMoiKhachHang">Xán nhận</md-button>
      </md-dialog-actions>
    </md-dialog>

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
      erro: false,
      show: false,
      hoTen: "",
      diaChi: "",
      tenHangXe: "",
      tenDongXe: "",
      giaThue: null,
      showDialog: false,
      tienDatCoc: null,
      hopDong: {
        maHopDong: "",
        CMND: "",     
        ngayTraXe: null,
        ngayThueXe: new Date(),
        soHieuXe: "",
        idKhachHang: null,    
      },
      mapSoHieuXe: null,
      mapKhachHang: null,
      dsSoHieuXe: [],
      dsCMND: [],

      message: '',
      showMessage: false,
      khachHang: {
        SDT: "",
        CMND: "",
        hoTen: "",
        diaChi: "",
      },

      title: "Tạo hợp đồng"
    };
  },

  async mounted() {
    this.mapKhachHang = new Map();
    await this.getXeOto();
    await this.getKhachHang();
    if(this.update === true){
      this.getHopDongById(this.$route.params.id);
    }   
  },

  methods: {
    ...mapActions(["getToken", 'phanCachTien']),

    submit(){
      if(this.update === true){
        this.capNhat();
      }
      else{
        this.themMoi();
      }
    },

    async getHopDongById(id){
      this.title = "Cập nhật xe ô tô";
      const accessToken = await this.getToken();
      axios.get(`/hopdong/${id}`, {
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        this.hopDong = res.data;
        const xeOto = {
          soHieuXe: this.hopDong.soHieuXe,
          tenHangXe: this.hopDong.tenHangXe,
          tenDongXe: this.hopDong.tenDongXe,
          giaThue: this.hopDong.giaThue,
          tienDatCoc: this.hopDong.soTienDatCoc,
        }
        this.mapSoHieuXe.set(this.hopDong.soHieuXe, xeOto);
        this.hopDong.ngayTraXe = new Date(this.hopDong.ngayTraXe);
        this.hopDong.ngayThueXe = new Date(this.hopDong.ngayThueXe);
      }).catch(err => {
        console.log(err);
      });
    },

    async getXeOto() {
      const accessToken = await this.getToken();
      axios.get(`/xeoto/allsohieuxe`, {
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        const xeOtolist = res.data;
        this.mapSoHieuXe = new Map();
        for(const obj of xeOtolist){
          this.mapSoHieuXe.set(obj.soHieuXe, obj);
          this.dsSoHieuXe.push(obj.soHieuXe);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    async getKhachHang() {
      const accessToken = await this.getToken();
      axios.get(`/khachhang`, {
        headers: {
          "x-access-token": accessToken
        }
      }).then(res => {
        this.dsKhachHang = res.data;
        for(const obj of this.dsKhachHang){
          this.mapKhachHang.set(obj.CMND, obj);
          this.dsCMND.push(obj.CMND);    
        }
      }).catch(err => {
        console.log(err);
      });
    },

    getInfoKH(){
      if(this.mapKhachHang.has(this.hopDong.CMND)){
        const obj = this.mapKhachHang.get(this.hopDong.CMND);
        this.hoTen = obj.hoTen;
        this.diaChi = obj.diaChi;
        this.hopDong.idKhachHang = obj.idKhachHang;
      } else {
        this.hoTen = "";
        this.diaChi = "";
      }
    },

    async getInfoXe() {
      if(this.mapSoHieuXe.has(this.hopDong.soHieuXe)){
        const obj = this.mapSoHieuXe.get(this.hopDong.soHieuXe);
        this.giaThue = await this.phanCachTien(obj.giaThue);
        this.tienDatCoc = await this.phanCachTien(obj.tienDatCoc);
        this.tenHangXe = obj.tenHangXe;
        this.tenDongXe = obj.tenDongXe;
      } else {
        this.tenHangXe = "";
        this.tenDongXe = "";
        this.giaThue = "";
        this.tienDatCoc = "";
      }
    },

    async themMoi(){
      const accessToken = await this.getToken();
      let hopDong = this.hopDong;
      if(hopDong.ngayThueXe){
        hopDong.ngayThueXe = Number(hopDong.ngayThueXe);
      }
      if(hopDong.ngayTraXe){
        hopDong.ngayTraXe = Number(hopDong.ngayTraXe);
      }
      
      axios({
        method: 'post',
        url: '/hopdong',
        headers: {
          "x-access-token": accessToken
        },
        data: hopDong,
      }).then(res => {
        if(res.status === 201){
          const message = "Thêm mới hợp đồng thành công";
          this.$router.push({ name: 'Hợp đồng', params: { message: message, showMS: true } })
        }
      }).catch(err => {
        const message = "Thêm mới hợp đồng bị lỗi. Vui lòng liên hệ quản trị viên";
        this.$router.push({ name: 'Hợp đồng', params: { message: message, showMS: true, erro: true } })
      });
    },

    async capNhat(){
      const accessToken = await this.getToken();
      let hopDong = this.hopDong;
      if(hopDong.ngayThueXe){
        hopDong.ngayThueXe = Number(hopDong.ngayThueXe);
      }
      if(hopDong.ngayTraXe){
        hopDong.ngayTraXe = Number(hopDong.ngayTraXe);
      }
    
      axios({
        method: 'patch',
        url: `/hopdong/${this.$route.params.id}`,
        headers: {
          "x-access-token": accessToken
        },
        data: hopDong
      }).then(res => {
        if(res.status === 200){
          const message = "Cập nhật hợp đồng thành công";
          this.$router.push({ name: 'Hợp đồng', params: { message: message, showMS: true } })
        }
      }).catch(err => {
        const message = "Cập nhật hợp đồng bị lỗi. Vui lòng liên hệ quản trị viên";
        this.$router.push({ name: 'Hợp đồng', params: { message: message, showMS: true, erro: true } })
      });
    },

    async themMoiKhachHang(){
      const accessToken = await this.getToken();
      this.showMessage = true;
      axios({
        method: 'post',
        url: '/khachhang',
        headers: {
          "x-access-token": accessToken
        },
        data: this.khachHang
      }).then(res => {
        this.message = 'Thêm thành công khách hàng';
        this.khachHang.idKhachHang = res.data.id;
        this.hopDong.CMND = this.khachHang.CMND;
        
        //thêm vào ds CMND và mapKhachHang
        this.mapKhachHang.set(this.khachHang.CMND.toString(), this.khachHang);
        this.dsCMND.push(this.khachHang.CMND.toString());

      }).catch( err => {
        this.message = 'Có lỗi xảy ra. Vui lòng liên hệ Quản trị viên';
      });
    },

    resetDialog(){
      this.showMessage = false;
      this.khachHang.hoTen = ""
      this.khachHang.CMND = ""
      this.khachHang.diaChi = "";
      this.khachHang.SDT = "";
      this.showDialog = false;
    }

  },
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
