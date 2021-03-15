import React, { useEffect, useState, useRef } from "react";
import { UlPager, LiPager, ButtonPage } from "./styledPagination";
import { usePrevious } from "../../Hooks/usePrevious";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useGetParametr } from "../../Hooks/useGetParametr";
const Pagination = ({
  toShowPagesAtOnce,
  TotalPages,
  handlerFetchItems,
  ItemsPerPage,
  itemWasCreated,
  pageNeighbours,
  itemWasDeleted,
  isSorted,
}) => {
  const Dispatch = useDispatch();
  const [DisablePages, SetDisablePages] = useState([]);
  let pageParams = useGetParametr("page") || 1;

  const CurrenPageRef = useRef(Number(pageParams));
  const prevCurrentPage = usePrevious(Number(pageParams));

  useEffect(() => {
    if (TotalPages.length >= 1) {
      onChangeCurrentPage(Number(pageParams), isSorted);
    } else {
      SetDisablePages([]);
    }
  }, [TotalPages, isSorted, pageParams]);

  const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const onChangeCurrentPage = async (page) => {
    const lastOnePage = TotalPages.length;
    // оПределяем CurrenPageRef если был добавлен елемент определяем CurrenPageRef как последнею страницу, а так же ставим полследнию стр если карточка была удалена и  CurrenPageRef больше чем длина массива
    CurrenPageRef.current =
      itemWasCreated || (CurrenPageRef.current > lastOnePage && itemWasDeleted)
        ? lastOnePage
        : page;
    // Определяем страницы после первого разрыва и до последнего
    let startPage = CurrenPageRef.current - pageNeighbours;
    let endPage = CurrenPageRef.current + pageNeighbours;

    // Определяем полседнию страницу где будет ничинаться разрыв
    let breakLastPage =
      toShowPagesAtOnce > 5
        ? lastOnePage - (toShowPagesAtOnce - 2)
        : lastOnePage - (toShowPagesAtOnce - 1);

    if (page === "...") {
      CurrenPageRef.current = Number(pageParams);
      console.log("xxx");
    }
    if (
      page >= toShowPagesAtOnce &&
      page !== lastOnePage &&
      page <= breakLastPage &&
      lastOnePage >= toShowPagesAtOnce + 1
    ) {
      console.log("onChange 1");

      let extraPages = range(startPage, endPage);
      SetDisablePages([
        "LEFT_PAGE",
        1,
        "...",
        ...extraPages,
        "...",
        lastOnePage,
        "RIGHT_PAGE",
      ]);
    } else if (
      page < toShowPagesAtOnce &&
      lastOnePage >= toShowPagesAtOnce + 1
    ) {
      let extraPages = range(1, toShowPagesAtOnce);
      SetDisablePages([
        "LEFT_PAGE",
        ...extraPages,
        "...",
        lastOnePage,
        "RIGHT_PAGE",
      ]);
      // console.log("OnchangePage 2");
    } else if (
      (page === lastOnePage && lastOnePage >= toShowPagesAtOnce + 1) ||
      (page >= breakLastPage + 1 && lastOnePage >= toShowPagesAtOnce + 1)
    ) {
      console.log("onChange 3");
      let extraPage = range(lastOnePage - (toShowPagesAtOnce - 1), lastOnePage);
      SetDisablePages(["LEFT_PAGE", 1, "...", ...extraPage, "RIGHT_PAGE"]);
      // console.log("OnchangePage 3", extraPage);
    } else if (lastOnePage < toShowPagesAtOnce) {
      console.log("onChange 4");
      let extraPages = range(1, lastOnePage);
      SetDisablePages(["LEFT_PAGE", ...extraPages, "RIGHT_PAGE"]);
    }
  };

  const Left_page = () => {
    let page = Number(pageParams);
    onChangeCurrentPage(page);
  };

  const Right_page = () => {
    let page = Number(pageParams);
    onChangeCurrentPage(page);
  };
  return (
    <>
      <UlPager>
        {DisablePages.map((page, index) => {
          if (page === "LEFT_PAGE") {
            return (
              <Link
                key={index}
                to={{
                  search: `?page=${
                    CurrenPageRef.current === 1 ? 1 : CurrenPageRef.current - 1
                  }`,
                }}
              >
                <LiPager>
                  <ButtonPage disabled={0} onClick={() => Left_page()}>
                    Prev
                  </ButtonPage>
                </LiPager>
              </Link>
            );
          }
          if (page === "RIGHT_PAGE") {
            return (
              <Link
                key={index}
                to={{
                  search: `?page=${
                    CurrenPageRef.current === TotalPages.length
                      ? TotalPages.length
                      : CurrenPageRef.current + 1
                  }`,
                }}
              >
                <LiPager>
                  <ButtonPage disabled={0} onClick={() => Right_page()}>
                    Next
                  </ButtonPage>
                </LiPager>
              </Link>
            );
          }
          return (
            <Link
              key={index}
              to={{ search: `?page=${page === "..." ? pageParams : page}` }}
            >
              <LiPager>
                <ButtonPage
                  onClick={() => onChangeCurrentPage(page)}
                  isActive={
                    page === CurrenPageRef.current && page !== "..." ? 1 : 0
                  }
                >
                  {page}
                </ButtonPage>
              </LiPager>
            </Link>
          );
        })}
      </UlPager>
    </>
  );
};

export default Pagination;
