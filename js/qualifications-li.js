function initializeQualificationBulletPoints(cardBulletPoints, collectionName) {
    
    // Variable AUSSERHALB der if-Blöcke deklarieren
    let qualificationList;
    
    if(collectionName === 'qualificationsCardBack'){
        qualificationList = document.getElementById('flip-card-1-list');
    } else if (collectionName === 'qualificationcard2back'){
        qualificationList = document.getElementById('flip-card-2-list');
    }

    // Nur fortfahren wenn Liste gefunden wurde
    if (qualificationList) {
        cardBulletPoints.forEach(bulletPoint => {
            const nextBulletpoint = document.createElement('li');
            nextBulletpoint.textContent = bulletPoint.qualificationsCardBackContent;
            qualificationList.appendChild(nextBulletpoint);
        });
    }
}