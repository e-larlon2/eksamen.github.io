// Get the elements


function logginnPopup(){
var openBtn = document.getElementById('openBtn');
var popupContainer = document.getElementById('popupContainer');

    openBtn.addEventListener('click', function() {
  popupContainer.style.display = 'flex';
});
}

function closePopup(){
    var closeBtn = document.getElementById('closeBtn');


  closeBtn.addEventListener('click', function() {
  popupContainer.style.display = 'none';
});  
}

function signupPopup(){
    var openBtn = document.getElementById('openBtn');
var popupContainer = document.getElementById('signup-popup');


    openBtn.addEventListener('click', function() {
  popupContainer.style.display = 'flex';
});
}
