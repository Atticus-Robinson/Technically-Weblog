//On event listener run, run through logout route. Logoout will destroy session. Then reload homepage
async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);
