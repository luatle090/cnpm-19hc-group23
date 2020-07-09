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
                    <md-input required disabled v-model="thanhToan.maHopDong" type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Họ tên</label>
                    <md-input v-bind:value="thanhToan.hoTen" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>CMND</label>
                    <md-input required v-model="thanhToan.CMND" disabled type="text"> </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Địa chỉ</label>
                    <md-input v-model.trim="thanhToan.diaChi" required disabled type="text" ></md-input>
                  </md-field>
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="thanhToan.ngayThueXe" required md-immediately :md-disabled-dates="disabledDates">
                      <label>Ngày thuê xe</label>
                    </md-datepicker>    
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="thanhToan.ngayTraXe" required md-immediately :md-disabled-dates="disabledDates">
                      <label>Ngày trả xe</label>
                    </md-datepicker>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số hiệu xe</label>
                    <md-input v-model.trim="thanhToan.soHieuXe" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Giá thuê</label>
                    <md-input v-model.trim="thanhToan.giaThue" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Giá ngày thuê</label>
                    <md-input v-model.trim="thanhToan.giaNgayThue" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Chi phí đền bù</label>
                    <md-input v-model.trim="thanhToan.chiPhiDenBu" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Tổng thanh toán</label>
                    <md-input v-model.trim="thanhToan.tongCong" disabled required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                  <md-button type="button" to="/hopdong" class="btn-huy md-raised md-danger">Quay lại</md-button>
                  <md-button type="button" @click="showDialog = true" class="btn-huy md-raised md-success">Chi tiết đền bù</md-button>
                  <!-- <md-button type="button" v-show="showExport" @click="exportHoaDon" class="btn-huy md-raised md-success">Xuất hóa đơn</md-button> -->
                  <md-button type="submit" v-show="showThanhToan" class="md-raised md-success">Thanh toán hợp đồng</md-button>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>

     <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Thông tin chi tiết đền bù</md-dialog-title>

      <md-card-content>
        <div class="md-layout primary">
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
        </div>
      </md-card-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>
<script>
import axios from "axios";
import { VMoney } from "v-money";
import { mapActions } from "vuex";

export default {
  name: "PaymentHopDong",
  data() {
    return {
      erro: false,
      show: false,
      message: "",
      title: "Thanh toán hợp đồng",
      showDialog : false,
      showThanhToan : true,
      showExport: false,
      thanhToan: {
        maHopDong: "",
        hoTen: "",
        CMND: "",
        idHopDong: "",
        ngayTraXe: null,
        ngayThueXe: null,
        diaChi: "",
        soHieuXe: "",
        giaThue: "",
        giaNgayThue: "",
        soTienDatCoc: "",
        chiPhiDenBu: "",
        tongCong: ""
      },

      chiTiet: {
        tuiKhi: "",
        voXe: "",
        ruotXe: "",
        guongXe: "",
        thangXe: "",
        gheXe: "",
      },

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

  mounted(){
    this.getThanhToan();
  },

  methods: {
    ...mapActions(['getToken', 'phanCachTien']),

    async getThanhToan(){
      const accessToken = await this.getToken();

      axios.get(`/thanhtoan/${this.$route.params.id}`, {
        headers: {
          "x-access-token": accessToken
        },
      }).then(res => {
        this.thanhToan = res.data.thanhToan;
        if(this.thanhToan.tinhTrangHopDong === 8 || !this.thanhToan.tinhTrangKiemTra){
          this.showThanhToan = false;
        }
        if(this.thanhToan.tinhTrangHopDong === 8){
          this.showExport = true;
        }
        this.thanhToan.ngayTraXe = new Date(this.thanhToan.ngayTraXe);
        this.thanhToan.ngayThueXe = new Date(this.thanhToan.ngayThueXe);
        this.chiTiet = res.data.chiTiet;
      }).catch(err => {
        console.log(err);
      });
    },

    async thanhToanHopDong(){
      // this.show = true;
      // this.message = "Thanh toán hợp đồng thành công";

      const accessToken = await this.getToken();

      axios({
        method: 'patch',
        url: `/thanhtoan/${this.$route.params.id}`,
        headers: {
          "x-access-token": accessToken
        },
      }).then(res => {
        if(res.status === 200){
          this.message = "Thanh toán hợp đồng thành công";
          this.show = true;
          this.showThanhToan = false;
          this.showExport = true;
          this.exportHoaDon();
          //this.$router.push({ name: 'Xe Ô tô', params: { message: message, showMS: true } })
        }
      }).catch(err => {
        this.message = "Thanh toán hợp đồng bị lỗi. Vui lòng liên hệ quản trị viên";
        this.show = true;
        this.erro = true;
        //this.$router.push({ name: 'Xe Ô tô', params: { message: message, showMS: true, erro: true } })
      });
    },

    async exportHoaDon(){
      const id = this.$route.params.id;
      const accessToken = await this.getToken();
      axios({
          method: 'post',
          url: '/thanhtoan/export',
          headers: {
              "x-access-token": accessToken
          },
          responseType: 'arraybuffer',
          data:{
              id
          },
      }).then(res => {
          
          let blob = new Blob([res.data], { type: 'application/pdf' }),
          url = window.URL.createObjectURL(blob)

          window.open(url) 
      }).catch(err => {
          console.log(err);
      });
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
