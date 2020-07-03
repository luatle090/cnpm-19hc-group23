<template>
<div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form v-on:submit.prevent="taoHopDong">
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
                    <md-input v-bind:value="hopDong.hoTen" required type="text" ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>CMND</label>
                    <md-input required v-model.number="hopDong.CMND" type="text"> </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Địa chỉ</label>
                    <md-input v-model.trim="hopDong.diaChi" required type="text" ></md-input>
                  </md-field>
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="hopDong.ngayThueXe" required md-immediately>
                      <label>Ngày thuê xe</label>
                    </md-datepicker>    
                </div>
                  <div class="md-layout-item md-small-size-100 md-size-100">
                    <md-datepicker v-model="hopDong.ngayTraXe" required md-immediately>
                      <label>Ngày trả xe</label>
                    </md-datepicker>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <md-field>
                    <label>Số hiệu xe</label>
                    <md-input v-model.trim="hopDong.soHieuXe" required type="text" ></md-input>
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
      hopDong: {
        maHopDong: "",
        hoTen: "",
        CMND: "",
        diaChi: "",
        ngayTraXe: null,
        ngayThueXe: null,
        soHieuXe: "",
      },
      title: "Tạo hợp đồng"
    };
  },

  mounted() {
    if(this.update === true){
      this.getHopDongById(this.$route.params.id);
    }
  },

  methods: {
    ...mapActions(["getToken"]),

    taoHopDong(){
      this.show = true;
      if(this.update === true){
        this.message = "Cập nhật hợp đồng thành công";
      }
      else{
        this.maHD = "HD0001";
        this.message = "Tạo hợp đồng thành công";
      }
    },

    updateHopDong(){
      this.maHD = "HD0001";
      this.title = "Cập nhật hợp đồng";
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

  }

  // methods: {
  //   ...mapActions(["getToken"]),

  //   async truyVanSoTK(){
  //       const accessToken = await this.getToken();
  //       this.messageSoTK = "",
  //       this.hoTen = "";
  //       this.idTaiKhoanNo = "";
  //       axios({
  //           method: "get",
  //           url: `/taikhoannganhang/${this.soTK}`,
  //           headers:{
  //               "x-access-token" : accessToken
  //           },
  //       }).then(res => {
  //           if(res.status === 200){
  //               this.hoTen = res.data.hoTen;
  //               this.idTaiKhoanNo = res.data.id
  //           }
  //           else if(res.status === 204){
  //               this.messageSoTK = "Không tồn tại tài khoản này"
  //               this.soTK = "";
  //           }
  //       }).catch(erro => {
  //           this.show = true;
  //           this.message = "Có lỗi xảy ra";
  //           this.erro = true;
  //       })
  //   },

  //   async taoNhacNo(){
  //     this.show = true;
  //     const accessToken = await this.getToken();
  //     const data = {
  //         idTaiKhoanNo: this.idTaiKhoanNo,
  //         tienNo: this.tienNo,
  //         noiDung: this.noiDung
  //     }

  //     axios({
  //       method: "post",
  //       url: "/nhacno",
  //       headers:{
  //           "x-access-token" : accessToken
  //       },
  //       data: data
  //     }).then(res => {
  //       this.daChuyenXong = true;
  //       if(res.status === 201){
  //         this.show = false;
  //         const showMS = true;
  //         this.$router.replace({path:'nhacno', params:{showMS}});
  //       }
  //       else if (res.status === 204){
  //         this.message = "Lỗi tạo nhắc nợ";
  //         this.erro = true;
  //       }
  //     }).catch( err => {
  //       if (err.response.status === 400){
  //         this.message = "Nhập thiếu trường dữ liệu";
  //         this.erro = true;
  //       }
  //       else if(err.response.status === 404){
  //         this.message = "Không tìm thấy tài khoản nhắc nợ";
  //         this.erro = true;
  //       }
  //       else if (err.response.status === 409){
  //         this.message = "Người gửi và người nhận là một. Vui lòng chọn số tài khoản khác";
  //         this.erro = true;
  //       }
  //       else{
  //         this.message = "Có lỗi xảy ra";
  //         this.erro = true;
  //       }
  //     });
  //   }
  // }
};
</script>
<style scoped>
  .btn-huy{
    margin-right:40px;
  }
</style>>
