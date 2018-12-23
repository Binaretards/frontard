import axios from 'axios';

export class ApiService {
    host: String = 'http://localhost:8080';

    getTables() {
        axios
            .get(`${this.host}/api/tables/get`)
            .then(response => console.log(response.data));
    }
}