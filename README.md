# El Modena Booster Board

Responsive Booster Board directory application for the El Modena
Vanguards Boys Basketball website.

The application is hosted with GitHub Pages and embedded into the main
ELMO Hoops Wix website. Booster Board member information and the current
season are maintained in Google Sheets.

## Live Sites

Main website:

https://www.elmohoops.org/

Booster Board application:

https://elmohoops.github.io/board/

The GitHub Pages application is intended primarily to be displayed
inside the Wix website rather than used as a standalone website.

## Architecture

The ELMO Hoops website uses three primary services.

### Wix

Wix hosts the main public website:

https://www.elmohoops.org/

Wix controls the site navigation, page layout, registration links,
sponsor information, contact information, and other normal website
content.

Dynamic portions of the website are embedded as GitHub Pages
applications using Wix HTML/iframe elements.

The "Booster Board" section heading and gold divider are part of the Wix
page. The GitHub application renders only the Board member cards beneath
that heading.

### GitHub

GitHub hosts the custom web applications used by the website.

Organization:

https://github.com/elmohoops

Repositories:

-   `schedule` - Game and event schedule
-   `rosters` - Team rosters and coaching staffs
-   `board` - Booster Board directory

Each application is hosted using GitHub Pages.

### Google

Google provides the data used by the GitHub applications.

The Booster Board application reads from Google Sheets.

The Rosters application also reads from Google Sheets.

The Schedule application reads from Google Calendar.

This separation allows routine Booster Board updates to be made in
Google Sheets without modifying application code.

## Booster Board Data

Booster Board information is maintained in one Google Sheet.

The spreadsheet contains two important tabs:

-   `Board`
-   `Configuration`

### Board Tab

The `Board` tab contains Booster Board member information.

Columns:

``` text
Season | Order | Position | Name | Email
```

#### Season

Identifies the basketball season for the Board member entry.

Example:

`2026-2027`

Historical seasons can remain in the spreadsheet. The website displays
only entries matching the season specified by `CurrentSeason` in the
Configuration tab.

#### Order

Controls the order in which Board members appear.

Use numeric values.

Typical ordering places the President first, followed by Vice Presidents
and other officers, team representatives, and the Website Manager.

Changing an Order value changes the display order without requiring a
code change.

#### Position

The Board member's displayed position or title.

Examples:

-   President
-   Co-Vice President
-   VP of Ways and Means
-   Treasurer
-   Secretary
-   Co-Varsity Team Rep
-   JV Team Rep
-   F/S Team Rep
-   Website Manager

Position is free text so that Board roles can change from season to
season.

#### Name

Board member's displayed name.

#### Email

Optional email address.

When an email address is present, the application displays it as a
clickable `mailto:` link.

When the Email field is blank, no empty email line or placeholder is
displayed.

### Configuration Tab

The `Configuration` tab stores application-level settings.

Columns:

``` text
Key | Value
```

The most important setting is:

``` text
CurrentSeason | 2026-2027
```

The website uses `CurrentSeason` to determine which Board records to
display.

The Configuration sheet may also contain future season values for
spreadsheet dropdowns or data-entry convenience.

## Starting a New Season

The spreadsheet is designed to retain historical Board information.

To prepare for a new basketball season:

1.  Add the new season's Board members to the `Board` tab.
2.  Enter the appropriate Position, Name, Email, and Order values.
3.  Verify that all new rows use the same Season value.
4.  Update `CurrentSeason` in the `Configuration` tab.
5.  Verify the Booster Board section on the website.

There is normally no need to delete the previous season's Board
information.

There is normally no need to modify GitHub code when starting a new
season.

## Google Sheets Integration

The application reads Google Sheets data through Google's Visualization
CSV endpoint.

The Google Sheet ID and tab names are configured in:

`js/config.js`

The application reads the regular Google Sheet ID and retrieves the
`Board` and `Configuration` tabs.

The spreadsheet must remain accessible in a way that allows the
application to retrieve its published data.

If Board information stops loading, check:

1.  The Google Sheet still exists.
2.  The `Board` and `Configuration` tabs have not been renamed.
3.  The sheet is still published/accessible as required.
4.  Column headings have not been changed.
5.  `CurrentSeason` matches the Season values in the Board rows.

## Repository Structure

``` text
board/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── config.js
│   └── sheets.js
├── index.html
└── README.md
```

## Application Flow

`index.html` loads the Booster Board application.

The JavaScript modules separate responsibilities:

-   `config.js` - Google Sheet ID and sheet/tab configuration
-   `sheets.js` - Retrieves and parses Google Sheets data
-   `app.js` - Application startup, season filtering, sorting, and Board
    rendering

The application:

1.  Retrieves the Configuration and Board data.
2.  Determines the current season from `CurrentSeason`.
3.  Filters Board members by season.
4.  Sorts Board members using the numeric `Order` field.
5.  Renders a card for each Board member.
6.  Adds a clickable email link only when an email address is present.

## Board Card Design

The application uses a responsive card layout designed to match the
visual style of the ELMO Hoops website.

Cards use:

-   White backgrounds
-   Cardinal accent along the top
-   Cardinal position labels
-   Dark member names
-   Cardinal underlined email links
-   Rounded corners
-   Subtle shadows
-   Faint basketball watermark
-   Transparent application background so the Wix basketball-court
    background remains visible

Desktop displays the Board in two columns.

Mobile displays the Board in one column.

## Wix Integration

The Booster Board application is embedded on the Wix Additional
Information page.

GitHub Pages URL:

https://elmohoops.github.io/board/

Wix owns the surrounding page content, including:

-   Physicals and Athletic Clearance section
-   Booster Board heading
-   Gold divider
-   Contact Information section
-   Page footer

The GitHub application renders only the Board member cards.

The Wix iframe should be tall enough to display all current Board
members without an internal scrollbar.

Because the application changes from two columns on desktop to one
column on mobile, the Wix mobile iframe normally requires more height
than the desktop iframe.

If additional Board members are added, the Wix iframe height may need to
be increased.

If the GitHub organization or repository is ever renamed, the Wix iframe
URL may also need to be updated.

## Booster Board Features

The application currently supports:

-   Multiple seasons in one Google Sheet
-   Current-season filtering
-   Custom Board-member ordering
-   Free-text Board positions
-   Optional email addresses
-   Clickable email links
-   Responsive two-column desktop layout
-   Responsive one-column mobile layout
-   Transparent background for Wix integration
-   GitHub Pages hosting
-   Wix iframe embedding

## Making Routine Board Changes

Most Booster Board changes DO NOT require changes to GitHub.

Use the Google Sheet to:

-   Add Board members
-   Remove Board members
-   Change member names
-   Change Board positions
-   Add or update email addresses
-   Reorder Board members
-   Prepare the next season
-   Change the current season

GitHub should normally only be changed when modifying the appearance,
behavior, configuration, or functionality of the Booster Board
application.

After adding or removing Board members, check the Wix iframe height on
both desktop and mobile.

## Deploying Code Changes

Recommended workflow:

1.  Make the required code change.
2.  Test the application directly through GitHub Pages when appropriate.
3.  Verify the Board data loads correctly.
4.  Verify desktop behavior.
5.  Verify mobile behavior.
6.  Commit the tested changes to `main`.
7.  Allow GitHub Pages to redeploy.
8.  Verify the production GitHub Pages application.
9.  Verify the Booster Board section on ELMOHoops.org.

For significant stable releases, create a Git tag/release.

## Troubleshooting

### "Booster Board information is temporarily unavailable"

Check that:

-   The Google Sheet is accessible.
-   The Sheet ID in `js/config.js` is correct.
-   The `Board` and `Configuration` tab names are correct.
-   Google Sheets is returning data through the expected Visualization
    CSV endpoint.

The application uses the regular Google Sheet ID with Google's
Visualization (`gviz`) CSV endpoint.

### No Board members appear

Check that:

-   `CurrentSeason` is set correctly.
-   Board rows exist for that Season.
-   Season values match `CurrentSeason` exactly.
-   The Board tab's column headings have not changed.

### Board members appear in the wrong order

Check the numeric `Order` values in the Google Sheet.

### Email address does not appear

Check whether the Email field contains an address.

Blank Email fields are intentionally omitted from the rendered card.

### Board cards are cut off in Wix

Increase the Wix iframe height.

Remember to check desktop and mobile independently because the mobile
application uses a one-column layout.

### Too much blank space below the Board

Reduce the Wix iframe height.

Leave a small amount of extra room if desired for normal layout
breathing room, but large changes in Board membership may require
adjusting the iframe height.

### Application formatting is missing

Verify that GitHub Pages is publishing from the expected branch/root and
that the CSS and JavaScript files still exist at the expected relative
paths.

## Ownership and Future Website Managers

The application is owned by the `elmohoops` GitHub Organization rather
than an individual volunteer's GitHub account.

Future website managers should use their own GitHub accounts and be
granted appropriate access to the `elmohoops` organization.

Do not share a common GitHub username/password between website managers.

The outgoing Website Manager should ensure that the incoming Website
Manager has access to:

-   ELMO Hoops Wix website
-   ELMO Hoops GitHub organization
-   ELMO Hoops Google account and Booster Board spreadsheet
-   Any other program accounts required to maintain the website

## Related Applications

### Schedule

Repository:

https://github.com/elmohoops/schedule

GitHub Pages:

https://elmohoops.github.io/schedule/

Schedule information is maintained in Google Calendar.

### Rosters

Repository:

https://github.com/elmohoops/rosters

GitHub Pages:

https://elmohoops.github.io/rosters/

Roster and coaching information is maintained in Google Sheets.

## Maintenance Philosophy

The system is intentionally designed so that normal basketball-season
maintenance does not require programming knowledge.

Routine content belongs in:

-   Google Calendar for schedules
-   Google Sheets for rosters, coaches, and Booster Board information
-   Wix for normal website content

GitHub contains the code that presents the dynamic Google data on the
Wix website.

When possible, keep this separation intact.
