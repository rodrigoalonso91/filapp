const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const btnNext = document.querySelector('#btn-next');
const btnDone = document.querySelector('#btn-done');
const lblCurrentTicket = document.querySelector('small');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es obligatorio');
}
const deskNumber = searchParams.get('escritorio');
let workingTicket = null;
deskHeader.innerHTML = `Escritorio ${deskNumber}`;

function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000' );

  socket.onmessage = ( event ) => {
    const { type, payload } = JSON.parse(event.data);

    if (type === 'onTicketNumberChanged') {
      checkTicketCount(payload);
    }
  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

function checkTicketCount( count = 0 ) {

  if (count === 0) {
    noMoreAlert.classList.remove('d-none');
  }
  else {
    noMoreAlert.classList.add('d-none');
  }
  lblPending.innerHTML = count;
}

async function loadInitialCount() {

  const pending = await fetch('/api/ticket/pending')
    .then(response => response.json())
    .catch(error => console.error(error));
  ;

  checkTicketCount(pending.length);
}

async function getTicket() {
  await finishTicket();
  
  const { status, ticket, message } = await fetch(`/api/ticket/draw/${deskNumber}`).then(response => response.json());

  if (status === 'error') {
    lblCurrentTicket.innerText = message;
    return;
  }

  workingTicket = ticket;
  lblCurrentTicket.innerText = ticket.number;
  
}

async function finishTicket() {

  if (!workingTicket) return;

  const { status } = await fetch(`/api/ticket/done/${workingTicket.id}`, { method: 'PUT' }).then(response => response.json());
  if (status === 'ok') {
    workingTicket = null;
    lblCurrentTicket.innerText = '...';
  }
}

// Listeners
btnNext.addEventListener('click', getTicket);
btnDone.addEventListener('click', finishTicket);

// Init
loadInitialCount();
connectToWebSockets();