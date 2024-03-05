'use client';

import { useRouter } from "next/navigation";
import { jsonUrlPosts } from "../constants/url";
import { useRecoilRefresher_UNSTABLE, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { getPostList, postList } from "../recoilStore/posts";

export function ListItem({ item }: { item: { id: string, title: string, views: number } }) {
    //const router = useRouter();
    const refresh = useRecoilRefresher_UNSTABLE(postList);

    async function removeItem(id: string) {
        const res = await fetch(`${jsonUrlPosts}${id}`, { method: 'delete' });
        if (!res.ok) {
            throw new Error('Remove Error!');
        }
        refresh();
        //router.refresh();
    }

    async function changeItem(e: any) {
        e.preventDefault();
        const title = e.target.title.value;
        const views = Math.abs(e.target.views.value);
        const res = await fetch(`${jsonUrlPosts}${item.id}`, { 
            method: 'put',
            body: JSON.stringify({title, views}) 
        });
        if (!res.ok) {
            throw new Error('Remove Error!');
        }
        e.target.views.value = views;
        refresh();
        //router.refresh();
    }
    return (
        <li className="border-b pb-3">
            <form onSubmit={changeItem}>
                <div className="flex gap-2">
                    <div><input type="text" name="title" className="border" defaultValue={item.title} /></div>
                    <div><input type="number" name="views" className="border" defaultValue={item.views} /></div>
                </div>
                <div className="flex gap-2 mt-1">
                    <button type="submit" className="p-1 px-2 bg-gray-500 text-white">Edit</button>
                    <button type="button" className="p-1 px-2 bg-rose-500 text-white" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            </form>
        </li>
    )
}