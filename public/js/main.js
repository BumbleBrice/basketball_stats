// Fonctions générales utilisées sur toutes les pages
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des messages flash
    const flashMessages = document.querySelectorAll('.alert');
    if (flashMessages) {
        flashMessages.forEach(message => {
            setTimeout(() => {
                message.classList.add('fade-out');
                setTimeout(() => message.remove(), 500);
            }, 3000);
        });
    }
}); 