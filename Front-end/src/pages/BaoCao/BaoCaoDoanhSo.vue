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
                        <div> 
                            <md-radio v-model="baoCao" value="ngay">Báo cáo doanh số ngày</md-radio>
                            <md-radio v-model="baoCao" value="thang" class="md-primary">Báo cáo doanh số tháng</md-radio>
                        </div>
                        <div class="md-layout">
                            <div class="md-layout-item md-small-size-100 md-size-30">
                                <md-datepicker v-model="ngayBaoCao" required md-immediately>
                                    <label>Ngày</label>
                                </md-datepicker>
                            </div>
                        </div>

                         <div class="md-layout-item md-small-size-100 md-size-100 text-right">
                             <md-button @click="xuatBaoCao" class="btn-search md-raised md-success">Xuất báo cáo</md-button>
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

export default {
    data() {
        return {
            title: 'Báo cáo doanh số',
            baoCao: 'ngay',
            ngayBaoCao: '14/06/2020',
            show: false,
        };
    },

    methods: {
        xuatBaoCao(){
            this.show = true;
            this.message =  "Xuất báo cáo thành công";
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