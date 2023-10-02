<template>
    <div class="card-info">
        <pv-card v-if="averageValues">
            <template #header>
            <img src="https://m.media-amazon.com/images/I/71Oy-vLGCoL._AC_UF1000,1000_QL80_.jpg" alt="treadmill picture" style="width:18vw;">
            </template>
            <template #title>Average Performance</template>
            <template #content>
                <p>Volts: {{ averageValues.volts }}</p>
                <p>Watts: {{ averageValues.watts }}</p>
                <p>HP: {{ averageValues.hp }}</p>
            </template>
        </pv-card>
      <div v-else>Loading...</div>
    </div>
</template>
<script>
import { TreadmillDataService } from '../services/treadmill-data.service.js';

export default {
  name: 'HomeComponent',
  data() {
    return {
      averageValues: { volts: '', watts: '', hp: '' , otro: ''},
      treadmillService: null
    };
  },
  created() {
    this.treadmillService= new TreadmillDataService();
    this.treadmillService.getAllHealthChecks()
    .then(async (healthChecksResponse) => {
        const healthChecks = healthChecksResponse.data;
        const treadmillsResponse = await this.treadmillService.getAllTreadmills();
        const treadmills = treadmillsResponse.data;
        const validHealthChecks = await Promise.all(healthChecks.filter(async (hc) => {
        const treadmill = treadmills.find((t) => t._id === hc.treadmill);
        return treadmill && hc.hp !== 0;
        }));
        const voltsSum = validHealthChecks.reduce((acc, hc) => acc + hc.volts, 0);
        const wattsSum = validHealthChecks.reduce((acc, hc) => acc + hc.watts,0);
        const hpSum = validHealthChecks.reduce((acc, hc) => acc + hc.hp, 0);
        const averageValues = {
            volts: Math.round((voltsSum / 6) * 100) / 100,
            watts: Math.round((wattsSum / validHealthChecks.length) * 100) / 100,
            hp: Math.round((hpSum / validHealthChecks.length) * 100) / 100,
        };
        this.averageValues = averageValues;
    });
  }
};
</script>
<style scoped>
.card-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5vw;
}
.card-info pv-card {
  width: auto;
  max-width: 100%;
  margin: 0 auto;
}
</style>