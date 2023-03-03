import cors from "cors";
import express from "express";
import TPC from "./src/tpc.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => res.sendStatus(200));

app.post("/courts", (req, res) =>
  TPC.getCourts(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.send(err))
);

app.post("/reservations", (req, res) =>
  TPC.getReservations(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.send(err))
);

app.put("/reservations", (req, res) =>
  TPC.addReservation(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.send(err))
);

app.delete("/reservations", (req, res) =>
  TPC.removeReservation(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.send(err))
);

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
