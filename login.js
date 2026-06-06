document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const alertBox = document.getElementById('alertBox');
    const apiUrl = 'https://herisusanta.my.id/javalogin/api/';

    const loginData = {
        username: usernameInput,
        password: passwordInput
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server bermasalah.');
        }
        return response.json();
    })
    .then(data => {
        // Jika API mengembalikan sukses atau kecocokan akun heri/admin bawaan tugas
        if (data.status === 'success' || data.success === true || 
            (usernameInput === 'heri' && passwordInput === '123') || 
            (usernameInput === 'admin' && passwordInput === '123')) {
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', usernameInput);

            alertBox.className = "alert alert-success";
            alertBox.innerText = "Login Berhasil! Mengalihkan...";
            alertBox.style.display = "block";

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            alertBox.className = "alert alert-danger";
            alertBox.innerText = "Username atau Password Salah!";
            alertBox.style.display = "block";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Fallback Simulasi Offline Tugas
        if ((usernameInput === 'heri' || usernameInput === 'admin') && passwordInput === '123') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', usernameInput);
            alertBox.className = "alert alert-success";
            alertBox.innerText = "Login Berhasil (Simulasi Offline)!";
            alertBox.style.display = "block";
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        } else {
            alertBox.className = "alert alert-danger";
            alertBox.innerText = "Gagal terhubung ke API Server.";
            alertBox.style.display = "block";
        }
    });
});
