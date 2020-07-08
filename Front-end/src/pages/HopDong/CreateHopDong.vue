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
                    <md-input v-model.trim="hoTen" disabled type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-autocomplete required v-model.trim="hopDong.CMND" 
                    :md-options="dsCMND"
                    @md-changed='getInfoKH'
                  >
                    <label>CMND</label>
                  </md-autocomplete>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Địa chỉ</label>
                    <md-input v-model.trim="diaChi" disabled type="text" ></md-input>
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
                  <md-button v-show="!update" type="submit" class="md-raised md-success">Tạo hợp đồng</md-button>
                  <md-button v-show="update" type="submit" class="md-raised md-success">Cập nhật hợp đồng</md-button>
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
      erro: false,
      show: false,
      hoTen: "",
      diaChi: "",
      tenHangXe: "",
      tenDongXe: "",
      giaThue: null,
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

      title: "Tạo hợp đồng"
    };
  },

  async mounted() {
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
        this.mapKhachHang = new Map();
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
    }
  },
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
