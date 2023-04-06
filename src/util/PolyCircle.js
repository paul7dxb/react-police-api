import { polyArrayToString } from "./ApiHelperFuncs";

const createCircleCoordinates = (lat, lon, radius) => {
	// Convert latitude and longitude from degrees to radians
	lat = (Math.PI / 180) * lat;
	lon = (Math.PI / 180) * lon;

	// Earth's radius in kilometers
	const earthRadius = 6371;

	// Calculate the angular distance covered by the radius
	const angularRadius = radius / earthRadius;

	// Initialize an array to store the circle coordinates
	const circleCoordinates = [];

	// Generate coordinates for each point along the circumference of the circle
	for (let i = 0; i <= 360; i += 3) {
		// Convert the current angle from degrees to radians
		const angle = (Math.PI / 180) * i;

		// Calculate the new latitude and longitude
		const newLat = Math.asin(
			Math.sin(lat) * Math.cos(angularRadius) +
				Math.cos(lat) * Math.sin(angularRadius) * Math.cos(angle)
		);
		const newLon =
			lon +
			Math.atan2(
				Math.sin(angle) * Math.sin(angularRadius) * Math.cos(lat),
				Math.cos(angularRadius) - Math.sin(lat) * Math.sin(newLat)
			);

		// Convert the new latitude and longitude from radians to degrees
		const newLatDegrees = (newLat * 180) / Math.PI;
		const newLonDegrees = (newLon * 180) / Math.PI;

		// Add the new coordinates to the circle coordinates array
		circleCoordinates.push({
			latitude: newLatDegrees,
			longitude: newLonDegrees,
		});
	}

	return circleCoordinates;
};

export const createCircleCoordinatesPoly = (lat, lon, radius) => {
	const polyArray = createCircleCoordinates(lat, lon, radius);
    return polyArrayToString(polyArray)
};
