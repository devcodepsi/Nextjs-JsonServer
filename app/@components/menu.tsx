'use client';
import Link from "next/link";
import { postListFilterItems } from "../recoilStore/posts";
import { useResetRecoilState } from "recoil";

export default function Menu() {
    const resetFilter = useResetRecoilState(postListFilterItems);
    return (
        <menu className="flex gap-3 p-3 border-b border-black">
            <Link href="/">menu1</Link>
            <Link href="/sub">menu2</Link>
            <Link href="/sub2" onClick={resetFilter}>menu3</Link>
        </menu>
    )
}