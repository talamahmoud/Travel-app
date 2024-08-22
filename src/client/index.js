import './styles/styles.scss';
import { fetchCoordinates, fetchWeather, fetchImage, displayTripInfo, calculateTripDuration } from './js/app';

document.getElementById('travel-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const location = document.getElementById('location').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    try {
        const coordinates = await fetchCoordinates(location);
        const weather = await fetchWeather(coordinates.lat, coordinates.lng);
        const image = await fetchImage(location);

        const tripDuration = calculateTripDuration(startDate,endDate);
        displayTripInfo(coordinates, weather, image,startDate,endDate, tripDuration);
    } catch(error) {
        console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please check your input or try again later.');
    }
})