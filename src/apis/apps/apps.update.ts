import {SteamAppsType, App as SteamApp} from "./fetch.types";
import {getapps} from "./fetch";
import AppModelType from "../../models/AppModel.types";
import AppModel from "../../models/AppModel";

export async function updateApps() {
    const {
        applist: { apps },
    }: SteamAppsType = await getapps();

    const unique_apps_from_cloud = await filterUniqueAppsFromCloud(apps);
    const missing_apps_from_db = await filterMissingAppsFromDb(
        unique_apps_from_cloud
    );

    const data: Array<AppModelType> = missing_apps_from_db.map((app) => {
        const output: AppModelType = {
            id: app.appid,
            name: app.name,
            type: null,
            synced_at: null,
            header_image: null,
        };
        return output;
    });
    return await AppModel.bulkCreate(data);
}

function filterUniqueAppsFromCloud(apps: Array<SteamApp>) {
    return apps.filter(
        (app, index, apps) =>
            apps.findIndex((_app) => _app.appid === app.appid) === index
    );
}

async function filterMissingAppsFromDb(apps: Array<SteamApp>) {
    const all_apps_in_db = await AppModel.findAll();
    return apps.filter(
        (app, index, apps) =>
            all_apps_in_db.findIndex((_app:any) => _app.id === app.appid) === -1
    );
}