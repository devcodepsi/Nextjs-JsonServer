'use client'
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, useRecoilRefresher_UNSTABLE } from "recoil";
import Filter from "./filter";
import { ListItem } from "./listItem";
import Paging from "@/app/@components/paging";
import { getPostList, postList, postListPageNumber } from "../recoilStore/posts";
import { Suspense, useCallback, useEffect, useState } from "react";
import { jsonUrlPosts } from "../constants/url";


interface listItemInterface {
  id: string;
  title: string;
  views: number;
}

export default function List() {
  const [data, setData] = useRecoilState(postList);
  const [pageNum, setPageNum] = useRecoilState(postListPageNumber);

  useEffect(()=>{
    const getList = async() => {
      const res = await fetch(`${jsonUrlPosts}`/*, {next: { revalidate: 0 }}*/);
      const resData = await res.json();
      setData(resData);
    }
    getList();
  },[])


  return (
    <Suspense fallback={<p>loading...</p>}>
      <Filter />
      {
        data.length === 0 ? 
          <p>데이터가 없습니다.</p>
          : 
          <>
            <ul className="flex flex-col gap-2 border-t pt-3">
              {data.map((item: listItemInterface) => (
                <ListItem key={item.id} item={item} />
              ))}
            </ul>
            <Paging pageNumber={pageNum} setPageNumber={setPageNum} />
          </>
      }
    </Suspense>
  )

}
