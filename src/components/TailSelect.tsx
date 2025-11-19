
interface TailSelectProps {
  id : string, 
  ref : React.RefObject<HTMLSelectElement>, 
  caption : string, 
  keyData : string[], 
  valData : string[], 
  onhandle : () => void
}

export default function TailSelect({ id, ref, caption, keyData, valData, onhandle } : TailSelectProps) {
  // const makeOptions : string | React.ReactElement[] = valData == "" ? "" : valData.map((el, idx) =>
  //   <option key={el} value={keyData[idx]}>{el}</option> 
  // );

   const makeOptions = Array.isArray(valData)
    ? valData.map((el, idx) => (
        <option key={keyData[idx]} value={keyData[idx]}>
          {el}
        </option>
      ))
    : null;

  return (
    <div className="grid-rows-2 p-2">
      <label htmlFor={id}>{caption}</label>
      <select id={id} ref={ref} onChange={onhandle}
              className="w-full rounded bg-white border-2 border-solid border-rose-400">
        <option value="">--선택--</option>
        {makeOptions}
      </select>
    </div>
  )
}
