import {
    APIInstance_Google_Scholar,
    APIInstance_IEEE,
} from "../config/APIInstance";

export default class SearchServices {
    static async google_scholar() {
        try {
            const data = await APIInstance_Google_Scholar.get();
            return data;
        } catch (err) {
            return err;
        }
    }

    static async ieee() {
        try {
            const data = await APIInstance_IEEE.get();
            return data;
        } catch (err) {
            return err;
        }
    }
}
