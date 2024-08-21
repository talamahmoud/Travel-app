const getTripData = async(location, startDate, endDate) => {
    try{
        const geoData = await fetchGeoData(location);
        const weatherData  = await fetchWeaterData(geoData.lat, geoData.lng, startDate);
        const imageData = await fetchImageData(location);

        const tripLength = calculateTripLength(startDate,endDate)
        updateUI(geoData, weatherData , imageData,tripLength);
    } catch (error){
        console.error('Error in fetching rtip data',error);
    }
}

const calculateTripLength = (startDate,endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end-start);
    return Math.ceil(timeDiff / (1000*60*60*24));
}

const fetchGeoData = async (location) => {
    try{
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=t_m_ismail`);
        const data = await response.json();
        if (data.geonames && data.geonames.length > 0) {
            return data.geonames[0];
        } else {
            throw new Error('No geo data found for the specified location');
        }
    } catch (error) {
        console.error('Error in fetching geo data', error);
        return null;
    }
}

const fetchWeaterData = async (lat, lng, startDate) => {
    try{
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=91ad168341c8431c93195cdf5565ddd4`);
        const data = await response.json();
        return data.data[0];
    } catch (error) {
        console.error('Error in fetching weather trip data', error);
    }
}

const fetchImageData = async (location) => {
    try{
        const response = await fetch(`https://pixabay.com/api/?key=37159159-9a7916205a4b97e8393b6f6b7&q=${location}&image_type=photo`);
        const data = await response.json();
        return data.hits[0];
    } catch (error) {
        console.error('Error in fetching image data', error);
    }
}

const updateUI = (geoData, weatherData , imageData) => {
    const tripDetails = document.getElementById('trip-details');
    tripDetails.innerHTML = `
    <h2>Your Trip to ${geoData.name}, ${geoData.countryName}</h2>
    <p>Weather: ${weatherData.weather.description}, ${weatherData.temp}°C</p>
    <p>Trip Length: ${tripLength} days</p>
    <img src="${imageData.webformatURL}" alt="${geoData.name}">
    `
}

export { fetchGeoData, getTripData, fetchWeaterData, fetchImageData };

