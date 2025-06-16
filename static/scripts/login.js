//

//ByteVit

document.getElementById("loginForm").addEventListener("submit", (event)=>{
  event.preventDefault();
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  
  if(username && password){
    fetch("/log-user",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username : username,
        password : password
      })
    })
    .then((res => res.json()))
    .then((data) => {
      let messageDiv = document.getElementById("message");
      if(data.success && data.token){
        messageDiv.innerText = data.success;
        messageDiv.style.color = "green"
        setTimeout(()=>{
            messageDiv.innerText="";
            localStorage.setItem("auth_key",String(data.token))
	    localStorage.setItem("username",username)
            window.location.href="/home"
	    let token = localStorage.getItem("auth_key")
	    if (token){
               alert("Welcome "+ " "+ username);
		}else{
		  alert("There was an error logging you in.");
		}
      },3000)
      }else{
        messageDiv.innerText = data.error;
        messageDiv.style.color = "red";
        setTimeout(()=>{
            messageDiv.innerText="";
        },2000)
      }
    })
    .catch((error) => {
      console.error('Login Error:', error);
    })
  }else{
    alert("One or more fields have not been filled.")
  }
})

