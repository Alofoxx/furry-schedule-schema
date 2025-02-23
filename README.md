# Furry Schedule Schema

A standardized schema for furry convention schedule data, enabling interoperability between different conventions and software.

## Overview

The **Furry Schedule Schema** provides a JSON-based data structure for:
- Convention metadata (name, date, location, etc.)
- Membership levels
- Event tracks (e.g., Art, Writing)
- Event types (e.g., Panel, Workshop)
- Labels (e.g., 18+, ticketed, accessibility flags)
- Venues and rooms
- Participants (panelists, performers, etc.)
- Scheduled events

## Why Use This Schema?

- **Consistency**: Multiple conventions or scheduling tools can adopt a shared format.
- **Localization**: Supports i18n with language-specific titles and descriptions.
- **Extensibility**: Includes optional fields like `imageBannerUrl`, membership restrictions, min age, etc.
- **Validation**: JSON Schemas are provided in the `schema/` folder to ensure data quality.

## Repository Structure

- **README.md**: This file, explaining the project.
- **LICENSE.txt**: MIT License text.
- **schema/**: JSON Schema files for each data type plus a master schema (`furry-schedule-schema.json`).
- **examples/**: Example JSON files (e.g., `sampleSchedule.json`).
- **docs/**: Additional documentation (field references, usage examples).

## Usage

1. **Clone or download** this repository.
2. **Create** your schedule JSON, adhering to the structure in `sampleSchedule.json`.
3. **Validate** your schedule file against `schema/furry-schedule-schema.json` using a JSON Schema validator such as [AJV](https://ajv.js.org/).

Example (Node.js + AJV):

```bash
npm install -g ajv-cli
ajv validate -s schema/furry-schedule-schema.json -d examples/sampleSchedule.json
```
4. Integrate the resulting JSON into your website or application.

## Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.