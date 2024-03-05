'use client';

import { useRouter } from "next/navigation";
import { jsonUrlPosts } from "../constants/url";
import { setCookie } from 'cookies-next';
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { getPostList, postList } from "../recoilStore/posts";

export default function Create() {
    //const router = useRouter();
    const refresh = useRecoilRefresher_UNSTABLE(postList);

    async function addItem(e: any) {
        e.preventDefault();
        let title = e.target.title.value;
        let views = Math.abs(e.target.views.value);
        const res = await fetch(`${jsonUrlPosts}`, { 
            method: 'post',
            body: JSON.stringify({title, views}) 
        });
        if (!res.ok) {
            throw new Error('Remove Error!');
        }
        
        const expiredTime = new Date(Date.now() + 60 * 60);
        setCookie('title', title, { expires: expiredTime, /* maxAge: 5, */ path: '/'});
        e.target.title.value = '';
        e.target.views.value = 0;
        refresh();
        //router.refresh();
    }

    return (
        <form className="flex p-5 border bg-slate-200 mb-5" onSubmit={addItem}>
            <div><input type="text" name="title" className="border" defaultValue={''} required minLength={3} /></div>
            <div><input type="number" name="views" className="border" defaultValue={0} required /></div>
            <div><button type="submit" className="py-1 p-3 bg-slate-500 text-white">Add</button></div>
        </form>
    )
}