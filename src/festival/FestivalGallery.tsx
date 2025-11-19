import TailCard from "../components/TailCard"
// import FestivalContents from "./FestivalContents";

import { useState, useEffect, useRef } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_PUBLICDATA_API_KEY;
export default function TourGallery() {
    // const curDistrict = useLocation();
    // const prevDistrict = (curDistrict)? curDistrict.state.district: "";
    // console.log(curDistrict.state.district)
    const [ queryDistrict ] = useSearchParams();
    const prevDistrict = queryDistrict.get("curDistrict");

    //fetch해서 받아올 전체 데이터    
    const [data, setData] = useState();
     //받아올 축제 데이터 총개수. 시작시 하나만 받아와서 전체 데이터 개수 정보 알아옴
    const [numRows, setNumRows] = useState();
    
    //축제 정보    
    const [pData, setPData] = useState([]);
    //카드 출력용
    const [cardTags, setCardTags] = useState([]);
    //선택 단어
    const districtRef = useRef(/* prevDistrict() ?? "waitSelect" */);

    //기본 키없고, 불러올 데이터행 숫자 설정 없는 url
    const baseUrl = "https://apis.data.go.kr/6260000/FestivalService/getFestivalKr"
        + "?pageNo=1&resultType=json";

    //fetch 함수
    const getFetchData = async () => {
        const url = `${baseUrl}&numOfRows=${numRows ?? 1}&serviceKey=${apiKey}`;
        
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            setData(data);
            if (!numRows)
                setNumRows(data.getFestivalKr.totalCount); //데이터 전송 받았으면 받을수 있는 전체 데이터 수 확인
            else
                setPData(data.getFestivalKr.item);
        } catch (error) {
            console.log(error);
        }
    };

    //최초 생성시 전체 데이터 일단 받아옴
    useEffect(() => {
        getFetchData();
    }, []);

    //받아올 데이터 수 결정 되었으면 다시 fetch
    useEffect(() => {
        if (!numRows || !data || data.length <= 0)
            return;
        getFetchData();
    }, [numRows]);

    useEffect(()=>{
        
        if(prevDistrict && prevDistrict !== "waitSelect"){
            districtRef.current.value = prevDistrict;
            
            const filteredData = pData.filter((item) => item.GUGUN_NM.includes(districtRef.current.value));        
            setCardTags(filteredData.map((item, idx) => 
            <Link to="/FestivalGallery/Contents" state={{contents:item}} key={item.UC_SEQ + idx}>
                <TailCard url={item.MAIN_IMG_THUMB} title={item.TITLE}
                    subtitle={item.TRFC_INFO} infos={item.USAGE_DAY_WEEK_AND_TIME} key={item.UC_SEQ} />
            </Link>));
        }
        
    },[data]);

    //카드 생성
    const handleChange =()=>{
        //어차피 pData 없으면 다른 선택 메뉴 없음
        if(districtRef.current.value === "waitSelect"){
            setCardTags([]);
            return;
        }
        const filteredData = pData.filter((item) => item.GUGUN_NM.includes(districtRef.current.value));        
        setCardTags(filteredData.map((item, idx) => 
            <Link to="/FestivalGallery/Contents" state={{contents:item}} key={item.UC_SEQ + idx}>
                <TailCard url={item.MAIN_IMG_THUMB} title={item.TITLE}
                    subtitle={item.TRFC_INFO} infos={item.USAGE_DAY_WEEK_AND_TIME} key={item.UC_SEQ} />
            </Link>));
    };

    //지역구 선택했는데 아직 fetch 안됨
    const handleClick = (e)=>{
        e.preventDefault();
        if(!pData || pData.length <= 0)
            alert("데이터 받는중...");
    };
    //지역구 선택 확장 메뉴
    const makeSelectBox = ()=>{        
        if(!pData || pData.length <= 0)
            return;
        const districtSet = [...new Set(pData.map((item)=> item.GUGUN_NM))];
        return districtSet.map((el)=> <option value={el} key={el}>{el}</option>);
    };

    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-5">
            <div className="w-4/5 shadow-xl/30 flex flex-col justify-center items-center p-5 gap-5 bg-emerald-100">
                <h1 className="text-xl font-bold">부산광역시 부산축제정보 서비스</h1>
                <form className="w-full max-w-lg mx-auto">
                    <div className="col-span-2">
                        <select ref={districtRef} onChange={handleChange} onClick={handleClick}
                                 defaultValue={'waitSelect'} 
                                className="w-full border-2 border-solid bg-orange-100 border-gray-500 p-2 text-base focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="waitSelect">---지역선택---</option>
                            {makeSelectBox()}
                        </select>
                    </div>
                </form>
            </div>
            <div className="w-4/5 h-3/4 overflow-y-auto grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                {cardTags}                
            </div>
        </div>
    )
}