import TailButton from "../components/TailButton";
import { useRef } from "react";
import type { TodoData } from "./todoType";

interface TodoInputProps {
    handleSave : (newitem :TodoData)=> Promise<number>,
}

export default function TodoInput({handleSave} : TodoInputProps) {
    const inRef = useRef<HTMLInputElement>(null);

    const addTodo = async ()=>{
        if(inRef.current?.value == ""){
            alert("값을 입력해주세요")
            inRef.current.focus();
            return;
        }
        const newitem : TodoData= { id: Date.now(), text: `${inRef.current?.value}`, completed: false};
        // const newList = [...data, newitem];
        const success = await handleSave(newitem);
        if ( success == 1 ) {
            if (inRef.current) {
                inRef.current.value = "";
                inRef.current.focus();
            }
        }        
    };
    
    return (
        <div className="w-full flex flex-row gap-2">
            <input ref={inRef} className="flex-1 border-2 border-emerald-200 focus:bg-emerald-50 border-solid p-2 rounded outline-none"
                type="text" name="todo" placeholder="새로운 할 일을 입력하세요" />
            <div className="">
                <TailButton bColor="blue" caption="추가" onHandle={addTodo} />
            </div>
        </div>
    )
}
