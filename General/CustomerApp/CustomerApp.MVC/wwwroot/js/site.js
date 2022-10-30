


const AllCustomersBtn = document.querySelector("#getAllCustomersBtn");
const addForm = document.querySelector("#AddForm");
const FirstNameText = document.querySelector("#FirstName");
const LastName = document.querySelector("#LastName");
const MainList = document.querySelector("#main-list");

AllCustomersBtn.addEventListener("click", function (event) {

    event.preventDefault();

    fetch("/customer/GetAllCustomers").then((response) => {
        return response.json();
 }).then((data) => {
     MainList.innerHTML =
         data.map(el => `<li class="list-group-item">${el.fullName}</li>`)
             .join("\n");
    });
});



addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    fetch("/customer/AddCustomer", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FirstName: FirstNameText.value, LastName: LastName.value })
    }).then(response => {
        return response.json();

    }).then(data => {
        MainList.innerHTML += `<li class="list-group-item">${data.fullName}</li>`;


    });
});

