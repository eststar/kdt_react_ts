
interface TailCardProps {
  url : string,
  title : string,
  subtitle : string,
  infos : string
}


export default function TailCard({url, title, subtitle, infos } : TailCardProps) {

  const data : Array<String> =infos.split(",");  

  type keyTags = () => React.ReactElement | React.ReactElement[];
  const keyTags = () => {
    if (!infos || data.length <=0)
      return <></>;
    return (data.map((el) => <div key={el.replaceAll(" ", "")}
      className="py-1 px-2 rounded-2xl bg-gray-200">{el.trim()}</div>))
  };

  return (
    <div className="max-w-sm shadow-xl/30 flex flex-col">
      <img src={url} alt="" className="w-full" />
      <div className="w-full p-5">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="tracking-tight">{subtitle}</p>
      </div>
      <div className="p-5 flex flex-wrap gap-2">
        {keyTags()}
      </div>
    </div>
  )
}
