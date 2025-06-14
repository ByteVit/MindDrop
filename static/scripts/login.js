//

//ByteVit

document.getElementById("loginForm").addEventListener("submit", (event)=>{
  event.preventDefault();
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  
  if(username && email && password){
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
    .then((data => {
      let messageDiv = document.getElementById("message");
      if(data.error and data.token){
        messageDiv.innerText = data.error;
        messageDiv.backgroundColor = "red"
        setTimeout(()=>>
            messageDiv.innerText="";
            localStorage.setItem('auth_key',data.token)
            window.location.href="{{url_for('home')}}"
      }else{
        messageDiv.innerText = data.success;
        messageDiv.backgroundColor = "green";
      }
    }))
    .catch((error) => {
      console.error('Error:', error);
    })
  }else{
    alert("One or more fields have not been filled.")
  }
})

