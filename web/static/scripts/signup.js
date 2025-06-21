 
//

//ByteVit

document.getElementById('loginForm').addEventListener('submit', (event)=> {
    event.preventDefault();
    let username = document.getElementById("username").value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    if(username && email && password ){
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
              messageDiv.style.color = "red"
          setTimeout(()=>{
              messageDiv.innerText="";
          },2000)
      }else if( data.success){
        messageDiv.innerText = data.success;
        messageDiv.style.color = "green"
        setTimeout(()=>{
            username ="";
            password="";
            email="";
            messageDiv.innerText="";
          },2000)
      }
    }))
    .catch((error) => {
      console.error('Error:', error);
    })
  }else{
    alert("One or more fields have not been filled.")
  }
})

