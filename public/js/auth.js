document.addEventListener('DOMContentLoaded', function() {
    const logoutForm = document.querySelector('.logout-form');
    if (logoutForm) {
        logoutForm.addEventListener('submit', function(e) {
            console.log('Formulaire de déconnexion soumis');
            // Laissons le formulaire se soumettre normalement
        });
    }
}); 