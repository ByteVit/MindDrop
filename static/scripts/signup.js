//

//ByteVit

document.getElementById("loginForm").addEventListener("submit", (event)=>{
  event.preventDefault();
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  
  if(username && email && password){
    fetch("/new-user",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username : username,
        email : email,
        password : password
      })
    })
    .then((res => res.json()))
    .then((data => {
      let messageDiv = document.getElementById("message");
      if(data.error){
        messageDiv.innerText = data.error;
        messageDiv.backgroundColor = "red"
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

