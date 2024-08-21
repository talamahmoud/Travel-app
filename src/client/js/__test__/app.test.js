import { fetchWeaterData } from "../app";

test('should fetch weather data for the given', async () =>{
    const lat = 51.507;
    const lng = -0.1278;
    const date = '2024-08-21';

    const weatherData = await fetchWeaterData(lat,lng,date);
    expect(weatherData.temp).toBeDefined();
})