export default function CitySelector({city, setCity}) {
  function handleChange(event) {
    setCity(event.target.value);
  }
  
  return (
    <p>
    Inserisci una citt&agrave;: 
    <input value={city} onChange={handleChange} className={city=='' ? 'error' : 'ok'}/>
    </p>
  );
}