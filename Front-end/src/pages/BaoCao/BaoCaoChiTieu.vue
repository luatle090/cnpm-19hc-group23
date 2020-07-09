<template>
    <div class="content">
        <div class="md-layout">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h4 class="title">{{ title }}</h4>
                    </md-card-header>
                    <md-card-content>
                        <!-- <div> 
                            <md-radio v-model="baoCao" value="ngay">Báo cáo doanh số ngày</md-radio>
                            <md-radio v-model="baoCao" value="thang" class="md-primary">Báo cáo doanh số tháng</md-radio>
                        </div> -->
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="ngayBaoCao" required md-immediately>
                                    <label>Ngày</label>
                                </md-datepicker>
                            </div>
                        </div>
                        <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                             <md-button @click="xuatBaoCao" class="btn-search md-raised md-success">Xem báo cáo</md-button>
                        </div>
                        <div>
                            <b-table id="my-table" striped hover show-empty
                                :items="dsBaoCao"
                                :fields="headers"
                                responsive
                            >
                                <template v-slot:cell(STT)="data">
                                    {{ data.index + 1 }}
                                </template>
                                <template v-slot:empty>
                                    <h4>Không có dữ liệu</h4>
                                </template>
                            </b-table>
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
import { mapActions } from "vuex";

export default {
    data() {
        return {
            title: 'Báo cáo chi tiêu',
            baoCao: 'ngay',
            ngayBaoCao: null,
            headers: [
                'STT',
                { key: 'ngay', label: 'Ngày' },
                { key: 'tenPhuTung', label: 'Tên phụ tùng' },
                { key: 'giaPhuTung', label: 'Giá phụ tùng' },
            ],

            dsBaoCao: [],

        };
    },

    methods: {
        ...mapActions(['getToken']),

        async xuatBaoCao(){
            const accessToken = await this.getToken();
            const ngayBaoCao = Number(this.ngayBaoCao);
            axios({
                method: 'get',
                url: '/baocao/chi',
                headers: {
                    "x-access-token": accessToken
                },
                params: {
                    ngayBaoCao
                }
            }).then(res => {
                if(res.status === 204){
                    this.dsBaoCao = [];
                }
                else {
                    this.dsBaoCao = res.data;
                }    
            }).catch(err => {
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