import axios from 'axios';

export class ApiService {
    host: String = 'http://localhost:8080/api';

    ping() {
        axios
            .post(`${this.host}/ping`)
            .then(response => console.log(response.data));
    }

    getTables() {
        axios
            .get(`${this.host}/tables/get`)
            .then(response => console.log(response.data));
    }

    saveTables() {
        axios
            .get(`${this.host}/tables/save`)
            .then(response => console.log(response.data));
    }

    discardTables() {
        axios
            .post(`${this.host}/tables/discard`)
            .then(response => console.log(response.data));
    }

    savePaths() {
        axios
            .post(`${this.host}/paths/save`)
            .then(response => console.log(response.data));
    }

    getPaths() {
        axios
            .get(`${this.host}/paths/get`)
            .then(response => console.log(response.data));
    }

    addRows() {
        axios
            .post(`${this.host}/rows/add`)
            .then(response => console.log(response.data));
    }

    removeRows() {
        axios
            .post(`${this.host}/rows/remove`)
            .then(response => console.log(response.data));
    }

    editFields() {
        axios
            .post(`${this.host}/fields/edit`)
            .then(response => console.log(response.data));
    }
}