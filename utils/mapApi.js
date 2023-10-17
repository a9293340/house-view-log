export const nearbySearch_async = async (states, obj, more = false) => {
	try {
		return await new Promise((resolve, reject) => {
			states.service.nearbySearch(obj, (nearPlace, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					resolve(more ? nearPlace : nearPlace[0]);
				} else {
					reject(new Error("Failed to retrieve near place details"));
				}
			});
		});
	} catch (error) {
		return false;
	}
};

export const makeMarker = (states, lat, lng, title, url, size = 50) => {
	let options = {
		position: { lat, lng },
		map: states.map,
		title,
	};

	if (url)
		options["icon"] = {
			url,
			scaledSize: new google.maps.Size(size, size),
			anchor: new google.maps.Point(size / 2, size / 2),
		};

	return new states.google.maps.Marker(options);
};

export const setMapNull = (mark) => {
	mark.setMap(null);
	mark = null;
};

export const nearbyApi = async (lat, lan, r, keyword) =>
	await $fetch(
		`/maps/api/place/nearbysearch/json?location=${lat},${lan}&radius=${r}&keyword=${keyword}&key=${
			import.meta.env.VITE_MAPKEY
		}`
	);

export const getMapPhoto = (photo_reference) =>
	`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${
		import.meta.env.VITE_MAPKEY
	}`;
