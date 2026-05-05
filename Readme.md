# Service Status Configuration API

This Google Apps Script provides a lightweight JSON endpoint to retrieve configuration settings from a Google Spreadsheet. It is designed to expose service status metadata while filtering out specific technical details.

## Web App Endpoint

The service is accessible at the following URL:
`https://script.google.com/macros/s/AKfycbx7ieTYTvIpJAO2DQ9zjtGG_jdCW41vh9tD8k1ozzPiCGPhBdI6XtEU70nxHj_GFZDL/exec`

## How it Works

The script (`Kod.js`) performs the following actions when a `GET` request is received:

1.  **Data Source**: Connects to the active spreadsheet and retrieves the sheet named **"Configuration"**.
2.  **Data Extraction**: Reads a range of 7 rows and 10 columns starting from the top-left (A1).
3.  **Filtering**: The script iterates through the columns and explicitly **excludes** the following headers from the JSON output:
    *   `URL`
    *   `Port`
    *   `CICD`
4.  **JSON Mapping**: The first row is treated as keys, and subsequent rows are treated as values, creating an array of objects.

## Response Format

The endpoint returns a JSON object with a `data` property:

```json
{
  "data": [
    {
      "ColumnName": "Value",
      "AnotherColumn": "AnotherValue"
    }
  ]
}
```

## Development Notes

*   The script uses `ContentService` to set the MIME type to `JSON`.
*   The column processing includes a safety break if a cell is empty.
*   Redundant object deletion (`delete row`) is present in the source but is managed by the JavaScript garbage collector.