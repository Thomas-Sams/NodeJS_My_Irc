var socket = io();

$('#chat form').submit(function(e) {
	e.preventDefault();
    // On crée notre objet JSON correspondant à notre message
    var message = {
        text : $('#m').val()
    }
    // socket.emit('chat-message', message); // On émet l'événement avec le message associé
    if (message.text.trim().length !== 0) { // Gestion message vide
      socket.emit('chat-message', message);
    }
    $('#m').val(''); // On vide le champ texte
    $('#chat input').focus(); // Focus sur le champ du message
});

/**
 * Connexion d'un utilisateur
 */

$('#login form').submit(function (e) {
  e.preventDefault();
  var user = {
    username : $('#login input').val().trim()
  };
  if (user.username.length > 0) { // Si le champ de connexion n'est pas vide
    socket.emit('user-login', user)
    $('body').removeAttr('id'); // Cache formulaire de connexion
    $('#chat input').focus(); // Focus sur le champ du message
  }
});

/**
 * Réception d'un message
 */
socket.on('chat-message', function (message) {  
	$('#messages').append($('<li>').html('<span class="username">' + message.username + '</span> ' + message.text));
	message.username = loggedUser.username;
	io.emit('chat-message', message);
	messages.push(message);
});

/**
 * Réception d'un message de service
 */
socket.on('service-message', function (message) {  
  $('#messages').append($('<li class="' + message.type + '">').html('<span class="info">information</span> ' + message.text));
});

socket.on('user-login', function (user) {  
  $('#users').append($('<li class="' + user.username + ' new">').html(user.username));
  setTimeout(function () {
    $('#users li.new').removeClass('new');
  }, 1000);
});

socket.on('user-logout', function (user) {  
  var selector = '#users li.' + user.username;
  $(selector).remove();
});