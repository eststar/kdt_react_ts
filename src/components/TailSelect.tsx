import { useRef } from "react";

export default function TailSelect({ id, ref, caption, keyData, valData, onhandle }) {

  const makeOptions = valData == "" ? "" : valData.map((el, idx) =>
    <option key={el} value={keyData[idx]}>{el}</option>
  );

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
