// https://www.geojs.io/docs/v1/endpoints/geo/
export async function fetchGeo(ip: string = ""): Promise<string> {
    let url = "https://get.geojs.io/v1/ip/geo"
    url = url + (ip ? `/${ip}.json` : ".json")
    return fetch(url)
    .then((res) => res.text());
}
