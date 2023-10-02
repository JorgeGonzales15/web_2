<template>
    <div class="record-table">
      <pv-data-table
        ref="dt"
        :value="enrichedHealthChecks"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalHealthChecks} healthChecks"
        responsiveLayout="scroll"
        >
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Treadmills Health Check Information</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <pv-input-text v-model="filters['global'].value" placeholder="Search" />
            </span>
          </div>
        </template>
        <pv-column field="id" header="Record ID" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="treadmillId" header="Treadmill ID" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="serialNumber" header="Serial Number" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="centerName" header="Center Name" :sortable="true" style="min-width: 10rem"></pv-column>
        <pv-column field="date" header="Date" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="time" header="Time" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="volts" header="Volts" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="watts" header="Watts" :sortable="true" style="min-width: 8rem"></pv-column>
        <pv-column field="hp" header="HP" :sortable="true" style="min-width: 8rem"></pv-column>
      </pv-data-table>
    </div>
  </template>
<script>
import { FilterMatchMode } from "primevue/api";
import { TreadmillDataService } from "../services/treadmill-data.service";
export default {
    name: 'HealthCheckComponent',
    data() {
        return {
            healthChecks: [], //importante si no nosale data del propi dbjson
            filters: {},
            treadmillService: new TreadmillDataService(), //improtante si no nosale data
            treadmills: [],  //improtante sino nosale data del propio dbjson
            centers: [], //impotante sino nosale data del propio dbjson
        };
    },
    created(){
        this.initFilters();
        this.loadHealthChecks();
    },
    methods: {
        initFilters() {
            this.filters = {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            };
        },
        loadHealthChecks() {
            this.treadmillService.getAllHealthChecks().then(response => {
                this.healthChecks = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        loadTreadmillsAndCenters() {
            this.treadmillService.getAllTreadmills().then(response => {
                this.treadmills = response.data;
            }).catch(error => {
                console.log(error);
            });

            this.treadmillService.getAllCenters().then(response => {
                this.centers = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
    },
    computed: {
        enrichedHealthChecks() {
            if (!this.treadmills || !this.centers) {
                return [];
            }

            return this.healthChecks.map(hc => {
                const treadmill = this.treadmills.find(t => t.id === hc.treadmillId);
                const center = this.centers.find(c => c.id === treadmill.centerId);
                return {
                    ...hc,
                    serialNumber: treadmill.serialNumber,
                    centerName: center.name,
                    date: `${hc.year}-${hc.month}-${hc.day}`,
                    time: `${hc.hour}:${hc.minutes}:${hc.seconds}`,
                };
            });
        },
    },
    mounted() {
        this.loadTreadmillsAndCenters();
    },
};
</script>
<style scoped>
</style>
