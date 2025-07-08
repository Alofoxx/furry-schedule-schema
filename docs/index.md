# Furry Schedule Schema Documentation

This document provides **detailed field references** for each part of the Furry Schedule Schema.

---

## Top-Level Keys

- **schemaVersion** (string): The version of this schema (e.g., `"1.0.0"`).
- **updatedAt** (datetime, ISO 8601): Timestamp when the JSON was last updated.
- **source** (object, optional):
  - `name`: Human-readable name of the data source (e.g., `"ConSchedulePro"`).
  - `vendorId`: An internal ID for the data provider.
  - `appVersion`: Version of the software generating the data.
  - `lastModifiedBy`: Username or individual who last modified the data.
  - `lastModifiedAt`: Timestamp when the data was last modified.

## convention (object)

Represents basic convention information:

- **id** (string): Unique identifier for the convention.
- **name** (object): Localized dictionary with keys as i18n language codes (e.g., `"en-US"`, `"fr-CA"`).
- **location** (object): Localized dictionary of location strings.
- **startDate**, **endDate** (datetime): Convention start and end in ISO 8601.
- **timezone** (string): IANA timezone identifier (e.g., `"America/New_York"`).
- **description** (object): Localized descriptions.
- **website** (uri, optional): Link to the convention’s website.
- **imageBannerUrl** (uri, optional): Banner or logo image for the convention.

## membershipLevels (array)

A list of membership levels (Attendee, Sponsor, etc.):

- **id** (string): Unique ID for the level.
- **name** (object): Localized names.
- **description** (object, optional): Localized descriptions.

## tracks (array)

A list of broad subject areas (e.g., Art Track, Writing Track):

- **id** (string)
- **name** (object): Localized
- **description** (object, optional): Localized

## eventTypes (array)

High-level categories (e.g., Panel, Workshop, Meetup):

- **id** (string)
- **name** (object): Localized
- **description** (object, optional): Localized

## labels (array)

Additional flags or classifications (e.g., `"18plus"`, `"ticketed"`, `"aslInterpretation"`):

- **id** (string)
- **name** (object): Localized
- **description** (object, optional): Localized
- **category** (string, optional): For grouping or filtering labels (e.g., `"rating"`, `"accessibility"`, etc.)

## venues (array)

Locations where events are held:

- **id** (string)
- **name** (object): Localized
- **address** (object, optional): Localized

## rooms (array)

Rooms where events take place, each associated with a venue:

- **id** (string): Unique room ID.
- **name** (object): Localized room name.
- **venueId** (string): ID of the venue this room belongs to.
- **capacity** (integer, optional): Approximate room capacity.
- **description** (string, optional): Human-readable notes or comments.

## participants (array)

People or groups who host, present, or perform at events:

- **id** (string)
- **displayName** (string)
- **socials** (array, optional):
  - Each item is an object with `label` (string) and `url` (uri).
- **imageBannerUrl** (uri, optional): Banner image for the participant.

## events (array)

Schedule entries:

- **id** (string): Unique event ID.
- **title** (object): Localized dictionary.
- **description** (object, optional): Localized dictionary.
- **startTime**, **endTime** (datetime, ISO 8601).
- **venueId** (string): Links to a venue by its `id`.
- **roomId** (string): Links to a room by its `id`.
- **typeId** (string): Links to an entry in `eventTypes`.
- **trackId** (string or null, optional): Links to an entry in `tracks`.
- **labelIds** (array of strings): Zero or more `id` values from `labels`.
- **participantIds** (array of strings): Zero or more `id` values from `participants`.
- **allowedMemberships** (array of strings): Which membership levels can attend.
- **minAge** (integer, optional): Minimum required age (default 0).
- **ticketed** (boolean, optional): If the event requires a separate ticket.
- **imageBannerUrl** (string, optional): Link to an event banner image.
- **buttons** (array, optional): List of call-to-action objects, each with:
  - `name` (string)
  - `url` (uri)
- **source** (object, optional): Overridden or additional event-level metadata (similar fields as top-level `source`).

---

## Validation

To validate a schedule JSON file against this schema:

1. Install a JSON Schema validator (e.g., [AJV](https://ajv.js.org/)).
2. Run:

```bash
ajv validate -s schema/furry-schedule-schema.json -d examples/sampleSchedule.json
```

If it passes with no errors, your file conforms to the Furry Schedule Schema!

---

## Further Guidance
- **Recurring Events**: List each occurrence as a separate event.
- **Localization**: Use valid ISO language codes (e.g., en-US, fr-CA).
- **Time Zones**: Provide event startTime/endTime in local time with an offset, and store the official con timezone at the top level.

For more detailed tutorials or advanced examples, see additional files in this repository or open an issue to request more info.

---

# Final Notes

With these files in place, you have a complete structure for the **Furry Schedule Schema** repository. You can now:

1. **Share** this schema with convention staff, scheduling tool developers, etc.
2. **Collect feedback** and iterate.
3. Provide additional **examples** (multi-day, more advanced localizations, etc.) to help others adopt it.

Good luck, and happy scheduling!
