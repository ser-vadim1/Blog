import React, { useCallback, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { PaginationWrapper } from "./styledPaginContainer";
import { FetchCards } from "../../Redux/adjustDb";
import { useDispatch, useSelector } from "react-redux";
const PaginationContainer = () => {
  let Dispath = useDispatch();
  const ItemsPerPage = useSelector((state) => state.AllUsers.ItemsPerPage);
  const TotalPages = useSelector((state) => state.AllUsers.totalPages);
  const TotalItems = useSelector((state) => state.AllUsers.totalItems);
  const itemWasCreated = useSelector((state) => state.HeroDb.itemWasCreated);
  const itemWasDeleted = useSelector((state) => state.HeroDb.itemWasDeleted);

  const handlerFetchCards = useCallback(
    async (SkipDoc) => {
      let resultAction = await Dispath(FetchCards(SkipDoc));
      return resultAction;
    },
    [Dispath]
  );

  return (
    <>
      <PaginationWrapper>
        <Pagination
          toShowPagesAtOnce={5}
          TotalPages={TotalPages}
          handlerFetchItems={handlerFetchCards}
          ItemsPerPage={ItemsPerPage}
          totalCards={TotalItems}
          itemWasCreated={itemWasCreated}
          itemWasDeleted={itemWasDeleted}
          pageNeighbours={2}
        />
      </PaginationWrapper>
    </>
  );
};

export default PaginationContainer;
