import { useEffect, useState } from "react";

import TodoInput from "./TodoInput"
import TodoItem from "./TodoItem"

import { supabase } from "../mysupabase/client";
// const baseURL = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAPIKey = import.meta.env.VITE_SUPABASE_API_KEY;
// const restAPILine = "/rest/v1/todos";
export default function () {
    const [todos, setTodos] = useState([]);
    const [todoCnt, setTodoCnt] = useState(0);
    const [todoInComp, setTodoInComp] = useState(0);
    const [todoComp, setTodoComp] = useState(0);
    const [todoList, setTodoList] = useState();

    const getTodos = async () => {
        const { data, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching todos:', error);
        } else {
            setTodos(data);
        }
    };

    const postTodo = async (newData) => {
        const { error } = await supabase
            .from('todos')
            .insert([
                { text: newData.text, completed: newData.completed },
            ]);
        if (error) {
            console.error('Error adding todo:', error);
            return 0;
        } else {
            getTodos();
            return 1;
        }
    };

    const patchTodo = async (newData) => {
        const { error } = await supabase
            .from('todos')
            .update({ text: newData.text, completed: newData.completed })
            .eq('id', newData.id);
        if (error) {
            console.error('Error toggling todo:', error);
        } else
            getTodos();
    };

    const deleteTodo = async (newData) => {
        const { error } = await supabase
            .from('todos')
            .delete()
            .eq('id', newData.id);
        if (error) {
            console.error('Error deleting todo:', error);
        } else {
            getTodos();
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        setTodoCnt(todos.length);
        setTodoComp(todos.filter(el => el.completed == true).length);
        setTodoInComp(todos.filter(el => el.completed == false).length);

        setTodoList(
            todos.map((item) =>
                <TodoItem key={item.id} data={todos} curData={item} handleEdit={patchTodo} handleDelete={deleteTodo} />)
        );
    }, [todos]);

    return (
        <div className="mx-auto w-7/10 flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl font-bold mt-10">할일목록(Supabase)</h1>
            <div className="bg-purple-200 rounded w-full h-100px p-5">
                전체 : {todoCnt} 개 | 완료 : {todoComp} 개 | 미완료 : {todoInComp} 개
            </div>
            <TodoInput handleSave={postTodo} />
            <div className="w-full flex flex-col justify-center items-center gap-2">
                {todoList}
            </div>
        </div>
    )
}
