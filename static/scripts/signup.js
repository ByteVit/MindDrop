document.getElementById('loginForm').addEventListener('submit', (event)=> {
    event.preventDefault();
    const username = document.getElementById("username").value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    alert("js active")
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
    }
    }else{
        alert("One or more fields have not benn filled.")
    }
}
