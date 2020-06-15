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
                                    <label>Tình trạng</label>
                                    <md-input v-model="filter.tinhTrang"></md-input>
                                </md-field>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="filter.ngayThueXe" required md-immediately>
                                    <label>Ngày bảo dưỡng lần cuối</label>
                                    <md-input v-model="filter.ngayBaoDuongLanCuoi"></md-input>
                                </md-datepicker>
                            </div>
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="filter.ngayThueXe" required md-immediately>
                                    <label>Ngày bảo dưỡng</label>
                                    <md-input v-model="filter.ngayBaoDuong"></md-input>
                                </md-datepicker>
                            </div>
                        </div>

                         <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                             <md-button class="btn-search md-raised md-success">Tìm kiếm</md-button>
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
                                    <button title="Chi tiết bảo dưỡng" type="button" @click="xemChiTiet(row.item.id)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>info</md-icon>
                                        </div></div>
                                    </button>
                                    <button v-show="row.item.tinhTrang === 'Cần bảo dưỡng'" title="Cập nhật bảo dưỡng" type="button" @click="updateBaoDuong(row.item.id)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>edit</md-icon>
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
            title: 'Bảo dưỡng',
            currentPage: 1,
            perPage: 10,
            totalRows: 21,
            loai: 0,
            tinhTrang: '',
            isBusy: false,
            show: false,
            filter: {
                soHieuXe: "",
                ngayBaoDuong: null,
                ngayBaoDuongLanCuoi: null,
                tinhTrang: "",
            },

            message: 'Tạo nhắc nợ thành công',
            headers: [
                { key: 'soHieuXe', label: 'Số hiệu xe' },
                { key: 'hangXe', label: 'Hãng xe' },
                { key: 'ngayBaoDuong', label: 'Ngày bảo dưỡng lần cuối' },
                { key: 'tinhTrang', label: 'Tình trạng' },
                { key: 'actions', label: 'Thao tác' }
            ],

            money: {
                thousands: ",",
                precision: 0,
                masked: false
            },

            dsHopDong: [
                {soHieuXe: "Toyota01", hangXe: "Toyota", ngayBaoDuong: "05/05/2020", tinhTrang: "Cần bảo dưỡng"},
                {soHieuXe: "Huyndai02", hangXe: "Toyota", ngayBaoDuong: "09/06/2020", tinhTrang: "Đã bảo dưỡng"},
                {soHieuXe: "Inova01", hangXe: "Toyota", ngayBaoDuong: "03/05/2020", tinhTrang: "Cần bảo dưỡng"},
                {soHieuXe: "Inova02", hangXe: "Toyota", ngayBaoDuong: "11/05/2020", tinhTrang: "Cần bảo dưỡng"},
                {soHieuXe: "Kia01", hangXe: "Toyota", ngayBaoDuong: "15/04/2020", tinhTrang: "Cần bảo dưỡng"},
                {soHieuXe: "Kia03", hangXe: "Toyota", ngayBaoDuong: "10/04/2020", tinhTrang: "Cần bảo dưỡng"},
                {soHieuXe: "Nissan02", hangXe: "Toyota", ngayBaoDuong: "03/06/2020", tinhTrang: "Đã bảo dưỡng"},
                {soHieuXe: "Nissan01", hangXe: "Toyota", ngayBaoDuong: "05/06/2020", tinhTrang: "Đã bảo dưỡng"},
                {soHieuXe: "Toyota02", hangXe: "Toyota", ngayBaoDuong: "06/06/2020", tinhTrang: "Đã bảo dưỡng"},
                {soHieuXe: "Toyota03", hangXe: "Toyota", ngayBaoDuong: "03/06/2020", tinhTrang: "Đã bảo dưỡng"},
                {soHieuXe: "Toyota05", hangXe: "Toyota", ngayBaoDuong: "03/04/2020", tinhTrang: "Cần bảo dưỡng"},
            ]
        };
    },

    methods: {
        updateBaoDuong(){
            this.$router.replace({name:'Cập nhật Bảo dưỡng', params:{update : true}});
        },

        xemChiTiet(){
            this.$router.replace({path:'detailBaoDuong'});
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