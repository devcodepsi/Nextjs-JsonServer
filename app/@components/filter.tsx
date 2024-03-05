'use client';
import { useEffect, useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilState } from "recoil";
import { getPostList, postList, postListFilterItems } from "../recoilStore/posts";


export default function Filter() {
    const refresh = useRecoilRefresher_UNSTABLE(postList);

    const [filterData, setFilterData] = useRecoilState(postList);

    const [filterVal, setFilterVal] = useRecoilState(postListFilterItems);
    const changeFilterTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterVal({...filterVal, title: e.target.value})
    }
    const changeFilterNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterVal({...filterVal, number: e.target.value})
    }

    const dataFiltering = () => {
        /*setFilterData([
            filterData.filter( (filterItem: {title: string, views: number} ) => (
                filterItem.title.toLowerCase().includes(filterVal.title.toLocaleLowerCase()) || filterItem.views === Number(filterVal.number)
            ) )
        ])*/
        console.log(filterData.filter( (filterItem: {title: string, views: number} ) => (
            filterItem.title.toLowerCase().includes(filterVal.title.toLocaleLowerCase()) || filterItem.views === Number(filterVal.number)
        ) ))
    }

    useEffect(()=>{
        refresh();
    },[filterData])

    const getFilterList = () => {
        dataFiltering();
    }

    return (
        <div className="border mb-3 p-3 flex gap-2">
            <input type="text" defaultValue={filterVal.title} onChange={changeFilterTitle} className="border" placeholder="title" />
            <input type="number" defaultValue={filterVal.number} onChange={changeFilterNumber} className="border" placeholder="number" />
            <button type="button" onClick={getFilterList} className="bg-green-500 px-3 py-1 text-white">검색</button>
        </div>   
    )
}