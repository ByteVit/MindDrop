document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const userName = document.getElementById('userName').Value.trim();
    const number = document.getElementById('number').Value.trim();
    const email = document.getElementById('email').Value.trim();
    const password = document.getElementById('password').Value.trim();

    if(userName && password && number && email){
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerText = 'Login Successful';
    }else{
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerText = 'Invalid credential';
    }
});
