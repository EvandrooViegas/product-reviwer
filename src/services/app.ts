import { sanity } from "../lib/sanity";
import { _iApp, iApp } from "../types";
import formatDate from "../utils/format-date";
import getImageUrl from "../utils/get-image-url";

function formatApp(_app: _iApp): iApp {
  return {
    ..._app,
    avatar: getImageUrl(_app.avatar),
    socials: _app.socials.map((s) => ({
      ...s,
    })),
    swiper: {
      ..._app.swiper,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      elements: _app.swiper.elements.map((element) => ({
        ...element,
        banner: getImageUrl(element.banner || element.image),
        formated_date: formatDate(element._createdAt),
      })),
    },
  };
}
export async function getApp() {
  const _app: _iApp = await sanity.fetch(`*[_type == 'app'][0]{
        ...,
        socials[]{
          ...,
          "icon": icon->icon
        },
        swiper {
          ...,
          elements[]->{
           ...,
           cupom-> 
          }
        }
    }`);

  return formatApp(_app);
}
