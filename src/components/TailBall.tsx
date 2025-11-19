const ballColor = [
  "bg-yellow-500 text-white", //1~9
  "bg-blue-500 text-white", //10~19
  "bg-red-500 text-white", //20~29
  "bg-gray-500 text-white", //30~39
  "bg-green-500 text-white", //40~49
  "bg-white-500 text-black" //50~ -> '+'
] as const;

interface TailBallProps {
  lottoNum : number | undefined,
}
export default function TailBall({lottoNum} : TailBallProps) {
    
  return (
    <div className={`h-20 w-20 rounded-full ${lottoNum && ballColor[Math.floor(lottoNum/10)]} text-xl font-bold  flex justify-center items-center`}>
      {(lottoNum == 50)? '+' : lottoNum}
    </div>
  )
}
