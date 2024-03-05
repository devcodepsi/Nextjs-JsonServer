'use client';
import { useRecoilState } from "recoil";
import { postListPageNumber } from '../recoilStore/posts';
import { useEffect } from "react";

export default function Paging({pageNumber, setPageNumber}: {pageNumber:number, setPageNumber:any}) {

    const setColor = (value:number) => pageNumber === value ? 'text-blue-500 font-weight-600' : 'text-gray-500';
    return (
        <div className="flex gap-3 text-center justify-center mt-3">
            <span onClick={()=>setPageNumber(1)} className={setColor(1)}>1</span>
            <span onClick={()=>setPageNumber(2)} className={setColor(2)}>2</span>
            <span onClick={()=>setPageNumber(3)} className={setColor(3)}>3</span>
        </div>
    )
}