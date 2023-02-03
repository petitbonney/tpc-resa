import dotenv from "dotenv";
import TPC from "./tpc-api.js";

dotenv.config();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const date = "07/02/2023";

  const cookie = process.env.COOKIE;
  const tpc = new TPC(cookie);

  // Get free courts
  const freeCourts = await tpc.getFreeCourts(date);
  console.log(freeCourts);

  // Add reservation
  if (freeCourts) {
    const idCourt = freeCourts[0].idCourt;
    const hour = freeCourts[0].heuresDispo[0].hourStart;
    console.log(await tpc.addReservation(idCourt, date, hour));
  }

  // Get reservations
  const reservations = await tpc.getReservations();
  console.log(reservations);

  await sleep(10000);

  // Remove reservation
  if (reservations) {
    const idRes = reservations[0].id;
    console.log(await tpc.removeReservation(idRes));
    console.log(await tpc.getReservations());
  }
}

run();
