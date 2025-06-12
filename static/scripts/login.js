document.getElementById('loginForm').addEventListener('submint', function(e) {

    const userName = document.getElementById('userName').Value.trim();
    const password = document.getElementById('password').Value.trim();

    if(userName && password ){
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerText = 'Login Successful';
    }else{
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerText = 'Invalid credential';
    }
});
