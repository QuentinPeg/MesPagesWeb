document.addEventListener("DOMContentLoaded", function () {
    function calculateAge(birthDate) {
        var today = new Date();
        var birthDate = new Date(birthDate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    var birthDate = "2005-02-15"; // Remplace cette date par ta date de naissance
    var age = calculateAge(birthDate);
    document.getElementById("age").textContent = age;
});