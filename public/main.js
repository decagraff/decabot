$(function() {
    var clientId = 'pbkcyhuat521eff96jbagfi9fbel1s';
    var redirectUri = 'https://127.0.0.7:5501/redirect.html';
    var responseType = 'token';
    var scope = 'user_read channel_read';

    var loginUrl = 'https://id.twitch.tv/oauth2/authorize' +
        '?client_id=' + clientId +
        '&redirect_uri=' + redirectUri +
        '&response_type=' + responseType +
        '&scope=' + scope;

    var accessToken = localStorage.getItem('accessToken');

    if (!accessToken && window.location.pathname !== '/login.html') {
        window.location.href = 'https://127.0.0.7:5501/login.html'; // Redirige al usuario a login.html
        return;
    }

    var logout = function() {
        localStorage.removeItem('accessToken');
        window.location.href = 'https://127.0.0.7:5501'; // Redirige al usuario a login.html después de cerrar sesión
    };

    $('#disconnect').click(function(e) {
        e.preventDefault();
        logout();
    });

    $('#connect').click(function() {
        window.location.href = loginUrl; // Inicia el proceso de autenticación cuando se hace clic en "Conectar"
    });

    $.ajax({
        url: '/api/user',
        data: {
            access_token: accessToken
        },
        success: function(data) {
            $('#username').text('Usuario conectado: ' + data.data[0].display_name);
            $('.dashboard').show();
        },
        error: function() {
            console.log('Error al conectar con Twitch.');
            $('#message').text('Error al conectar con Twitch.');
            $('.dashboard').show();
        }
    });
});