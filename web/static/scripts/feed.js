//ByteVit
//
//
//
alert("Js active");

const getFeed = (username, tokenKey) => {
	if(!username)
	      window.location.replace("/home");
	fetch("/get-feed",{
		method : "POST",
		headers : {
			"Content-Type" : "application/json"
		},
		body : JSON.stringify({username : username , token : tokenKey})
		})
};
document.addEventListener("DOMContentLoaded", () => {
	alert("Hello world");
	let token = localStorage.getItem("auth_key");
	let user = localStorage.getItem("username");
	getFeed(user , token);
})
