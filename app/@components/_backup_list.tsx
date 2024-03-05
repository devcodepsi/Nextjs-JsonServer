import { jsonUrlPosts } from "../constants/url";
import Filter from "./filter";
import { ListItem } from "./listItem";
import Paging from "@/app/@components/paging";
import { InferGetStaticPropsType, GetStaticProps } from "next";

async function getData(currentPage: number) {
  // `${jsonUrlPosts}?_page=${currentPage}&_per_page=${perPage}
  const res = await fetch(`${jsonUrlPosts}`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    throw new Error("Feching Error!");
  }
  return  res.json();
}

interface listItemInterface {
  id: string;
  title: string;
  views: number;
}

export default async function List() {
  let data = await getData(1);
  console.info("list is ", data);

  return (
    <div>
      <Filter />
      <ul className="flex flex-col gap-2 border-t pt-3">
        {data.map((item: listItemInterface) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
      <Paging />
      {/* <Paginate totalPages={10} currentPage={1} /> */}
    </div>
  );
}
