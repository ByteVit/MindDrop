document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim()
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

if(username && email && password ){
    fetch("/new-user",{
        method:POST,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username:username,
            email:email,
            password:password
        })
    )
    .then((response) => response.json())
    .then((data)=>{
        if(data.error){
            let message = document.getElementById("message").innerText = data.error;
            message.style.color ="red";
        }else{
            document.getElementById("message").innerText=data.success;
        }
    })
    .catch((error)=>{
        alert("Error"+ " " * error)
    })
    }}

