import TailButton from "../components/TailButton";
import { useState } from "react";

export default function TodoItem({ curData, handleEdit, handleDelete}) {
    
    const [isEdit, setIsEdit] = useState(false);
    const [editingTxt, setEditingTxt] = useState(curData.text);
    
    const editTodo = ()=>{
        setIsEdit(!isEdit);
        const newData = {...curData, text: editingTxt};
        handleEdit(newData);
    };

    const handleToggle =()=>{
        const newData = {...curData, completed: !curData.completed};
        handleEdit(newData);
    };
    const delTodo = () =>{
        const newData = curData;
        handleDelete(newData);
    };

    return (
        <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 border border-slate-800 border-solid rounded p-2">
            <div className="col-span-1 md:col-span-3 lg:col-span-8 flex justify-start w-full gap-2">
                <input id={curData.id} type="checkbox" name={curData.text} checked={curData.completed} onChange={handleToggle}/>
                {isEdit ? <input 
                    className="flex-1 border-2 border-fuchsia-300 bg-fuchsia-50 border-solid p-2 rounded focus:bg-amber-200 focus:border-orange-700 outline-none"
                    type="text" value={editingTxt} 
                    onChange={(e) => setEditingTxt(e.target.value)} />
                    : <label htmlFor={curData.id} className={`flex justify-center items-center ${ curData.completed ? "line-through": ""}`}>{curData.text}</label>
                }
            </div>
            <div className="w-full col-span-2 grid grid-rows-1 grid-cols-2 gap-2">
                {
                    isEdit ?
                        <>
                            <TailButton bColor="green" caption="저장" onHandle={editTodo} />
                            <TailButton bColor="orange" caption="취소" onHandle={() => setIsEdit(!isEdit)} />
                        </>
                        :
                        <>
                            <TailButton bColor="green" caption="수정" onHandle={()=>setIsEdit(!isEdit)} />
                            <TailButton bColor="orange" caption="삭제" onHandle={delTodo} />
                        </>
                }
            </div>
        </div>
    )
}
