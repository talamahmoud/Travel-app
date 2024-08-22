import { calculateTripDuration } from "../app";

test('calculateTripDuration should return the correct number of days', () => {
    const duration = calculateTripDuration('2024-08-22' , '2024-08-24');
    expect(duration).toBe(2);
})
