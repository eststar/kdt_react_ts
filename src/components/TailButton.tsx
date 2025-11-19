const btStyles = {
  blue: {
    base: "bg-blue-500",
    hover: "hover:bg-blue-900"
  },
  red: {
    base: "bg-red-500",
    hover: "hover:bg-red-900"
  },
  green: {
    base: "bg-green-500",
    hover: "hover:bg-green-900"
  },
  orange: {
    base: "bg-orange-500",
    hover: "hover:bg-orange-900"
  },
  yellow: {
    base: "bg-yellow-500",
    hover: "hover:bg-yellow-900"
  },
} as const;

type btColor = keyof typeof btStyles;
// type btColor = "blue" | "orange" | "green" | "red" | "yellow" 이렇게 한거랑 위에거랑 같음

interface TailButtonProps {
  bColor : btColor,
  caption : string,
  onHandle : () => void
}
export default function TailButton({ bColor, caption, onHandle } : TailButtonProps) { 
  const btColorCss = `${btStyles[bColor].base} ${btStyles[bColor].hover} 
        rounded text-white px-4 py-2 cursor-pointer`;
  
  return (
    <button className={btColorCss} onClick={onHandle}>{caption}</button>
  )
}
