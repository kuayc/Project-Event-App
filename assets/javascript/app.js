$('document').ready(function () {
    console.log('heeeeere');

    navigator.geolocation.getCurrentPosition(function (position) {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;

        console.log(lat, lon);
        let apikey = 'cc5ff5524ad449ad9cd3d2a5117d86a2'

        let request_url = 'https://api.opencagedata.com/geocode/v1/json'
            + '?'
            + 'key=' + apikey
            + '&q=' + encodeURIComponent(lat + ',' + lon)
            + '&pretty=1'
            + '&no_annotations=1';
        $.ajax({
            url: request_url,
            method: 'GET',
            data: {
                'key': 'cc5ff5524ad449ad9cd3d2a5117d86a2',
                //'q': query,
                'no_annotations': 1
                // see other optional params:
                // https://opencagedata.com/api#forward-opt
            },
            dataType: 'json',
            statusCode: {
                200: function (response) {  // success
                    console.log(response.results[0].formatted);
                    console.log(response.results[0].components.city);
                    $("#city").val(response.results[0].components.city);
                    $("#zipCode").val(response.results[0].components.postcode);
                },


                // other possible response codes:
                // https://opencagedata.com/api#codes
            }
        });
    })

    $("#submitButton").on("click", function (e) {
        e.preventDefault();
        let city = $("#city").val();
        let zipCode = $("#zipCode").val();
        $("#city").val('');
        $("#zipCode").val('');
        const tm_apiKey = 'x3UXvhKAqJX1Gu3bi4XUEaGXBEiXI1Rm';
        const tm_url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${tm_apiKey}&city=${city}`
        $.ajax({
            url: tm_url,
            method: 'GET',
            dataType: "json"
        }).then((response) => {
            console.log('success', tm_url);
            console.log(response);
            let localEvents = response._embedded.events;
            console.log(localEvents);
            localEvents.forEach((evt) => {
                console.log(evt.name);
                console.log(evt._embedded.venues[0].name);
                console.log(evt.classifications[0].segment.name);
                console.log(evt.dates.start.dateTime);
                console.log(evt.url);

                newRow = $('<tr>');
                newRow.html(`<td>${evt.name}</td>
                    <td>${evt._embedded.venues[0].name}</td>
                    <td>${evt.classifications[0].segment.name}</td>
                    <td>${evt.dates.start.dateTime}</td>
                    <td>${evt.url}</td>`
                )
                $("#dynamic-tbody").append(newRow);
            })
        })
    })




})