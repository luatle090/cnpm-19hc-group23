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
                                    <label>Mã hợp đồng</label>
                                    <md-input v-model="filter.maHD"></md-input>
                                </md-field>
                            </div>
                             <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-field>
                                    <label>Tình trạng</label>
                                    <md-input v-model="filter.tinhTrang"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="filter.ngayThueXe" required md-immediately>
                                    <label>Ngày thuê xe</label>
                                    <md-input v-model="filter.maHD"></md-input>
                                </md-datepicker>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="filter.ngayTraXe" required md-immediately>
                                    <label>Ngày trả xe</label>
                                </md-datepicker>
                            </div>
                        </div>

                         <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                             <md-button class="btn-search md-raised md-success">Tìm kiếm</md-button>
                            <md-button type="button" to="/taohopdong" class="md-raised md-success btn-size">
                                Thêm xe thuê
                            </md-button>
                        </div>
                        <div>
                            <b-table id="my-table" striped hover 
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
                                    @input="getNhacNo"
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
    props: ['showMS'],
    data() {
        return {
            title: 'Hợp đồng',
            currentPage: 1,
            perPage: 10,
            totalRows: 21,
            loai: 0,
            tinhTrang: '',
            isBusy: false,
            show: false,
            filter: {
                maHD: "",
                ngayThueXe: null,
                ngayThueXe: null,
                tinhTrang: "",
            },

            message: 'Tạo nhắc nợ thành công',
            headers: [
                { key: 'soHieuXe', label: 'Mã hợp đồng' },
                { key: 'hangXe', label: 'Họ tên' },
                { key: 'dongXe', label: 'Số hiệu xe' },
                { key: 'giaChoThue', label: 'Ngày thuê xe' },
                { key: 'percentDatCoc', label: '% Đặt cọc' },
                { key: 'actions', label: 'Thao tác' }
            ],

            money: {
                thousands: ",",
                precision: 0,
                masked: false
            },

            dsHopDong: [
                {soHieuXe: "Toyota01", hangXe: "Toyota", dongXe: "Sendai", giaChoThue: "170.000 VNĐ", percentDatCoc: "5%" },
                {soHieuXe: "Toyota01", hangXe: "Toyota", dongXe: "Sendai", giaChoThue: "120.000 VNĐ", percentDatCoc: "10%" },
                {soHieuXe: "Huyndai02", hangXe: "Toyota", dongXe: "Sendai", giaChoThue: "100.000 VNĐ", percentDatCoc: "15%" },
                {soHieuXe: "Inova01", hangXe: "Toyota", dongXe: "SUV", giaChoThue: "100.000 VNĐ", percentDatCoc: "20%" },
                {soHieuXe: "Inova02", hangXe: "Toyota", dongXe: "SUV", giaChoThue: "100.000 VNĐ", percentDatCoc: "15%" },
                {soHieuXe: "Kia01", hangXe: "Toyota", dongXe: "Sendai", giaChoThue: "110.000 VNĐ", percentDatCoc: "15%" },
                {soHieuXe: "Nissan01", hangXe: "Toyota", dongXe: "Sendai", giaChoThue: "715.000 VNĐ", percentDatCoc: "15%" },
                {soHieuXe: "Nissan02", hangXe: "Toyota", dongXe: "Sendai", giaChoThue: "435.000 VNĐ", percentDatCoc: "5%" },
                {soHieuXe: "Kia03", hangXe: "Toyota", dongXe: "SUV", giaChoThue: "460.000 VNĐ", percentDatCoc: "5%" },
                {soHieuXe: "Toyota03", hangXe: "Toyota", dongXe: "SUV", giaChoThue: "670.000 VNĐ", percentDatCoc: "5%" },
            ]
        };
    },

    methods: {
        updateHopDong(){
            this.$router.replace({name:'Tạo Hợp đồng', params:{update : true}});
        },

        thanhToanHopDong(){
            this.$router.replace({path:'thanhtoan'});
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