
async function setTicketAmount () {
  try {
    const response = await fetch('http://localhost:3000/api/ticket/last');
    const data = await response.json();
    amountLabel.innerHTML = data;
  }
  catch (message) {
    return console.error(message);
  }
}

async function createTicket () {
  try {
    const response = await fetch('http://localhost:3000/api/ticket', { method: 'POST' });
    const data = await response.json();
    amountLabel.innerHTML = data.number;
    return data;
  }
  catch (message) {
    return console.error(message);
  }
}

const amountLabel = document.getElementById('lbl-new-ticket');
const generateTicketBtn = document.getElementsByTagName('button')[0];

setTicketAmount();
generateTicketBtn.addEventListener('click', createTicket);