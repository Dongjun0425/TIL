import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useNavigate } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import eastSeoul from './img/eastSeoul.jpg'
import eulji from './img/eulji.jpg'
import gachon from './img/gachon.jpg'
import ict from './img/ict.jpg'
import shingu from './img/shingu.jpg'
import yongin from './img/yongin.jpg'


function Home() {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value); // 드롭다운에서 선택한 값을 업데이트
    };
    const SearchBar = () => {
        const navigate = useNavigate();
    }
      
        const handleSearch = () => {
          const searchQuery = document.getElementById("searchInput").value;
          if (searchQuery) {
            // 검색 로직을 여기에 추가
            navigate(`/search?query=${searchQuery}`);
          } else {
            alert("검색어를 입력해주세요!");
          }
        };
    
    const Data = [
        { id: "Shingu", title: "신구대학교", subtitle: "성남시", imgSrc: shingu },
        { id: "yongin", title: "용인대학교", subtitle: "용인시", imgSrc: yongin },
        { id: "eastSeoul", title: "동서울대학교", subtitle: "성남시", imgSrc: eastSeoul },
        { id: "eulji", title: "을지대학교", subtitle: "성남시", imgSrc: eulji },
        { id: "ict", title: "ICT폴리텍대학", subtitle: "광주시", imgSrc: ict },
        { id: "gachon", title: "가천대학교", subtitle: "성남시", imgSrc: gachon }
    ];
    
      

  
    return (
        <>
         <div 
        style={{
        position : "relative",
          top: "-30px",
          left: "-60px",
          color: "black",
          textAlign: "left",
          margin: "0px",
          fontSize : "40px",
          fontWeight : "bold"
        }}>
         <span onClick={() => navigate(".")}
        style={{ cursor: "pointer" }}> 학교랭킹</span>
      </div>
    <div style={{
                color: "black",
                paddingRight : "50px",
                display : "flex",
                justifyContent : "space-around",
                fontSize : "25px",
                
                
            }}
>
        <span onClick={() => navigate("/ranking")}
        style={{ 
            cursor: "pointer" }}
            onMouseEnter={(e) =>  {(e.currentTarget.style.color = "#0000ff");
                (e.currentTarget.style.fontWeight = "bold")
            }}   
            onMouseLeave={(e) =>  {(e.currentTarget.style.color = "#000000");
                (e.currentTarget.style.fontWeight = "normal")
            }}> 캠퍼스 랭킹</span>
        <span onClick={() => navigate("/news")}
        style={{cursor: "pointer"}}  onMouseEnter={(e) =>  {(e.currentTarget.style.color = "#0000ff");
            (e.currentTarget.style.fontWeight = "bold")
        }}   
        onMouseLeave={(e) =>  {(e.currentTarget.style.color = "#000000");
            (e.currentTarget.style.fontWeight = "normal")
        }}>뉴스</span>
        <span onClick={() => navigate("location")}
        style={{cursor: "pointer"}}  onMouseEnter={(e) =>  {(e.currentTarget.style.color = "#0000ff");
            (e.currentTarget.style.fontWeight = "bold")
        }}   
        onMouseLeave={(e) =>  {(e.currentTarget.style.color = "#000000");
            (e.currentTarget.style.fontWeight = "normal")
        }}>캠퍼스 위치</span>
    </div>
    <div
    style={{
        position: "absolute", 
        top: "0px",
        right: "0px", 
        color: "black",
        textAlign: "right",
        margin: "0px",
        fontSize: "20px",
        padding: "10px"
    }}
>
     <span onClick={() => navigate("/login")}
        style={{cursor:"pointer"}}>로그인</span>
     <span> | </span>
     <span onClick={() => navigate("/signup")}
        style={{cursor:"pointer"}}>회원가입</span>
</div>
<div
                style={{
                    marginTop: "40px", 
                    textAlign: "left",
                    marginLeft: "70px"
                }}
            >
                <div>
                <div>
                <input 
                id ="searchInput"  
                style={{ 
                    width: "1000px",
                    height: "30px",
                    padding: "20px",
                    outline: "none",
                    fontSize:"20px",
                    border: "1px solid #000000",
                    borderRadius: "10px"
                    }}
                    type="text"
                    placeholder="학교를 검색해보세요."
                    onKeyDown={(event)=> {
                        if(event.key ==="Enter"){
                            handleSearch();
                        }
                    }}
                />
                </div>
                </div>  


            </div>
            <div
                style={{
                    marginTop: "20px",
                    textAlign: "left",
                    marginLeft: "70px",
                }}
            >

                <select
                    id="dropdown"
                    value={selectedOption} // 선택된 옵션 바인딩
                    onChange={handleDropdownChange} // 옵션 변경 이벤트 처리
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                        width: "100px",
                    }}
                >
                    <option value="default" hidden>
                        4년제
                    </option>
                    <option value="4년제">4년제</option>
                    <option value="전문대대">전문대</option>
                </select>

                 <select
                    id="dropdown"
                    value={selectedOption} // 선택된 옵션 바인딩
                    onChange={handleDropdownChange} // 옵션 변경 이벤트 처리
                    style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "16px",
                        marginLeft : "10px",
                        width: "100px",
                    }}>
                <option value="default" hidden>
                        지역
                    </option>
                    <option value="sungnam">성남</option>
                    <option value="gyuangnam">광주</option>
                    </select>

                    <select
    id="dropdown"
    value={selectedOption} // 선택된 옵션 바인딩
    onChange={handleDropdownChange} // 옵션 변경 이벤트 처리
    style={{
        position: "absolute",
        right: "250px",
        fontSize: "15px",     // 글자 크기
        width: "80px",       // 드롭다운 너비
        border: "none",       // 기본 테두리 제거
        borderBottom: "1px solid #000", // 밑줄 추가
        padding: "5px"   // 내부 여백
    }}
>
                <option value="default" hidden>
                        정렬
                    </option>
                    <option value="sungnam">최신순</option>
                    <option value="gyuangnam">이름순</option>
                    </select>
            </div>
        <div style={{
            marginLeft : "50px"}}>
            <div style={{
                display : "flex",
                width : "auto"
            }}>
                <ul style={{
    display: "flex",
    flexDirection: "row",
    gap: "70px",
    marginLeft: "40px",
    padding: "0px",
    listStyle: "none",
    flexWrap : "wrap"
}}>
    {Data.map(item => (
        <li key={item.id} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "30px"
        }}onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        onClick={(e) => navigate(`${item.id}`)}>
            <div style={{
                backgroundColor: "#ECECEC",
                borderRadius: "20px",
                padding: "20px",
                textAlign: "center",
                width: "240px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }} >
    <img src={item.imgSrc} style={{
        width: "240px",
        height: "240px",
        borderRadius: "20px"
    }} />
                <h2 style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    margin: "0",
                    textAlignLast : "left"
                }}>{item.title}</h2>
                <p style={{
                    fontSize: "15px",
                    margin: "5px 0 0 0",
                    textAlign : "left"
                }}>{item.subtitle}</p>
            </div>
        </li>
    ))}
</ul>
            </div> 
           </div>
           <div
    style={{
        position: "fixed",       /* 화면 하단에 고정 */
        bottom: "0",             /* 하단에 위치 */
        left: "0",               /* 왼쪽 끝에 고정 */
        width: "100%",           /* 화면 전체 너비 */
        height: "100px",           /* 푸터 높이 */
        backgroundColor: "gray", /* 배경 색상 */
        margin: "0",             /* 여백 제거 */
        padding: "0",            /* 패딩 제거 */
    }}
>
</div>
 

    </>
    
    )   
      
  }

  
  export default Home;
  