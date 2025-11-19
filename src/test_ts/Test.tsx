
export default function Test() {
    //기본 데이터 타입
    let name : string = 'k-digital';
    // x = 30;
    let age : number = 30; //타입 추론 가능한 변수의 경우 굳이 타입 명시 안해도 된다. ->컴파일하면 JS. 어차피 타입 명시 사라짐
    let isStduent : boolean = true;
    let x : undefined = undefined; //any type은 명시 하지 않고 사용
    // x = 10;
    let y : null = null;
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">TypeScript 기본 문법</h1>
            <ul className="mt-10">
                <li>기본 데이터 타입(string) : 이름 {name} </li>
                <li>기본 데이터 타입(number) : 나이 {age} </li>
                <li>기본 데이터 타입(boolean) : {isStduent ? "학생" : "일반인"} </li>
            </ul>
        </div>
    )
}
