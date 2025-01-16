import './App.css'

import CitySelector from './CitySelector'
import DateSelector from './DateSelector'
import Forecast from './Forecast'

import {useState} from 'react'

export default function App() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  return (
    <div>
      <CitySelector city={city} setCity={setCity} />
      <p>Il valore della citt&agrave; &egrave;: {city}</p>
      <DateSelector date={date} setDate={setDate}/>
      <p>Il valore della data &egrave;: {date}</p>
      {city != '' && date != '' ? <Forecast city={city} date={date} /> : <p>Please select a city and a date</p>}
    </div>
  )
}
