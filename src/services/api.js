import axios from 'axios'

export default class Api {
    static api = axios.create({
        baseURL: 'https://api.imgur.com/3',
        headers: {
            'Authorization': 'Client-ID b7a38f5989011ba'
        }
    });

    static async getImages({section, sort, window, page, showViral}) {
        const res = await Api.api.get(`/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}`);
        return res.data.data;
    }

    static async getAlbum(id) {
        const res = await Api.api.get(`/gallery/album/${id}`);
        return res.data.data;
    }
}