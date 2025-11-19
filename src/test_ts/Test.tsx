
export default function Test() {
    //기본 데이터 타입
    let name: string = 'k-digital';
    // x = 30;
    let age: number | string = 30; //타입 추론 가능한 타입이 명백한 변수의 경우 굳이 타입 명시 안해도 된다. ->컴파일하면 JS. 어차피 타입 명시 사라짐
    let isStduent: boolean = true;
    let x: undefined = undefined; //any type은 명시 하지 않고 사용
    // x = 10;
    let y: null = null;
    const arr = [1, 2, 3, 4]
    const arr1 = [5, 6, 7]
    arr.push(...arr1)
    arr.concat(arr1)
    // console.log(arr.join(","))
    let nums: number[];


    let numArr: Array<string> = ['1', '2', '3']
    let arrTuple: [string, number] = ['kdgiatt', 30];
    arrTuple[0] = "pnuu"

    //오브젝트
    // type Person = {
    //     name : string,
    //     age : number,
    // }
    interface Person {
        name: string,
        age: number,
    }
    let person: Person = { name: "pnu", age: 30 }
    let direction: "left" = "left" //"left" 만 사용하도록 타입 지정 가능. 상수처럼? 상수 그대로?
    // direction = "right"
    let direction1: "left" | "right" = "left"
    direction1 = "right"
    age = "40"

    
    const handleClick = (): void => {
        console.log("안녕");
        console.log(handleMSG("LDG"));


    };

    // const handleMSG = (msg: string): string => {
    //     return msg + "님 안녕하세요.";
    // };
    type HandleMsg = (msg : string) => string;

    const handleMSG : HandleMsg = (msg) => {
        return msg + "님 안녕하세요.";
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-emerald-100">
            <h1 className="text-3xl font-bold">TypeScript 기본 문법</h1>
            <ul className="mt-10">
                <li>기본 데이터 타입(string) : 이름 {name} </li>
                <li>기본 데이터 타입(number) : 나이 {age} </li>
                <li>기본 데이터 타입(boolean) : {isStduent ? "학생" : "일반인"} </li>
                <li>배열1 : {arr.join(",")}</li>
                <li>배열2 : {numArr.join(",")}</li>
                <li>튜플 : 이름 {arrTuple[0]}</li>
                <li>오브젝트 : 이름 {person.name}, 나이 {person.age}</li>
                <li>방향 : {direction}</li>
                <li>방향1 : {direction1}</li>
            </ul>
            <button className="bg-blue-500 cursor-pointer hover: bg-amber-600 p-2 rounded text-white"
                onClick={handleClick}>클릭</button>
        </div>
    )
}
