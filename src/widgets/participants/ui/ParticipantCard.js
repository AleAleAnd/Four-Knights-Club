export const renderParticipantCard = (participant) => `
  <div class="participant-card">
    <img src="${participant.avatar}" alt="${participant.name}" class="participant-card__img">
    <h3 class="participant-card__name">${participant.name}</h3>
    <p class="participant-card__role">${participant.role}</p>
    <button class="participant-card__btn">Подробнее</button>
  </div>
`
