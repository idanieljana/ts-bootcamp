import fetch from "node-fetch";

export function getJson<T>(url: string): Promise<T> {
    return fetch(url).then((r) => r.json());
}


export async function getDirectorsSequentially(urls: string[]) {
    const jsons: any = []
    for (const url of urls) {
        const json = await getJson(url);
        console.log(json);
        jsons.push(json);
    }
    return jsons;
}

describe('should request sequentially', () => {
    test('should request directors sequentially', async () => {
        const directors = await getDirectorsSequentially([
            "http://localhost:3000/api/directors/recommendations/3",
            "http://localhost:3000/api/directors/recommendations/2",
            "http://localhost:3000/api/directors/recommendations/10",
            "http://localhost:3000/api/directors/recommendations/10",
            "http://localhost:3000/api/directors/recommendations/10",
            "http://localhost:3000/api/directors/recommendations/1220",
            "http://localhost:3000/api/directors/recommendations/10",
            "http://localhost:3000/api/directors/recommendations/2002",
            "http://localhost:3000/api/directors/recommendations/1200",
        ]);
        expect(directors).toEqual({});
    });
});