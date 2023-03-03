import moment from "moment";
import { useEffect, useState } from "react";

const HOST = import.meta.env.VITE_HOST_API;

const TODAY = moment().startOf("day");
const MIN_DATE = moment(TODAY).add(8, "day");
const MAX_DATE = moment(TODAY).add(28, "day");

const toISODate = (d) => d.toISOString(true).slice(0, 10);
const getCookie = () => document.querySelector("#cookie").value;
const sortedSet = (arr) => [...new Set(arr)].sort();
const extractHours = (courts) =>
  courts.flatMap((c) => c.heuresDispo).map((h) => h.hourStart);

const fetchCourts = (cookie, date) =>
  fetch(`${HOST}/courts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookie,
      date: date.format("DD/MM/YYYY"),
      hour: "07:00",
    }),
  }).then((res) => res.json());

const addReservation = (cookie, date, hour) => {
  console.log("Add reservation", { cookie, date, hour });
};

const App = () => {
  const [timeList, setTimeList] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() =>
    console.log({ cookie: cookie.value, date: date.value, timeList, fetching })
  );

  return (
    <>
      <input type="text" id="cookie" placeholder="Cookie" />
      <input
        type="date"
        id="date"
        min={toISODate(MIN_DATE)}
        max={toISODate(MAX_DATE)}
        defaultValue={toISODate(MIN_DATE)}
      />
      <button
        onClick={() => {
          setFetching(true);
          fetchCourts(cookie.value, moment(date.value))
            .then((courts) => setTimeList(sortedSet(extractHours(courts))))
            .catch((err) => console.log(err))
            .finally(() => setFetching(false));
        }}
      >
        Afficher les horaires
      </button>
      <input
        type="time"
        id="hour"
        list="timeList"
        disabled={timeList.length === 0 || fetching}
      />
      <datalist id="timeList">
        {timeList.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>
      <button
        onClick={() => addReservation(cookie.value, date.value, hour.value)}
      >
        Réserver
      </button>
    </>
  );
};

export default App;
