document.addEventListener("DOMContentLoaded", function() {
    const userInfo = document.getElementById('userInfo');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');

    if (isLoggedIn === 'true' && username) {
        if(userInfo) {
            userInfo.innerText = "Selamat Datang, " + username + "!";
        }
        
        const loginBtn = document.querySelector('.btn-login');
        if (loginBtn) {
            loginBtn.innerText = "Logout";
            loginBtn.href = "#";
            loginBtn.style.background = "#c0392b"; // Ubah tombol jadi merah saat logout
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
            });
        }
    }
});
