'use client';

import {useState} from "react";
import Link from "next/link";

export default function Pagination({ totalPages, currentPage }) {
    const pageGroups = [];
    for (let i = 1; i <= totalPages; i += 2) {
      pageGroups.push([i, Math.min(i + 2 - 1, totalPages)]);
    }
  
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  
    const handleGroupChange = (direction) => {
      if (direction === "prev") {
        setCurrentGroupIndex(currentGroupIndex - 1);
      } else {
        setCurrentGroupIndex(currentGroupIndex + 1);
      }
    };
  
    return (
      <div>
        <ul>
          {pageGroups[currentGroupIndex].map((pageNumber) => (
            <li key={pageNumber}>
              <Link href={`./?_page=${pageNumber}&_per_page=2`} className={currentPage === pageNumber ? "active" : ""}
                  onClick={() => {}}>
                  {pageNumber}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={() => handleGroupChange("prev")}>이전</button>
        <button onClick={() => handleGroupChange("next")}>다음</button>
      </div>
    );
  }