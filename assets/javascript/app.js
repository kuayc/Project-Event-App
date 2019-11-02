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




})