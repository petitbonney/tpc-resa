import fetch from "node-fetch";

const ID_SPORT_PADEL = 217;
const ID_SPORT_SQUASH = 218;

const MEMBRE_URL = "https://toulousepadelclub.gestion-sports.com/membre";
const RESERVATION_URL = MEMBRE_URL + "/reservation.html";
const MESRESAS_URL = MEMBRE_URL + "/mesresas.html";

const HEADERS = {
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
};

async function tpcRequest(method, url, headers, body) {
  const res = await fetch(url, { method, headers, body });
  return await res.json();
}

class TPC {
  constructor(cookie) {
    this._cookie = cookie;
  }

  async getFreeCourts(date, hour = "07:00") {
    const method = "POST";
    const url = RESERVATION_URL;
    const headers = { ...HEADERS, cookie: this._cookie, Referer: url };
    const body = `ajax=loadCourtDispo&hour=${hour}&date=${date}&idSport=217`;
    return await tpcRequest(method, url, headers, body);
  }

  async getReservations() {
    const method = "POST";
    const url = MESRESAS_URL;
    const headers = { ...HEADERS, cookie: this._cookie, Referer: url };
    const body = "ajax=loadResa";
    return await tpcRequest(method, url, headers, body);
  }

  async addReservation(idCourt, date, hour) {
    const method = "POST";
    const url = RESERVATION_URL;
    const headers = { ...HEADERS, cookie: this._cookie, Referer: url };
    const body = `ajax=addResa&date=${date}&hour=${hour}&duration=90&partners=null|null|null&paiement=facultatif&idSport=217&creaPartie=false&idCourt=${idCourt}&pay=false&token=undefined&totalPrice=44&saveCard=0&foodNumber=0`;
    return await tpcRequest(method, url, headers, body);
  }

  async removeReservation(idRes) {
    const method = "POST";
    const url = MESRESAS_URL;
    const headers = { ...HEADERS, cookie: this._cookie, Referer: url };
    const body = `ajax=removeResa&id=${idRes}`;
    return await tpcRequest(method, url, headers, body);
  }
}

export default TPC;
