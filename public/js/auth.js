document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('form[action="/auth/register"]');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Vérification simplifiée du mot de passe
            if (password.length < 4) {
                e.preventDefault();
                alert('Le mot de passe doit contenir au moins 4 caractères');
                return;
            }
            
            // Vérification de la confirmation du mot de passe
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('Les mots de passe ne correspondent pas');
                return;
            }
        });
    }
}); 