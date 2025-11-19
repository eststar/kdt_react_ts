import { Link, useLocation } from "react-router-dom"

const getStatusInfo = (statusCode) => {
    switch (statusCode) { 
      case '1':
        return { 
          msg: "⚠️ 통신이상", 
          style: "bg-red-100 text-red-700 border-red-300" 
        };
      case '2':
        return { 
          msg: "✅ 충전 대기", 
          style: "bg-green-100 text-green-700 border-green-300" 
        };
      case '3':
        return { 
          msg: "⚡ 충전 중", 
          style: "bg-blue-100 text-blue-700 border-blue-300" 
        };
      case '4':
        return { 
          msg: "❌ 운영 중지", 
          style: "bg-gray-100 text-gray-700 border-gray-300" 
        };
      case '5':
        return { 
          msg: "🛠️ 점검 중", 
          style: "bg-yellow-100 text-yellow-700 border-yellow-300" 
        };
      case '9':
        return { 
          msg: "❓ 상태 미확인", 
          style: "bg-gray-200 text-gray-600 border-gray-400" 
        };
      default:
        return { 
          msg: "상태 정보 없음", 
          style: "bg-gray-100 text-gray-500 border-gray-300" 
        };
    }
  };  

export default function TailInfoCard() {
    const data = useLocation();
    const info = data.state.info;
    
    const kakaoMapUrl = `https://map.kakao.com/link/map/` +
        `${info.statNm.replace(',', '').replace(' ', '')}${info.statId.replace(',', '').replace(' ', '')},${info.lat},${info.lng}`;
    
    const status = getStatusInfo(info.stat);
    return (
        <div className="w-full p-5 flex justify-center">
            <div className="w-full md:max-w-2xl bg-white shadow-lg rounded-xl p-6 sm:p-8">
                {/* 헤더: 충전소 이름 및 ID */}
                <div className="text-center mb-6 pb-3 border-b border-gray-200">
                    <h1 className="font-extrabold text-3xl sm:text-4xl text-gray-800">
                        {info.statNm}
                    </h1>
                    <span className="text-sm text-gray-500 mt-1 block">
                        (충전소 ID: {info.statId})
                    </span>
                </div>
                <div className={`text-center py-3 px-4 mb-8 text-lg font-bold rounded-lg border-2 ${status.style}`}>
                    {status.msg || '상태 정보 없음'}
                </div>
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <p className="text-lg font-semibold text-gray-700 mb-1">
                                📍 {info.addr}
                            </p>
                            <p className="text-md text-green-600 font-medium">
                                ⏱️ {info.useTime || '정보 없음'}
                            </p>
                        </div>
                        <a href={kakaoMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex justify-center items-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition duration-150 text-gray-900 font-bold py-3 px-6 shadow-md"
                        >
                            카카오 지도로 보기
                        </a>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    사업자 및 운영 정보
                </h2>

                <div className="divide-y divide-gray-100">
                    <div className="flex justify-between py-3 px-2">
                        <span className="w-1/3 font-medium text-gray-600">기관명</span>
                        <span className="w-2/3 text-right text-gray-800">{info.bnm || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-3 px-2">
                        <span className="w-1/3 font-medium text-gray-600">운영 기관명</span>
                        <span className="w-2/3 text-right text-gray-800">{info.busiNm || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-3 px-2">
                        <span className="w-1/3 font-medium text-gray-600">문의 전화</span>
                        <span className="w-2/3 text-right text-gray-800">
                            {info.busiCall ? (
                                <a
                                    href={`tel:${info.busiCall}`}
                                    className="text-blue-500 hover:text-blue-700 font-semibold"
                                >
                                    📞 {info.busiCall}
                                </a>
                            ) : 'N/A'}
                        </span>
                    </div>
                </div>

                {/* 3. 목록으로 돌아가기 버튼 */}
                <div className="mt-8 text-center">
                    <Link to={"/ChargerInfo"}
                        className="inline-flex items-center text-gray-600 hover:text-blue-600 transition duration-150 font-semibold"
                    >
                        <span>← 목록으로 돌아가기</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}
