import axios from 'axios'

export default class Api {
    static api = axios.create();

    static async getImages({section, sort, window, page, showViral}) {
        const res = await axios.get(`/api/gallery/${section}/${sort}/${window}/${page}?showViral=${showViral}`);
        return res.data.data;
    }

    static async getAlbum(id) {
        const res = await axios.get(`/api/gallery/album/${id}`);
        return res.data.data;
    }
}