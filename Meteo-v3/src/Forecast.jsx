import { useState, useEffect } from "react";

const token = "24c84cde26320ec0c8c1dbedbdce66b4";

let day;
let month;
let year;
let hour;
let min;

function evaluateDayHour(dayHour) {
  const x = dayHour.split(" ");
  const d = x[0];
  const h = x[1];

  const y = d.split("-");
  const z = h.split(":");
  day = y[2];
  month = y[1];
  year = y[0];

  hour = z[0];
  min = z[1];
}

function findImage(t) {
  if (t == "Rain") return "pioggia";
  if (t == "Clear") return "sole";
  if (t == "Clouds") return "nuvola";
  if (t == "Snow") return "neve";
}

async function getRows(city, dateForecast) {
  city = city.trim();
  city = city.replace(" ", "+");

  if (city == "" || dateForecast == "") return [];

  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    ",Italy&appid=" +
    token;

  try {
    const response = await fetch(url);
    const output = await response.json();

    let body = [];

    let i = 0;
    let dayHour = output.list[i].dt_txt;
    evaluateDayHour(dayHour); // data e ora del primo elemento della lista

    let dateToday = day + "/" + month + "/" + year; // data del primo elemento della lista

    while (dateToday != dateForecast) {
      // se la data nella tendina è diversa da quella attuale, incremento fino a quando trovo per la prima volta la data nella tendina
      i++;
      dayHour = output.list[i].dt_txt;
      evaluateDayHour(dayHour);
      dateToday = day + "/" + month + "/" + year;
    }

    while (dateToday == dateForecast) {
      dayHour = output.list[i].dt_txt;
      evaluateDayHour(dayHour);
      body.push(
        <tr key={hour + ":" + min}>
          <td>{hour + ":" + min}</td>
          <td>{output.list[i].weather[0].main}</td>
          <td className="tableimg">
            <img src={findImage(output.list[i].weather[0].main) + ".png"} />
          </td>
          <td>{Math.floor(output.list[i].main.temp - 273.15)}</td>
        </tr>
      );

      i++;
      dayHour = output.list[i].dt_txt;
      evaluateDayHour(dayHour);
      dateToday = day + "/" + month + "/" + year;
    }

    return body;
  } catch (e) {
    console.log(e);
    return (
      <tr>
        <td colSpan={4}>Invalid city or date</td>
      </tr>
    );
  }
}

export default function Forecast({ city, date }) {
  const [rows, setRows] = useState(null);

  async function getData() {
    let r = await getRows(city, date);
    setRows(r);
  }
  
  useEffect(() => {
    getData();
  }, [city, date]);

  return (
    <table>
      <thead>
        <tr>
          <th>Hour</th>
          <th>Weather</th>
          <th>Image</th>
          <th>Degrees</th>
        </tr>
      </thead>
      <tbody>
        {rows == null ? (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        ) : (
          rows
        )}
      </tbody>
    </table>
  );
}
