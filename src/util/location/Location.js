export const getUserLocation = (successPositionCallback, errorPositionCallback) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			successPositionCallback, errorPositionCallback
		);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
};
