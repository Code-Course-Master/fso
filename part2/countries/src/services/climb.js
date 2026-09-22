import axios from "axios";

const url = "https://api.openweathermap.org/data/2.5/weather"
const apikey = import.meta.env.VITE_SOME_KEY

const getClimb = (capital) => {
    const request = axios.get(`${url}?q=${capital}&appid=${apikey}&units=metric`)
    return request.then(response => response.data)
}

export default { getClimb };