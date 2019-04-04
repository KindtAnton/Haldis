var map = L.map('mapid').setView([
    51.0231119, 3.7102741
], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


function performRequest(url, location, success_callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            var data = JSON.parse(this.response);
            success_callback(location, data);
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function() {
        console.log("Error requestion location coordinates");
        // There was a connection error of some sort
    };
    request.send();
}

let marker_icon = L.icon({
    iconUrl: "/static/images/marker-icon.png",
    shadowUrl: "/static/images/marker-shadow.png"
});

let callback = function OSMCallBack(location, data) {
    var lat, lon;
    if (data.features.length >= 1) {
        var place = data.features[0].properties;
        lat = data.features[0].geometry.coordinates[1];
        lon = data.features[0].geometry.coordinates[0];

        let marker = L.marker([lat, lon], {
                icon: marker_icon
            }).addTo(map)
            .bindPopup(location.name + ', ' + location.address);

        marker.on('mouseover', function(env) {
            marker.openPopup();
        });
        marker.on('mouseout', function(env) {
            marker.closePopup();
        });
    } else {
        console.log(`Location ${JSON.stringify(location, null, 2)} returned no features, are you sure this is a valid address?`);
    }
};

function loadmap(locations) {
    for (let loc of locations) {
        let request_uri = "https://photon.komoot.de/api/?limit=1&q=" + loc.address;
        performRequest(request_uri, loc, callback);
    };
}
