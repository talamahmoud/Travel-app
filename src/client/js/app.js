const fetchCoordinates = async(location) => {
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=t_m_ismail`);
    if (!response.ok) {
        throw new Error(`GeoNames API error: ${response.status}`);
    }
    const data = await response.json();
    if(data.geonames && data.geonames.length > 0){
        const {lat, lng, countryName} = data.geonames[0];
        return {lat, lng, countryName};
    } else {
        throw new Error ('Location not found');
    }
};

const fetchWeather = async (lat, lng) => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=91ad168341c8431c93195cdf5565ddd4`);
    const data = await response.json();
    return data;
}

const fetchImage = async (location) => {
    const response = await fetch(`https://pixabay.com/api/?key=37159159-9a7916205a4b97e8393b6f6b7&q=${encodeURIComponent(location)}&image_type=photo`);
    const data = await response.json();
    if(data.hits.length > 0) {
        return data.hits[0].webformatURL;
    } else {
        return 'default_image_url';
    }
};

const calculateCountDown = (date) => {
    const tripDate = new Date (date);
    const today = new Date();
    const timeDifference = tripDate - today;
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days;
}

const calculateTripDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date (endDate);
    const duration = Math.ceil((end-start)/(1000 * 60 * 60 * 24));
    return duration;
}

const displayTripInfo = (coordinates, weather, image, startDate, endDate, tripDuration) => {
    const tripInfoDiv = document.getElementById('trip-info');
    const countdown = calculateCountDown(startDate);

    tripInfoDiv.innerHTML = `
      <h2>Trip to ${coordinates.countryName}</h2>
      <img src="${image}" alt="${coordinates.countryName}" class="trip-img">
      <p>Trip Start Date: ${startDate}</p>
      <p>End Date: ${endDate}</p>
      <p>Days until the trip start: ${countdown}</p>
      <p>Trip Duration: ${tripDuration} days</p>
      <p>Weather Forecast: ${weather.data[0].temp}°C, ${weather.data[0].weather.description}</p>
    `;
  };

  export {fetchCoordinates, fetchWeather, fetchImage, displayTripInfo, calculateTripDuration}

