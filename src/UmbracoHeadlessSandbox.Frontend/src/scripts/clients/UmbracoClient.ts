import { UmbracoApiClient } from "@scripts/api/UmbracoApiClient";

export default function UmbracoClient() {
    const umbraco = new UmbracoApiClient({
        BASE: import.meta.env.API_BASE_URL
    });
    return umbraco;
}

export async function GetAllRoutes() {
    try {
        return await UmbracoClient().content?.getContent20({
            apiKey: process.env.UMBRACO_API_KEY,
            preview: JSON.parse(process.env.UMBRACO_PREVIEW?.toLowerCase()),
            fetch: "descendants:/",
            take: 10000,
            fields: "route",
            sort: ["sortOrder:asc"]
        });
    } catch { return null; }
}

export async function GetNavigation() {
    try {
        return await UmbracoClient().content?.getContent20({
            apiKey: process.env.UMBRACO_API_KEY,
            preview: JSON.parse(process.env.UMBRACO_PREVIEW?.toLowerCase()),
            fetch: "children:/",
            take: 10000,
            fields: "route,properties[title]",
            sort: ["sortOrder:asc"],
            filter: ["umbracoNaviHide:False"]
        });
    } catch { return null; }
}

export async function GetListingItems(route: string, fields: string) {
    try {
        
        return await UmbracoClient().content?.getContent20({
            apiKey: process.env.UMBRACO_API_KEY,
            preview: JSON.parse(process.env.UMBRACO_PREVIEW?.toLowerCase()),
            fetch: "children:" + route,
            take: 10000,
            fields: fields,
            sort: ["sortOrder:asc"],
            filter: ["umbracoNaviHide:False"]
        });
    } catch { return null; }
}


export async function GetContentItemByPath(path: string) {
    try {
        return await UmbracoClient()?.content?.getContentItemByPath20({
            apiKey: process.env.UMBRACO_API_KEY,
            preview: JSON.parse(process.env.UMBRACO_PREVIEW?.toLowerCase()),
            path: path,
            expand: "properties[content[properties[$all]],$all]",
        });
    } catch { return null; }
}


export async function GetSitemap(key: string) {
    try {
        return await UmbracoClient().content?.getContent20({
            apiKey: process.env.UMBRACO_API_KEY,
            preview: JSON.parse(process.env.UMBRACO_PREVIEW?.toLowerCase()),
            fetch: "children:" + key,
            take: 10000,
            fields: "route,properties[title]",
            sort: ["sortOrder:asc"],
            filter: ["umbracoNaviHide:False"]
        });
    } catch { return null; }
}