import { useState } from "react";
import "./ManageItem.css";

function ManageItem({data, onDelete, onUpdateNum, onUpdateManager}){
    const [isEditing, setIsEditing] = useState(false);
    const [tempManager, setTempManager] = useState(data.manager);

    const [addSellInput, setAddSellInput] = useState("");

    const progressPercent = Math.floor((1-(data.sellNum / data.totalNum))*100);

    const handleSaveManager = ()=>{
        onUpdateManager(data.id, tempManager);
        setIsEditing(false);
    };

    const handleAddManager = ()=>{
        if(!addSellInput) return;
        onUpdateNum(data.id, addSellInput);
        setAddSellInput("");
    };

    return(
        <div className="manage-card">
            <div className="title-area">
                <h3>{data.title}</h3>
                <button className="delete-btn" onClick={()=> onDelete(data.id)}>삭제</button>
            </div>

            <div className="manage-info">

                <div className="manage-cont">
                    <img src={data.imgUrl} alt="상품 이미지" className="manage-cover" />
                    <div className="progress-area">
                        <div className="progress-text">
                            <span>재고율: {progressPercent}%</span>
                            <p className="num">재고 수량 / 판매 수량</p>
                            <span><b>{data.totalNum} / {data.sellNum}</b></span>
                        </div>

                        <div className="progress-bg">
                            <div className="progress-fill" style={{width: `${progressPercent}%`}}></div>
                        </div>

                        {data.sellNum < data.totalNum && (
                            <div className="add-page-box">
                                <input type="number" placeholder="오늘 판매 수량" value={addSellInput} onChange={(e)=> setAddSellInput(e.target.value)}/>
                                <button onClick={handleAddManager}>추가</button>
                            </div>
                        )}
                    </div>
                 </div>

                <div className="manager-area">
                    <div className="area-title">
                        상품관리 전달사항
                    </div>
                    {isEditing ? (
                        <div className="edit-box">
                            <textarea value={tempManager} onChange={(e)=> setTempManager(e.target.value)} placeholder="상품관리 전달사항을 작성해 주세요."/>

                                <button className="save-btn" onClick={handleSaveManager}>저장</button>
                        </div>
                    ) : (
                        <div className="item-box">
                            <p className="manager-text">
                                {data.manager || "아직 등록된 상품이 없습니다."}
                            </p>
                            <button className="edit-btn" onClick={()=> setIsEditing(true)}>작성하기</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageItem;