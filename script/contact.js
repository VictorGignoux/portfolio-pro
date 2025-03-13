var notificationAnimation;

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("3JBCRaAlAWZMr_EyI"); // Remplace avec ton User ID EmailJS

    let form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let notification = document.getElementById("notification-text");
        let input_nom = document.getElementById("input-nom").value.trim();
        let input_mail = document.getElementById("input-mail").value.trim();
        let input_objet = document.getElementById("input-objet").value.trim();
        let input_message = document.getElementById("input-message").value.trim();
        //let input_file = document.getElementById("input-file");

        emailjs.send("service_uqu3hv3","template_1ir7b1b",{
            nom: input_nom,
            mail: input_mail,
            objet: input_objet,
            message: input_message,
        }).then(
            (response) => {
                notification.innerText = "Message envoyé avec succès !";
                form.reset();
                //affichage de la notification
                notification.style.top = "0";
                notification.style.width = "20vw";
                window.clearTimeout(notificationAnimation);
                notificationAnimation = setTimeout(() => {
                    notification.style.top = "7vh";
                }, 3000);
            },
            (error) => {
                notification.innerText = "Erreur lors de l'envoi du message...";
                //affichage de la notification
                notification.style.top = "0";
                notification.style.width = "22vw";
                window.clearTimeout(notificationAnimation);
                notificationAnimation = setTimeout(() => {
                    notification.style.top = "7vh";
                }, 3000);
            },
        );
    });
});
