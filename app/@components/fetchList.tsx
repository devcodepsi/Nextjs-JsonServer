'use client';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable } from "recoil";
import Filter from "./filter";
import { ListItem } from "./listItem";
import Paging from "@/app/@components/paging";
import { getPostList, postList } from "../recoilStore/posts";
import { useCallback, useEffect, useState } from "react";

export default function FetchList() {
  const loadingData = useRecoilValueLoadable(getPostList);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useRecoilState(postList);

  const getFetchingData = useCallback(()=>{
    switch(loadingData.state) {
      case 'loading' : 
        setIsError(false);
        setIsLoading(true);
        break;
      case 'hasValue' :
        setIsError(false);
        setIsLoading(false);
        setData(loadingData.contents);
        break;
      case 'hasError':
        setIsError(true);
        setIsLoading(false);
        break;
      default : 
        return;
    }
  },[loadingData, data])
  
  useEffect(()=>{
    getFetchingData();
  },[getFetchingData])
  
  return { isLoading, isError, data}

}
