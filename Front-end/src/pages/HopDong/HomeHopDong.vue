<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
                <b-alert v-model="showMS" :variant="erro ? 'danger' : 'success'" dismissible>{{ message }}</b-alert>
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">{{ title }}</h4>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <label>Mã hợp đồng</label>
                                    <md-input v-model="filter.maHopDong"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="filter.ngayThueXe" required md-immediately>
                                    <label>Ngày thuê xe</label>
                                </md-datepicker>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="filter.ngayTraXe" required md-immediately>
                                    <label>Ngày trả xe</label>
                                </md-datepicker>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <label>Tình trạng</label>
                                    <md-input v-model="filter.tinhTrang"></md-input>
                                </md-field>
                            </div>
                        </div>

                         <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                            <md-button class="btn-search md-raised md-success" @click="getHopDong">Tìm kiếm</md-button>
                            <md-button type="button" to="/hopdong/taohopdong" class="md-raised md-success btn-size">
                                Tạo hợp đồng
                            </md-button>
                        </div>
                        <div>
                            <b-table id="my-table" striped hover show-empty
                                :items="dsHopDong"
                                :fields="headers"
                                :per-page="perPage"
                                responsive
                            >
                            
                            <template v-slot:empty>
                                <h4>Không có dữ liệu</h4>
                            </template>
                            <template v-slot:cell(actions)="row">
                                <div class="md-table-cell-container">
                                    <!-- <button title="Chi tiết" type="button" @click="detailedNhacNo(row.item.id)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>info</md-icon>
                                        </div></div>
                                    </button> -->
                                    <button title="Cập nhật" v-show="row.item.tinhTrang == 'Đang thuê'" type="button" @click="updateHopDong(row.item.idHopDong)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>edit</md-icon>
                                        </div></div>
                                    </button>
                                    <button type="button" v-show="row.item.tinhTrang == 'Đang thuê' && row.item.tinhTrangXe == 'Bình thường'" 
                                        title="Trả xe" 
                                        @click="showDialogTraXe(row.item)" 
                                        class="md-button md-just-icon md-theme-default md-danger md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>done</md-icon>
                                        </div></div>
                                    </button>
                                    <button title="Xuất hợp đồng" type="button"
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                        @click="exportHopDong(row.item.idHopDong)" 
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>save_alt</md-icon>
                                        </div></div>
                                    </button>
                                    <button title="Thanh toán hợp đồng" type="button"
                                        v-show="row.item.tinhTrang == 'Đã kiểm tra' || row.item.tinhTrang == 'Hoàn tất'"
                                        @click="thanhToanHopDong(row.item.idHopDong)"
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>attach_money</md-icon>
                                        </div></div>
                                    </button>
                                </div>
                            </template>
                            
                            </b-table>
                            <div class="paging-right md-card-actions md-alignment-space-between">
                                <div></div>
                                <b-pagination class="pagination-success "
                                    v-model="currentPage"
                                    :total-rows="totalRows"
                                    :per-page="perPage"
                                    @input="getHopDong"
                                    aria-controls="my-table"
                                ></b-pagination>
                            </div>
                        </div>
                        <!-- <simple-table table-header-color="green"></simple-table> -->
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <md-dialog :md-active.sync="showDialog">

        <md-card-content>
          <div class="md-layout primary">
            <div class="md-layout-item md-size-90">
                <div class="md-layout">
                    <div class="md-layout-item md-small-size-100 md-size-100">
                        <label>{{ messageTraXe }}</label>
                    </div>
                </div>
            </div>
          </div>
        </md-card-content>

        <md-dialog-actions>
            <md-button class="md-light" @click="showDialog = false">Đóng</md-button>
            <md-button class="md-success" v-show="showCapNhat" @click="traXe">Cập nhật</md-button>
        </md-dialog-actions>
    </md-dialog>
    </div>
</template>

<script>
import axios from "axios";
import { VMoney } from "v-money";
import { mapActions, mapGetters, mapMutations } from "vuex";
import EventSource from "eventsource";

export default {
    props: {
        showMS: {
            default: false,
            type: Boolean
        },
        erro: {
            default: false,
            type: Boolean
        },
        message: String
    },
    data() {
        return {
            title: 'Hợp đồng',
            currentPage: 1,
            perPage: 10,
            totalRows: 0,
            loai: 0,
            tinhTrang: '',
            showDialog: false,
            soHieuXe: "",
            idHopDong: 0,
            messageTraXe: "",
            showCapNhat: true,
            filter: {
                maHopDong: "",
                ngayThueXe: null,
                ngayTraXe: null,
                tinhTrang: "",
            },

            headers: [
                { key: 'maHopDong', label: 'Mã hợp đồng' },
                { key: 'hoTen', label: 'Họ tên' },
                { key: 'soHieuXe', label: 'Số hiệu xe' },
                { key: 'tenHangXe', label: 'Hãng xe' },
                { key: 'tenDongXe', label: 'Dòng xe' },
                { key: 'ngayThueXe', label: 'Ngày thuê xe' },
                { key: 'ngayTraXe', label: 'Ngày trả xe' },
                { key: 'tinhTrang', label: 'Tình trạng' },
                { key: 'actions', label: 'Thao tác' }
            ],

            money: {
                thousands: ",",
                precision: 0,
                masked: false
            },

            dsHopDong: []
        };
    },

    mounted(){
        this.getHopDong();
    },

    methods: {
        ...mapActions(["getToken"]),

        updateHopDong(id){
            this.$router.push({name:'Cập nhật hợp đồng', params:{id}});
        },

        thanhToanHopDong(id){
            this.$router.push({name:'Thanh toán', params: {id}});
        },

        showDialogTraXe(hopDong){
            this.showDialog = true;
            this.soHieuXe = hopDong.soHieuXe;
            this.idHopDong = hopDong.idHopDong;
            this.showCapNhat = true;
            this.messageTraXe = "Cập nhật khách hàng trả xe. Bạn có muốn tiếp tục?";
        },

        async traXe(){
            const accessToken = await this.getToken();
            const data = {
                soHieuXe: this.soHieuXe,
                idHopDong: this.idHopDong
            }
            axios({
                method: 'patch',
                url: 'traxe',
                headers: {
                    "x-access-token": accessToken
                },
                data
            }).then(res => {
                this.showCapNhat = false;
                this.messageTraXe = "Cập nhật thành công";
                //this.dsHopDong.find(hopDong => hopDong.idHopDong == this.idHopDong).tinhTrang = '';
            }).catch(err => {
                this.showCapNhat = false;
                this.messageTraXe = "Cập nhật thất bại. Vui lòng liên hệ Quản trị viên";
            })
        },

        async getHopDong(){
            const accessToken = await this.getToken();
            let properties = {
                limit: this.perPage,
                offset: this.currentPage - 1,
            };
            if("" !== this.filter.maHopDong){
                properties.maHopDong = this.filter.maHopDong;
            }
            if("" !== this.filter.tinhTrang){
                properties.tinhTrangHopDong = this.filter.tinhTrangHopDong;
            }
            if(this.filter.ngayThueXe){
                properties.ngayThueXe = Number(this.filter.ngayThueXe);
            }
            if(this.filter.ngayTraXe){
                properties.ngayTraXe = Number(this.filter.ngayTraXe);
            }


            return axios.get('/hopdong', {
                headers: {
                    "x-access-token": accessToken
                },
                params: properties
            }).then(res => {
                this.dsHopDong = res.data.listResult;
                this.totalRows =res.data.totalItems;
            }).catch( err => {
                console.log(err);
            })
        },

        async exportHopDong(id){
            const accessToken = await this.getToken();
            axios({
                method: 'post',
                url: '/hopdong/export',
                headers: {
                    "x-access-token": accessToken
                },
                responseType: 'arraybuffer',
                data:{
                    id
                },
            }).then(res => {
                console.log(res);
                let blob = new Blob([res.data], { type: 'application/pdf' }),
                url = window.URL.createObjectURL(blob)

                window.open(url) 
            }).catch(err => {
                console.log(err);
            });
        }
    },
};
</script>
<style scoped>
    .md-table-cell-container .md-button{
        margin: 0;
        padding: 5px;
        height: 27px;
        min-width: 27px;
        width: 27px;
        line-height: 27px;
    }
    .btn-layout-table{
        margin: 10px 0 20px 0;
    }
    .btn-size{
        height: 40px;
        width: 125px;
    }
    .btn-search{
        margin-right:40px;
    }
</style>