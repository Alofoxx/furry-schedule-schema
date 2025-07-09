// validate.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init AJV
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Load all schemas in schema/ and schema/partials/
async function loadSchemasFromDir(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (filePath.endsWith(".json")) {
            const content = await fs.readFile(filePath, "utf8");
            const schema = JSON.parse(content);
            ajv.addSchema(schema);
        }
    }
}


await loadSchemasFromDir(path.join(__dirname, "schema"));
await loadSchemasFromDir(path.join(__dirname, "schema", "partials"));
await loadSchemasFromDir(path.join(__dirname, "schema", "entity"));

// Compile top-level schema by its $id
const mainSchemaId = "https://github.com/Alofoxx/furry-schedule-schema/schema/furry-schedule-schema.json";
const validate = ajv.getSchema(mainSchemaId);

if (!validate) {
    console.error(`❌ Could not find main schema by $id: ${mainSchemaId}`);
    process.exit(1);
}

// Validate each example file
const examplesDir = path.join(__dirname, "examples");
const files = await fs.readdir(examplesDir);

let hadErrors = false;

for (const file of files) {
    if (!file.endsWith(".json")) continue;

    const filePath = path.join(examplesDir, file);
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    const valid = validate(data);

    if (valid) {
        console.log(`✅ ${file} is valid.`);
    } else {
        hadErrors = true;
        console.error(`❌ ${file} failed validation:`);
        console.error(validate.errors);
    }
}

if (hadErrors) {
    process.exit(1);
}