let country = document.getElementById('country');
let city = document.getElementById('city');

$('#getWeather').click(() => {

    if(country.value === '' || city.value === ''){
      document.getElementById('spinnerText').style.display= 'block';
      $('.loading').show();
    }

    else{
        $('.loading').hide();
        $('#place').hide();
        $('#degrees').hide();
        $('#weather').show();
        $("#weatherImage").attr("src", '');
        $('#weather').html('The Weather Is Waitinig...');
    }
    
    $.ajax({
      url: 'getWeather/?country=' + country.value + '&city=' + city.value,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        document.getElementById('spinnerText').style.display= 'none';
        $('.loading').hide();
        $('#place').show();
        $('#place').html(data.city);
        $('#weather').html(data.weather);
        $('#degrees').show();
        $('#degrees').html(data.temperature + ' °C');
        $("#weatherImage").attr("src", data.image);
      }
    });
});