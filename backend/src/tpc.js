import fetch from "node-fetch";

const MEMBRE_URL = "https://toulousepadelclub.gestion-sports.com/membre";
const RESERVATION_URL = MEMBRE_URL + "/reservation.html";
const MESRESAS_URL = MEMBRE_URL + "/mesresas.html";
const DEFAULT_RES =
  "duration=90&partners=null|null|null&paiement=facultatif&idSport=217&creaPartie=false&pay=false&token=undefined&totalPrice=44&saveCard=0&foodNumber=0";

const getHeaders = (cookie) => ({
  cookie,
  accept: "application/json, text/javascript, */*; q=0.01",
  "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "sec-ch-ua":
    '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "x-requested-with": "XMLHttpRequest",
  "Referrer-Policy": "strict-origin-when-cross-origin",
});

const fetchTPC = ({ url, cookie, body }) =>
  fetch(url, {
    method: "POST",
    headers: getHeaders(cookie),
    body,
  }).then((r) => r.json());

const getCourts = ({ cookie, date, hour }) =>
  fetchTPC({
    url: RESERVATION_URL,
    cookie,
    body: `ajax=loadCourtDispo&hour=${hour}&date=${date}&idSport=217`,
  });

const getReservations = ({ cookie }) =>
  fetchTPC({
    url: MESRESAS_URL,
    cookie,
    body: "ajax=loadResa",
  });

const addReservation = ({ cookie, idCourt, date, hour }) =>
  fetchTPC({
    url: RESERVATION_URL,
    cookie,
    body: `ajax=addResa&idCourt=${idCourt}&date=${date}&hour=${hour}&${DEFAULT_RES}`,
  });

const removeReservation = ({ cookie, id }) =>
  fetchTPC({
    url: MESRESAS_URL,
    cookie,
    body: `ajax=removeResa&id=${id}`,
  });

export default {
  getCourts,
  getReservations,
  addReservation,
  removeReservation,
};
