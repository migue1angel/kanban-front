require("dotenv").config();
const { writeFileSync, mkdirSync } = require("fs");
const path = "./src/environments/environment.ts";

const envFileContent = `
export const environment = {
    baseApiUrl: '${process.env.API_URL}'
}
`;

mkdirSync("./src/environments", { recursive: true });
writeFileSync(path, envFileContent);
