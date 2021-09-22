function checksessionStorage() {
    if (typeof (Storage) !== "undefined") {
        return true;
    } else {
        return false;
    }
}

//Variables
const error = document.getElementById("msgerror");

function login() {

    var fields = ["username", "password"]; //array of inputs
    // var check = 0;
    var check = false;

    // Loop to apply Form Validation
    for (i = 0; i < fields.length; i++) {
        // Check if the input is empty
        if (document.getElementById(fields[i]).value == "") {
            //errors detected
            check = true;

            document.getElementById(fields[i]).style.borderBottom = "3px solid red";
            document.getElementById('user-lbl').focus();
            error.innerHTML = "All fields must be field*";
            error.style.color = "red";
            error.style.backgroundColor = "rgba(255,255,255,0.5)";

        } else {
            document.getElementById(fields[i]).innerHTML = "";
        }
    }

    if (check == false) {
        //Check if user exist
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        for (i = 0; i < arrayusers.length; i++) {
            if ((username == arrayusers[i].username) && (password == arrayusers[i].password)) {
                check = false;
                var position = i;
                document.getElementById("msgerror").innerHTML = "";
                break;
            } else {
                check = 1;
                error.style.color = "red";
                error.style.backgroundColor = "rgba(255,255,255,0.5)";
                document.getElementById("msgerror").innerHTML = "user or password incorrect";
            }
        }
    }

    //check if the script detect errors in the form
    if (check == false) {
        // Setting Local Storage Variables
        sessionStorage.setItem("username", arrayusers[position].username);
        sessionStorage.setItem("firstname", arrayusers[position].firstname);
        sessionStorage.setItem("lastname", arrayusers[position].lastname);
        sessionStorage.setItem("imgAvatar", arrayusers[position].picture);

        //submit the form
        document.getElementById("loginform").submit();
    }
}

// showUserInfo();
function showUserInfo() {
    //Show the user info (firstname & lastname) in the userinfo id
    let s = document.getElementById("userinfo").innerHTML = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname").substring(0, 1) + "...";
    const avatar = '<figure><img src="' + sessionStorage.getItem("imgAvatar") + '"></figure>';

    document.getElementById("img-avatar").innerHTML = avatar;
}

function logout() {
    //Clear all the local storage variables
    sessionStorage.clear();

    //redirect to the index page
    window.location.href = "index.html";
}

function checkLogin() {
    //Verify if the user is logged or not in the website
    if (sessionStorage.getItem("email") == null) {
        //redirect to the index page
        window.location.href = "index.html";
    }
}