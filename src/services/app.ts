import { sanity } from "../lib/sanity";
import { _iApp, iApp } from "../types";
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
      elements: _app.swiper.elements.map((element) => ({
        ...element,
        banner: getImageUrl(element.banner || element.image)
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
