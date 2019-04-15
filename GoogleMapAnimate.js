
    var map = undefined;
    var marker = undefined;
    var position = [37.77, -122.448];
    var poly, geodesicPoly;//3

    function initialize() {
        var latlng = new google.maps.LatLng(position[0], position[1]);
        var directionsService = new google.maps.DirectionsService; //2
        var directionsDisplay = new google.maps.DirectionsRenderer; //2
        var myOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map); //2
        calculateAndDisplayRoute(directionsService, directionsDisplay); //2
        console.log("LSLSL", map)
    
        marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Your current location!",
            "icon": icon
        });
        
        marker2 = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Your current location!"
        });

        var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
        var icon = {
            path: car,
            scale: .7,
            strokeColor: 'white',
            strokeWeight: .10,
            fillOpacity: 1,
            fillColor: '#404040',
            offset: '5%',
            // rotation: parseInt(heading[i]),
            anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
        };

        geodesicPoly = new google.maps.Polyline({
            strokeColor: '#CC0099',
            strokeOpacity: 1.0,
            strokeWeight: 3,
            geodesic: true,
            map: map
        });

        google.maps.event.addListener(directionsDisplay, "directions_changed", function(ddd){
        });
        //google.maps.event.addListener(map, 'click', function(me) {
            let x = 37.768, y = -122.511
            console.log("LLLLLLLLL", marker.getPosition())
            

            // setInterval(()=>{
            //     var result = [x, y];
            //      var path = [marker.getPosition(), new google.maps.LatLng(x, result[1])];
            //      //poly.setPath(path);
            //      // geodesicPoly.setPath(path);
            //     console.log("KKKKKKK", new google.maps.LatLng(x, result[1]), marker2.getPosition())
                
            //     if(x > 37.789){
            //           y = y + 0.001 
            //         }else{
            //             x = x + 0.001
            //         }
            //        var heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
            //          console.log("LLLLLLLLLwwww", heading)
            //          icon.rotation = heading;
            //          marker.setIcon(icon);
            //     transition(result);
            // }, 1000)
            
        //});
    }
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var selectedMode = "DRIVING";
        directionsService.route({
          origin: {lat: 37.77, lng: -122.447},  // Haight.
          destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode],

        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    } //2

    var numDeltas = 250;
    var delay = 10; //milliseconds
    var i = 0;
    var deltaLat;
    var deltaLng;
    function transition(result){
        i = 0;
        deltaLat = (result[0] - position[0])/numDeltas;
        deltaLng = (result[1] - position[1])/numDeltas;
        moveMarker();
    }
    
    function moveMarker(){
        position[0] += deltaLat;
        position[1] += deltaLng;
        var latlng = new google.maps.LatLng(position[0], position[1]);
        marker.setPosition(latlng);
        if(i!=numDeltas){
            i++;
            setTimeout(moveMarker, delay);
        }
    }


