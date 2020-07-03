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
                                :busy="isBusy"
                            >
                            <template v-slot:table-busy>
                                <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                                </div>
                            </template>
                            <template v-slot:empty>
                                <h4>Không có dữ liệu</h4>
                            </template>
                            <template v-slot:cell(actions)="row">
                                <div class="md-table-cell-container">
                                    <button title="Chi tiết" type="button" @click="detailedNhacNo(row.item.id)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>info</md-icon>
                                        </div></div>
                                    </button>
                                    <button title="Cập nhật" v-show="row.item.tinhTrang == 'Đang thuê'" type="button" @click="updateHopDong(row.item.idHopDong)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>edit</md-icon>
                                        </div></div>
                                    </button>
                                    <button type="button" v-show="row.item.tinhTrang == 'Đang thuê'" title="Xóa" @click="deleteNhacNo(row)" 
                                        class="md-button md-just-icon md-theme-default md-danger md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>delete</md-icon>
                                        </div></div>
                                    </button>
                                    <button title="Xuất hợp đồng" type="button"
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>save_alt</md-icon>
                                        </div></div>
                                    </button>
                                    <button v-show="row.item.tinhTrang == 'Đang thuê'" title="Thanh toán hợp đồng" type="button" @click="thanhToanHopDong"
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
            isBusy: false,
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

            dsHopDong: [
            //     {idHopDong: 1, maHD: "HD0001", hoTen: "Lê Hoàng Luật", soHieuXe: "Toyota01", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Đang thuê"},
            //     {maHD: "HD0002", hoTen: "Nguyễn Ngọc Châu", soHieuXe: "Huyndai02", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Đang thuê"},
            //     {maHD: "HD0003", hoTen: "Nguyễn Mỹ Linh", soHieuXe: "Inova01", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Đang thuê"},
            //     {maHD: "HD0104", hoTen: "Nguyễn Minh Quân",soHieuXe: "Inova02", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Hoàn tất"},
            //     {maHD: "HD0105", hoTen: "Trần Anh Tuấn", soHieuXe: "Kia01", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Hoàn tất"},
            //     {maHD: "HD0200", hoTen: "Lê Mỹ Linh", soHieuXe: "Kia03", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Hoàn tất"},
            //     {maHD: "HD0201", hoTen: "Nguyễn Anh Thư", soHieuXe: "Nissan02", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Đang thuê"},
            //     {maHD: "HD0211", hoTen: "Nguyễn Như Ngân",soHieuXe: "Nissan01", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Đang thuê"},
            //     {maHD: "HD0215", hoTen: "Trần Tuấn Anh", soHieuXe: "Toyota02",ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Đang thuê"},
            //     {maHD: "HD0301", hoTen: "Lê Khả Như", soHieuXe: "Toyota03",ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Hoàn tất"},
            //     {maHD: "HD0302", hoTen: "Nguyễn Minh Quân", soHieuXe: "Toyota05", ngayThueXe: "14/06/2020", ngayTraXe: "22/06/2020", tinhTrang: "Hoàn tất"},
             ]
        };
    },

    mounted(){
        this.getHopDong();
    },

    methods: {
        ...mapActions(["getToken"]),

        updateHopDong(id){
            console.log(id);
            this.$router.push({name:'Cập nhật hợp đồng', params:{id}});
        },

        thanhToanHopDong(){
            this.$router.replace({path:'thanhtoan'});
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
    },
    
    // mounted() {
    //     console.log(this.showMS);
    //     this.show = this.showMS;
    // },
    // computed: {
    //     ...mapGetters(["dsNhacNo", "totalRows"])
    // },
    // created(){
    //     this.getNhacNo();
    //     this.setupSSE();
    // },
    // methods: {
    //     ...mapActions([
    //         "getToken", 
    //         "fetchNhacNo", 
    //         "deleteNhacNoAndGetMore",
    //         "addHeadNhacNoList"
    //     ]),
    //     getNhacNo(){
           
    //         const params = {
    //             tinhTrang: this.tinhTrang,
    //             loai: this.loai,
    //             limit: this.perPage,
    //             offset: this.currentPage - 1
    //         }
    //         this.fetchNhacNo(params);
    //     },
    //     async setupSSE(){
            
    //         if (typeof(EventSource) === 'undefined') {
    //             console.log('not support');
    //             return;
    //         }
    //         const accessToken = await this.getToken();
    //         var eventSourceInitDict = {headers: {'x-access-token': accessToken}};
    //         var src = new EventSource('http://localhost:3000/api/nhacNoAddedEvent', eventSourceInitDict);
            
    //         src.onerror = function(e) {
    //             if(e.eventPhase == EventSource.CLOSED){
    //                 src.close();
    //                 console.log("Event Source Closed");
    //             }
    //             else{
    //                 console.log('error: ' + e);
    //             }
    //         }

    //         src.addEventListener('NHACNO_ADDED', function(e) {
    //             var data = JSON.parse(e.data);
    //             //console.log(data);
    //             this.addHeadNhacNoList(data);
    //         }.bind(this), false);
    //     },

    //     // async getNhacNo(){
    //     //     const accessToken = await this.getToken();

    //     //     return axios.get("/nhacno", {
    //     //         headers: {
    //     //         "x-access-token": accessToken
    //     //         },
    //     //         params: {
    //     //             tinhTrang: '',
    //     //             loai: 0,
    //     //             limit: this.perPage,
    //     //             offset: this.currentPage - 1
    //     //         }
    //     //     })
    //     //     .then(res => {
    //     //         this.nhacNoList = res.data.listResult;
    //     //         this.rows =res.data.totalItems;
    //     //         return this.nhacNoList;
    //     //     })
    //     //     .catch(err => {
    //     //         console.log(err);
    //     //     });    
    //     // },
    //     async detailedNhacNo(){
    //         console.log("event detailed");
    //     },
    //     async deleteNhacNo(row){
    //         const info = {
    //             idNhacNo: row.item.id,
    //             tinhTrang: this.tinhTrang,
    //             loai: this.loai,
    //             limit: this.perPage,
    //             offset: this.currentPage - 1
    //         }
    //         this.isBusy = !this.isBusy;
    //         await this.deleteNhacNoAndGetMore(info);
    //         this.isBusy = !this.isBusy; 
    //     //     this.dsNhacNo.splice(row.index, 1);
    //     //     console.log(this.dsNhacNo);

    //     //     // const accessToken = await this.getToken();
    //     //     // axios.delete(`/nhacno/${row.item.id}`, {
    //     //     //     headers: {
    //     //     //     "x-access-token": accessToken
    //     //     //     }
    //     //     // })
    //     //     // .then(res => {
    //     //     //     this.nhacNoList = res.data.listResult;
    //     //     //     this.rows =res.data.totalItems;
    //     //     //     return this.nhacNoList;
    //     //     // })
    //     //     // .catch(err => {
    //     //     //     console.log(err);
    //     //     // });
    //     }
    // },
    // directives: {
    //     money: VMoney
    // }
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