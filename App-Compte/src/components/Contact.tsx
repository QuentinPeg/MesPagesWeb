import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
    useEffect(() => {
        emailjs.init("fF2Ie6GtG1pIakaeG");
    }, []);

    const mailForm = () => {
        const nom = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const mess = (document.getElementById("message") as HTMLTextAreaElement).value;

        const message = `Message de ${nom},\n\nAdresse de contact du client : ${email},\nMessage : ${mess}`;

        const params = {
            sendername: nom,
            replyto: email,
            message: message
        };

        const serviceID = "service_7ytleyo";
        const templateID = "template_z5ny6gu";

        emailjs.send(serviceID, templateID, params)
            .then(() => {
                alert("Message envoyé ! \n (Nous répondons généralement en moins d'une semaine)");
            })
            .catch(error => {
                console.error("Une erreur est survenue lors de l'envoi,\n Veuillez nous excuser. Si le problème persiste, contactez le support par un autre moyen. \n Contact > adresse mail du support:", error);
            });
    };


    return (
        <form method="POST" className="contact-form mx-auto w-96 bg-gray-500 p-8 rounded-lg shadow-md m-8">
            <h2 className="text-2xl font-bold mb-4">Formulaire de contact</h2>
            <div className="form-group mb-4">
                <label htmlFor="name" className="block font-bold mb-2">Nom :</label>
                <input type="text" id="name" name="name" placeholder="Nom*" required className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="email" className="block font-bold mb-2">Email :</label>
                <input type="email" id="email" name="email" placeholder="Email*" required className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="form-group mb-4">
                <label htmlFor="message" className="block font-bold mb-2">Message :</label>
                <textarea id="message" name="message" placeholder="Votre message*" required className="w-full p-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <button type="button" className="submit-btn w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600" onClick={mailForm}>Envoyer</button>
        </form>
    );
};
export default Contact;