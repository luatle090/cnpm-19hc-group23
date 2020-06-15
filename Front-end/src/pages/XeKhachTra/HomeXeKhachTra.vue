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
                                    <label>Ngày kiểm tra</label>
                                    <md-input v-model="filter.ngayKiemTra"></md-input>
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
                                    <button title="Chi tiết quá trình kiểm tra" type="button" @click="xemChiTiet(row.item.id)" 
                                        class="md-button md-just-icon md-theme-default md-info md-simple"
                                    >
                                        <div class="md-ripple"> <div class="md-button-content">
                                        <md-icon>info</md-icon>
                                        </div></div>
                                    </button>
                                    <button v-show="row.item.tinhTrang === 'Cần kiểm tra'" title="Cập nhật tình trạng" type="button" @click="updateKiemTra(row.item.id)" 
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
            title: 'Kiểm tra xe khách trả',
            currentPage: 1,
            perPage: 10,
            totalRows: 21,
            loai: 0,
            tinhTrang: '',
            isBusy: false,
            show: false,
            filter: {
                soHieuXe: "",
                ngayKiemTra: null,
                tinhTrang: "",
            },

            headers: [
                { key: 'soHieuXe', label: 'Số hiệu xe' },
                { key: 'hangXe', label: 'Hãng xe' },
                { key: 'ngayTraXe', label: 'Ngày trả xe' },
                { key: 'ngayKiemTra', label: 'Ngày kiểm tra' },
                { key: 'tinhTrang', label: 'Tình trạng' },
                { key: 'actions', label: 'Thao tác' }
            ],

            money: {
                thousands: ",",
                precision: 0,
                masked: false
            },

            dsHopDong: [
                {soHieuXe: "Toyota01", hangXe: "Toyota", ngayTraXe: "14/06/2020", ngayKiemTra: "14/05/2020", tinhTrang: "Cần kiểm tra"},
                {soHieuXe: "Huyndai02", hangXe: "Toyota", ngayTraXe: "09/06/2020", ngayKiemTra: "09/06/2020", tinhTrang: "Đã kiểm tra"},
                {soHieuXe: "Inova01", hangXe: "Toyota", ngayTraXe: "04/06/2020", ngayKiemTra: "04/06/2020", tinhTrang: "Cần kiểm tra"},
                {soHieuXe: "Inova02", hangXe: "Toyota", ngayTraXe: "14/06/2020", ngayKiemTra: "14/06/2020", tinhTrang: "Cần kiểm tra"},
                {soHieuXe: "Kia01", hangXe: "Toyota", ngayTraXe: "14/06/2020", ngayKiemTra: "14/06/2020", tinhTrang: "Cần kiểm tra"},
                {soHieuXe: "Kia03", hangXe: "Toyota", ngayTraXe: "14/06/2020", ngayKiemTra: "14/06/2020", tinhTrang: "Cần kiểm tra"},
                {soHieuXe: "Nissan02", hangXe: "Toyota", ngayTraXe: "03/06/2020", ngayKiemTra: "03/06/2020", tinhTrang: "Đã kiểm tra"},
                {soHieuXe: "Nissan01", hangXe: "Toyota", ngayTraXe: "03/06/2020", ngayKiemTra: "05/06/2020", tinhTrang: "Đã kiểm tra"},
                {soHieuXe: "Toyota02", hangXe: "Toyota", ngayTraXe: "06/06/2020", ngayKiemTra: "06/06/2020", tinhTrang: "Đã kiểm tra"},
                {soHieuXe: "Toyota03", hangXe: "Toyota", ngayTraXe: "03/06/2020", ngayKiemTra: "03/06/2020", tinhTrang: "Đã kiểm tra"},
                {soHieuXe: "Toyota05", hangXe: "Toyota", ngayTraXe: "14/06/2020", ngayKiemTra: "14/06/2020", tinhTrang: "Cần kiểm tra"},
            ]
        };
    },

    methods: {
        updateKiemTra(){
            this.$router.replace({name:'Cập nhật xe khách trả', params:{update : true}});
        },

        xemChiTiet(){
            this.$router.replace({path:'detailxekhachtra'});
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