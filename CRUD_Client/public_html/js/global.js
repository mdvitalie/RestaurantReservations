//Variable
const formValidationEl = document.getElementById("formValidation");
//Calling the function login()
formValidationEl.addEventListener("click", login);

/* Modal Box Starts Here */

let loginBtn = document.querySelector('.login');
let modal = document.querySelector('.simpleModal');
let closeBtn = document.querySelector('.closeBtn');

//listen for a open click
loginBtn.addEventListener('click', openModal);
//listen for a close click
closeBtn.addEventListener('click', closeModal);
//Listen for outside click
window.addEventListener('click', clickOutside);

//Function to open modal
function openModal() {
    modal.style.display = "block";
    // alert("Username: admin1 and Pass: 12345");
}

//Function to close modal
function closeModal() {
    modal.style.display = "none";
}

//Function to close modal if outside click
function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}
/* Modal Box Ends Here */