import http from '../core/http-common'


//hacer un getall por endpoint del dbjson
export class TreadmillDataService{
    getAllCenters() {
        return http.get('/centers')
    }
    getCenterById(id) {
        return http.get(`/centers/${id}`)
    }
    getAllHealthChecks() {
        return http.get('/health-checks')
    }
    getHealthCheckById(id) {
        return http.get(`/health-checks/${id}`)
    }
    getAllTreadmills() {
        return http.get('/treadmills')
    }
    getTreadmillById(id) {
        return http.get(`/treadmills/${id}`)
    }
}
