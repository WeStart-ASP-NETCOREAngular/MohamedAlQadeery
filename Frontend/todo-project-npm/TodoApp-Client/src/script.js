import axios from "axios";

import toastr from "toastr";

//Buttons click listeners

// Axios
console.log("Axios scripts goes here");

const BASEURL = "https://localhost:7098";

const categoriesBtn = document.querySelector("#categoriesBtn");
const todosBtn = document.querySelector("#todosBtn");

const tableHead= document.querySelector("#tableHead");
const tableBody= document.querySelector("#tableBody");



//categories table
let categoriesTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Action</th>
</tr>`;

let todosTableHead = ` <tr>
<th scope="col">#</th>
<th scope="col">Name</th>
<th scope="col">Category</th>
<th scope="col">Status</th>
<th scope="col">Action</th>

</tr>`;

categoriesBtn.addEventListener("click",function(event){

    event.preventDefault();
    tableHead.innerHTML = categoriesTableHead;
    tableBody.innerHTML = "";
    axios.get(BASEURL+"/api/category")
        .then((response) => {
           
           const resultData = response.data.map((el,index)=>{
          return  ` <tr>
            <th scope="col">${++index}</th>
            <th scope="col">${el.name}</th>
            <th scope="col">
              <a href="#" class="btn btn-primary">Edit</a>
              <a href="#" class="btn btn-primary">Delete</a>

            </th>
          </tr>`
           }).join(" ");
           
    
        tableBody.innerHTML = resultData;   


        }).catch(err=>{
            console.log(error);
        })
    
    
});

todosBtn.addEventListener("click",function(event){

    event.preventDefault();
    tableHead.innerHTML = todosTableHead;
    tableBody.innerHTML = "";


    
    
});
