import { RecoilRoot, RecoilState, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { jsonUrlPosts } from "../constants/url";

export const postList = atom({
    key: 'postList',
    default: [],
});
export const postListPageNumber = atom({
    key: 'postListPageNumber',
    default: 1,
});
export const postListFilterItems = atom({
    key: 'postListFilterItems',
    default: {
        title: '',
        number: '',
    }
});
export const getPostList = selector({
    key: 'getPostList',
    get: async ({get}) => {
        const count = get(postListFilterItems);
        const res = await fetch(`${jsonUrlPosts}`/*, {next: { revalidate: 0 }}*/);
        const resData = res.json();

        return resData;
    },
});