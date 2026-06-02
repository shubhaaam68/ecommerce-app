let currentUser = "";
let cart = [];

function registerUser(){

    fetch("http://localhost:5000/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("regEmail").value,
            password:document.getElementById("regPassword").value
        })
    })
    .then(res=>res.json())
    .then(data=>alert(data.message));
}

function loginUser(){

    fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:document.getElementById("loginEmail").value,
            password:document.getElementById("loginPassword").value
        })
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);

        if(data.success){
            currentUser=data.email;
        }

    });

}

function addToCart(product){

    cart.push(product);

    displayCart();
}

function displayCart(){

    let list=document.getElementById("cartList");

    list.innerHTML="";

    cart.forEach(item=>{

        list.innerHTML+=`<li>${item}</li>`;

    });
}

function checkout(){

    fetch("http://localhost:5000/checkout",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:currentUser,
            items:cart
        })
    })
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);

        cart=[];

        displayCart();

    });

}
