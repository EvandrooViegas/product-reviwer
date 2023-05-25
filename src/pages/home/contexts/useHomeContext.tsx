import { createContext, useContext } from "react";
import { IUseAsyncDataReturn } from "../../../hooks/useAsyncData";
import { getCollections } from "../../../services/collection";
import { getProducts } from "../../../services/product";
import { IMainLayoutContext } from "../../../components/UI/layouts/types";

type IHomeContext = {
  appQuery: IMainLayoutContext;
  collectionsQuery: IUseAsyncDataReturn<typeof getCollections>;
  productsQuery: IUseAsyncDataReturn<typeof getProducts>;
};
export const HomeContext = createContext({} as IHomeContext);
export const useHomeContext = () => {
  return useContext(HomeContext);
};