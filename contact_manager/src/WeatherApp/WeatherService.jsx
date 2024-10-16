import axios from "axios";

export class WeatherService {
    static serverURl = "http://localhost:8000/Data";

    static getAllData() {

        return axios.get(this.serverURl);

    }
}