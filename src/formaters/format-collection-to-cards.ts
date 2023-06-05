import { cardsConfig } from "../../config";
import { iCard } from "../components/UI/CardList";
import { iCollection } from "../types";
import trimString from "../utils/trim-string";

export const formatCollectionsToCards = (
    collections: iCollection[] | null
  ): iCard[] | null => {
    return (
      Array.isArray(collections) ? collections?.map((collection) => ({
        id: collection._id,
        image: collection.banner,
        text: collection.name,
        type: collection._type,
        date: collection.formated_date,
        description: trimString(collection.description || "", {
          end: cardsConfig.maxStringLength
        }),
      })) : null
    );
  };