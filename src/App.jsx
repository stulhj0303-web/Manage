import { useState } from "react";
import ManageItem from './components/ManageItem';
import './App.css';

function App(){
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [totalNum, setTotalNum] = useState("");

  const [manageList, setManageList] = useState([
    {
      id:1,
      title: '마이쮸 사과맛',
      imgUrl: "https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20250908_139%2F1757313482501gQA0j_PNG%2F10908394645212768_409104815.png&type=sc960_832",
      totalNum: 25,
      sellNum:10,
      manager:"금방 팔려서 재고 늘려주세요."
    },
    {
      id:2,
      title: '허니버터칩',
      imgUrl: "https://search.pstatic.net/common/?src=https%3A%2F%2Fshop-phinf.pstatic.net%2F20250526_229%2F1748251193156yCcl5_JPEG%2F2906009116354728_917083266.jpg&type=sc960_832",
      totalNum: 5,
      sellNum:4,
      manager:"포장지 바뀌어서 잘 팔립니다. 재고 늘려주세요."
    }
  ])

  const sellManage = ()=>{
    if(!title || !imgUrl || !totalNum){
      alert("상품명, 상품이미지, 재고수량은 꼭 입력해주세요!");
      return;
    }

    const newManage = {
      id: Date.now(),
      title:title,
      imgUrl:imgUrl,
      totalNum:Number(totalNum),
      sellNum:0,
      manager:""
    };

    setManageList([...manageList, newManage]);
    setTitle(""); setImgUrl(""); setTotalNum("");
  };

  const deleteManage = (targetId)=>{
    setManageList(manageList.filter((manage)=>manage.id !== targetId));
  };

  const updateNum = (targetId, sellAmount)=>{
    setManageList(manageList.map((manage)=>{
      if(manage.id === targetId){
        const newTotalNum = Math.min(manage.totalNum,  manage.sellNum + Number(sellAmount));
        return {...manage, sellNum:newTotalNum};
      }
      return manage;
    }));
  };

  const updateManager = (targetId, newManager)=>{
    setManageList(manageList.map((manage)=>{
      if(manage.id === targetId){
        return{...manage, manager:newManager};
      }
      return manage;
    }));
  };

  return(
    <div className="app-wrap">
      <h2>🍫 STU 매점관리 프로그램</h2>

      <div className="input-box">
        <input type="text" placeholder="상품 명" value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <input type="text" placeholder="상품 이미지(URL)" value={imgUrl} onChange={(e)=> setImgUrl(e.target.value)}/>
        <input type="number" placeholder="재고 수량" value={totalNum} onChange={(e)=> setTotalNum(e.target.value)}/>
        <button onClick={sellManage}>등록하기</button>
      </div>

      <div className="manage-board">
        {manageList.map((manage)=>(
          <ManageItem key={manage.id} data={manage} onDelete={deleteManage} onUpdateNum = {updateNum} onUpdateManager={updateManager}/>
        ))}
      </div>
    </div>
  );
}

export default App;