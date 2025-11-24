async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
        localStorage.setItem("user", data.username);
        window.location.href = "secret.html";
    } else {
        document.getElementById("msg").textContent = data.message;
    }
}