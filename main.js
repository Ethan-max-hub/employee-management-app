// SAVE CONTACT
document.getElementById("employeeForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        position: document.getElementById("position").value
    };

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push(employee);

    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee saved successfully!");
    this.reset();
});


// LOAD CONTACTS INTO TABLE
function loadEmployees() {
    const table = document.querySelector("table");
    if (!table) return;

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    employees.forEach((emp, index) => {
        const row = table.insertRow();

        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.phone}</td>
            <td>${emp.department}</td>
            <td>
                <button onclick="showDetails(${index})">Details</button>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
    });
}


// SHOW DETAILS
function showDetails(index) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let emp = employees[index];

    alert(
        "Name: " + emp.name + "\n" +
        "Email: " + emp.email + "\n" +
        "Phone: " + emp.phone + "\n" +
        "Department: " + emp.department + "\n" +
        "Position: " + emp.position
    );
}


// EDIT (basic version)
function editContact(index) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let emp = employees[index];

    // Ask user for new values (pre-filled)
    let newName = prompt("Edit Name:", emp.name);
    let newEmail = prompt("Edit Email:", emp.email);
    let newPhone = prompt("Edit Phone:", emp.phone);
    let newDepartment = prompt("Edit Department:", emp.department);
    let newPosition = prompt("Edit Position:", emp.position);

    // If user cancels, stop
    if (!newName || !newEmail) {
        alert("Edit cancelled");
        return;
    }

    // Update object
    employees[index] = {
        name: newName,
        email: newEmail,
        phone: newPhone,
        department: newDepartment,
        position: newPosition
    };

    // Save back to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    alert("Employee updated successfully!");

    // Refresh table
    location.reload();
}


// DELETE CONTACT
function deleteContact(index) {
    let confirmDelete = confirm("Are you sure you want to delete?");
    
    if (confirmDelete) {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        employees.splice(index, 1);

        localStorage.setItem("employees", JSON.stringify(employees));

        alert("Employee deleted");
        location.reload(); // refresh page
    }
}


// AUTO LOAD WHEN PAGE OPENS
window.onload = loadEmployees;