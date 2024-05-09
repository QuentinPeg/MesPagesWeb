function updateClock() {
    var now = new Date();
    var hour = now.getHours() % 12; // Convertit l'heure en format 12 heures
    var minute = now.getMinutes();
    var second = now.getSeconds();
  
    var hourHand = document.getElementById('hour-hand');
    var minuteHand = document.getElementById('minute-hand');
    var secondHand = document.getElementById('second-hand');
  
    var hourAngle = (360 / 12) * hour + (360 / 12 / 60) * minute; // Calcul de l'angle de l'aiguille des heures
    var minuteAngle = (360 / 60) * minute + (360 / 60 / 60) * second; // Calcul de l'angle de l'aiguille des minutes
    var secondAngle = (360 / 60) * second; // Calcul de l'angle de l'aiguille des secondes
  
    hourHand.style.transform = 'translate(-50%, -100%) rotate(' + hourAngle + 'deg)';
    minuteHand.style.transform = 'translate(-50%, -100%) rotate(' + minuteAngle + 'deg)';
    secondHand.style.transform = 'translate(-50%, -100%) rotate(' + secondAngle + 'deg)';
  }
  
  setInterval(updateClock, 1000); // Met à jour l'horloge chaque seconde
  