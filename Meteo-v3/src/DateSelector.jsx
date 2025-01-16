function getOptions() {  
  const today = new Date();
  let g = today.getDate();
  if (g < 10)
  g = '0' + g;
  let m = today.getMonth()+1;
  let a = today.getFullYear();

  let s = [
    (<option key='---' value=''>---</option>), 
    (<option key='g0'>{g + "/" + m + "/" + a}</option>)
  ];

  const millis = 1000*60*60*24;
  for (let i=1; i<=4; i++) {
    const newDate = new Date(today.getTime() + i * millis);

    g = newDate.getDate();
    if (g < 10)
      g = '0' + g;
    m = newDate.getMonth()+1;
    a = newDate.getFullYear();		
    s.push((<option key={"g" + i}>{g + "/" + m + "/" + a}</option>));	
  }		

  return s;
}


export default function DateSelector({date, setDate}) {
  function handleChange(event) {
    setDate(event.target.value);
  }
  
  return (
    <p>
      Seleziona una data:
      <select onChange={handleChange} className={date=='' ? 'error' : 'ok'}>
        {getOptions()}
      </select>
    </p>
  );
}

