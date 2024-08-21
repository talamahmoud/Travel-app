import { getTripData } from "./js/app";
import './styles/styles.scss'

document.getElementById('trip-form').addEventListener('submit', async(e)=>{
    e.preventDefault();
    const location = document.getElementById('location').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    await getTripData(location, startDate,endDate);
})