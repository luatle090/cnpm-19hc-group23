<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
                <b-alert v-model="show" variant="success"  dismissible>{{ message }}</b-alert>
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">{{ title }}</h4>
                    </md-card-header>
                    <md-card-content>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <label>Số hiệu xe</label>
                                    <md-input v-model="filter.soHieuXe"></md-input>
                                </md-field>
                            </div>
                             <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <md-select v-model="filter.hangXe" @md-selected="getDongXe">
                                        <md-option value="-1">Hãng xe</md-option>
                                        <md-option v-for="hangXe in dsHangXe" 
                                            :key="hangXe.idHangXe" 
                                            :value="hangXe.idHangXe"
                                        >{{ hangXe.tenHangXe }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                             <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <md-select v-model="filter.dongXe">
                                        <md-option value="-1">Dòng xe</md-option>
                                        <md-option v-for="dongXe in dsDongXe" 
                                            :key="dongXe.idDongXe" 
                                            :value="dongXe.idDongXe"
                                        >{{ dongXe.tenDongXe }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <md-select v-model="filter.loaiXe" placeholder="Loại xe">
                                        <md-option value="-1">Loại xe</md-option>
                                        <md-option v-for="loaiXe in dsLoaiXe"
                                            :key="loaiXe.idLoaiXe" 
                                            :value="loaiXe.idLoaiXe"
                                        >{{ loaiXe.tenLoaiXe }}</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <md-select v-model="filter.tinhTrang">
                                        <md-option value="-1">Tình trạng xe</md-option>
                                        <md-option value="1">Sendai</md-option>
                                        <md-option value="2">SUV</md-option> 
                                    </md-select>
                                </md-field>
                            </div>
                        </div>

                         <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                            <md-button class="btn-search md-raised md-success" @click="getXeOto">Tìm kiếm</md-button>
                            <md-button type="button" to="/taoxeoto" class="md-raised md-success btn-size">
                                Thêm xe thuê
                            </md-button>
                        </div>
                        <div>
                            <b-table id="my-table" striped hover show-empty
                                :items="dsXeOto"
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
                                   <button title="Cập nhật" type="button" @click="updateXeOto(row.item.id)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>edit</md-icon>
                                        </div></div>
                                    </button>
                                    <button type="button" title="Xóa" @click="deleteXeOto(row)" 
                                        class="md-button md-just-icon md-theme-default md-danger md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>delete</md-icon>
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
                                    @input="getXeOto"
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
import { mapActions, mapGetters } from "vuex";
import EventSource from "eventsource";

export default {
    props: ['showMS'],
    data() {
        return {
            title: 'Quản lý xe ô tô',
            currentPage: 1,
            perPage: 10,
            totalRows: 0,
            loai: 0,
            tinhTrang: '',
            isBusy: false,
            message: '',
            show: false,
            filter: {
                soHieuXe: "",
                dongXe: -1,
                hangXe: -1,
                loaiXe: -1,
                tinhTrang: -1
            },

            headers: [
                { key: 'soHieuXe', label: 'Số hiệu xe' },
                { key: 'tenHangXe', label: 'Hãng xe' },
                { key: 'tenDongXe', label: 'Dòng xe' },
                { key: 'giaThue', label: 'Giá cho thuê' },
                { key: 'phanTramDatCoc', label: '% Đặt cọc' },
                { key: 'datCoc', label: 'Tiền đặt cọc' },
                { key: 'actions', label: 'Thao tác' }
            ],

            money: {
                thousands: ",",
                precision: 0,
                masked: false
            },
            dsHangXe: [],
            dsTinhTrang: [],
            dsDongXe: [],
            dsLoaiXe: [],
            dsXeOto: []
        };
    },

    watch: {
        
    },

    mounted() {
        this.getXeOto();
        this.getHangXe();
        this.getLoaiXe();
        //this.getTinhTrang();
    },

    methods: {
        ...mapActions(["getToken"]),

        updateXeOto(){
            this.$router.replace({name:'Tạo Ô tô', params:{update : true}});
        },

        async getXeOto(){
            const accessToken = await this.getToken();
            let properties = {
                limit: this.perPage,
                offset: this.currentPage - 1,
            };
            if("" !== this.filter.soHieuXe){
                properties.soHieuXe = this.filter.soHieuXe;
            }
            if(-1 !== Number(this.filter.dongXe)){
                properties.idDongXe = this.filter.dongXe;
            }
            if(-1 !== Number(this.filter.loaiXe)){
                properties.idLoaiXe = this.filter.loaiXe;
            }
            if(-1 !== Number(this.filter.hangXe)){
                properties.idHangXe = this.filter.hangXe;
            }


            return axios.get('/xeoto', {
                headers: {
                    "x-access-token": accessToken
                },
                params: properties
            }).then(res => {
                this.dsXeOto = res.data.listResult;
                this.totalRows =res.data.totalItems;
                //return this.lichSuList;
            }).catch( err => {
                console.log(err);
            })
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
            })
        },

        async getDongXe(){
            this.filter.dongXe = -1;
            if(-1 !== Number(this.filter.hangXe)){
                const accessToken = await this.getToken();
                axios.get(`/dongxe/hangxe/${this.filter.hangXe}`, {
                    headers: {
                        "x-access-token": accessToken
                    }
                }).then(res => {
                    this.dsDongXe = res.data;
                }).catch( err => {
                    console.log(err);
                })
            }
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
            })
        },

        async getTinhTrang(){
            const accessToken = await this.getToken();
            return axios.get('/hangxe', {
                headers: {
                    "x-access-token": accessToken
                }
            }).then(res => {
                this.dsTinhTrang = res.data;
            }).catch( err => {
                console.log(err);
            })
        }
    }
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