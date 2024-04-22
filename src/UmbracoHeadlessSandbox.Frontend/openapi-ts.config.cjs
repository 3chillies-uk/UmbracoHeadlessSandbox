/** @type {import('@hey-api/openapi-ts').UserConfig} */
module.exports = {
    input: 'http://localhost:27546/umbraco/swagger/delivery/swagger.json',
    output: 'src/scripts/api',
    enums: true,   
    useOptions: true,
    postfixServices: "Service",
    name: "UmbracoApiClient"
}