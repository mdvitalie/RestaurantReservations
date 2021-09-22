//Variables
let btnReservEl = document.getElementById("btn-reservation");
const getGuestsListEl = document.getElementById("get");

//Calling the function getGuestsList()
getGuestsListEl.addEventListener("click", getGuestsList);

var selectedRow = null;
function onFormSubmit() {
    if (validate()) {
        createReservation();
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["email"] = document.getElementById("email").value;
    formData["noGuests"] = document.getElementById("noGuests").value;
    formData["date"] = document.getElementById("date").value;
    formData["time"] = document.getElementById("time").value;
    return formData;
}

//reading data from database (loading full list reservation)
function getGuestsList() {
    $('tbody').empty();
    $.ajax({
        url: 'http://localhost:3000/api/users/',
        method: 'GET',
        dataType: 'json',
        data: JSON.stringify(),
        contentType: 'application/json'
    }).done(function (data) {
        // console.log(data);
        let user = "";
        $.each(data, function (key, data) {
            user += '<tr>';
            user += '<td>' + data.name + '</td>';
            user += '<td>' + data.lastName + '</td>';
            user += '<td>' + data.email + '</td>';
            user += '<td>' + data.noGuests + '</td>';
            user += '<td>' + data.date + '</td>';
            user += '<td>' + data.time + '</td>';
            user += '<td><a class="edit" data-id="' + this._id + '" onClick="onEdit(this)"><i class="fas fa-edit"></i></a>';
            user += '<td><a class="delete" data-id="' + this._id + '" onClick="onDelete(this)"><i class="fas fa-trash-alt"></i></a>';
            user += '</tr>';
        });
        $('tbody').append(user);
    });
}

//creating a new record with a new reservation
function createReservation() {
    var formData = {
        "name": document.getElementById("name").value,
        "lastName": document.getElementById("lastName").value,
        "email": document.getElementById("email").value,
        "noGuests": document.getElementById("noGuests").value,
        "date": document.getElementById("date").value,
        "time": document.getElementById("time").value
    };
    $.ajax({
        url: 'http://localhost:3000/api/users/',
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(formData),
        contentType: 'application/json'
    });
}

//inserting data from created record to the table
function insertNewRecord(data) {
    var table = document.getElementById("GuestsList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.lastName;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.email;
    cell2 = newRow.insertCell(3);
    cell2.innerHTML = data.noGuests;
    cell3 = newRow.insertCell(4);
    cell3.innerHTML = data.date;
    cell4 = newRow.insertCell(5);
    cell4.innerHTML = data.time;
    cell4 = newRow.insertCell(6);
    cell4.innerHTML = '<a class="edit" data-id="' + this._id + '" onClick="onEdit(this)"><i class="fas fa-edit"></i></a>';
    cell5 = newRow.insertCell(7);
    cell5.innerHTML = '<a class="delete" data-id="' + this._id + '" onClick="onDelete(this)"><i class="fas fa-trash-alt"></i></a>';
}

//edit selected reservation record
function update() {
    var id = document.getElementById("id").value;
    var formData = {
        "name": document.getElementById("name").value,
        "lastName": document.getElementById("lastName").value,
        "email": document.getElementById("email").value,
        "noGuests": document.getElementById("noGuests").value,
        "date": document.getElementById("date").value,
        "time": document.getElementById("time").value
    };
    resetForm();
    $.ajax({
        url: 'http://localhost:3000/api/users/' + id,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(formData, id),
        contentType: 'application/json'
    }).done(function (data) {
        console.log(data);
    });
    getGuestsList();
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = $(td).attr("data-id");
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("noGuests").value = selectedRow.cells[3].innerHTML;
    document.getElementById("date").value = selectedRow.cells[4].innerHTML;
    document.getElementById("time").value = selectedRow.cells[5].innerHTML;

    //Changes the button from New Reservation to Update
    btnReservEl.value = "Update";
    btnReservEl.setAttribute("onclick", "update()");
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.noGuests;
    selectedRow.cells[4].innerHTML = formData.date;
    selectedRow.cells[5].innerHTML = formData.time;
}

//remove selected reservation
function onDelete(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = $(td).attr("data-id");
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("noGuests").value = selectedRow.cells[3].innerHTML;
    document.getElementById("date").value = selectedRow.cells[4].innerHTML;
    document.getElementById("time").value = selectedRow.cells[5].innerHTML;
    var id = document.getElementById("id").value;
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("GuestsList").deleteRow(row.rowIndex);
        resetForm();
    }
    var formData = {
        "id": document.getElementById("id").value,
        "name": document.getElementById("name").value,
        "lastName": document.getElementById("lastName").value,
        "email": document.getElementById("email").value,
        "noGuests": document.getElementById("noGuests").value,
        "date": document.getElementById("date").value,
        "time": document.getElementById("time").value
    };
    $.ajax({
        url: 'http://localhost:3000/api/users/' + id,
        method: 'DELETE',
        dataType: 'json',
        data: JSON.stringify(formData),
        contentType: 'application/json'
    }).done(function (data) {
        console.log(data);
    });
}

//purging the form
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("noGuests").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    selectedRow = null;

    //it reserts the button back from Update to New Reservation
    btnReservEl.value = "New Reservation";
    btnReservEl.removeAttribute("onclick", "update()");
}

//validating entered data by user in form
function validate() {
    isValid = true;
    const nameEl = document.getElementById("name").value;
    const lastNameEl = document.getElementById("lastName").value;
    const emailEl = document.getElementById("email").value;
    const noGuestsEl = document.getElementById("noGuests").value;
    const dateEl = document.getElementById("date").value;
    const timeEl = document.getElementById("time").value;

    if (nameEl == "" || lastNameEl == "" || emailEl == "" || noGuestsEl == "" || dateEl == "" || timeEl == "") {
        document.getElementById("fullNameValidationError").classList.remove("hide");
        isValid = false;
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}