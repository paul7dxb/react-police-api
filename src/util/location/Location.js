export const getUserLocation = (successPositionCallback, errorPositionCallback) => {
	if (navigator.geolocation) {
		const userLocation = navigator.geolocation.getCurrentPosition(
			successPositionCallback
		);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
};
