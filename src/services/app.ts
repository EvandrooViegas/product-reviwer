import { sanity } from "../lib/sanity"
import { _iApp, iApp } from "../types"
import getImageUrl from "../utils/get-image-url"

function formatApp(_app:_iApp):iApp {
    return {
        ..._app,
        avatar: getImageUrl(_app.avatar),
        socials:  _app.socials.map(s => ({
          ...s,
          icon: getImageUrl(s.icon)
        })),
        
    }
}
export async function getApp() {
    const _app:_iApp = await sanity
     .fetch(`*[_type == 'app'][0]{
        ...,
        socials[]{
          ...,
          "icon": icon->icon
        }
    }`)

    return formatApp(_app)
}