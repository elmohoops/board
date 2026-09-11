# El Modena Booster Board

Responsive GitHub Pages app for the El Modena Vanguard Basketball Booster Board.

This version uses the regular Google Sheets ID with the Google Visualization CSV endpoint, matching the approach used by the roster app.

## Spreadsheet

Sheet ID:

`18N0En9F24DNYvaExxIMyYtRIeeOYt-18QtWzLPhH4bM`

### Board
`Season | Order | Position | Name | Email`

### Configuration
`Key | Value`

with:
`CurrentSeason | 2026-2027`

Only Board rows matching `CurrentSeason` are displayed.

## Wix

The app intentionally contains no title/header. Add the **BOOSTER BOARD** heading and gold rule directly in Wix so the typography and spacing match the rest of the page.

The iframe background is transparent.

## Updating

Normal board changes require no GitHub code edits. Update the spreadsheet rows and `Configuration → CurrentSeason`.
