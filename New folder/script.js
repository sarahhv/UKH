//MODAL BOX JS
// Close botton modal
var btnLuk = document.getElementsByClassName("modalLuk")[0];

// When the user clicks on class="modalLuk", close the modal
btnLuk.addEventListener('click', () => {
    document.getElementById("modal").style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', () => {
    if (event.target == modal) {
        modalFridge.style.display = "none";
    }
});
