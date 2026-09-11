# El Modena Booster Board

Responsive GitHub Pages app for the El Modena Vanguard Basketball Booster Board.

## Sheet structure

### Board
`Season | Order | Position | Name | Email`

### Configuration
`Key | Value`

with:
`CurrentSeason | 2026-2027`

Only Board rows matching `CurrentSeason` are displayed.

## GitHub Pages

1. Create a public repository such as `elmo-board`.
2. Upload these files to the repository root.
3. Commit to `main`.
4. Open **Settings → Pages**.
5. Choose **Deploy from a branch**.
6. Choose `main` and `/ (root)`.

Your site will then be similar to:

`https://YOUR-USERNAME.github.io/elmo-board/`

## Wix

Embed the GitHub Pages URL using Wix **Embed a Site**.

The app background is transparent so the Wix basketball-court background shows through.

## Updating the board

Normal yearly updates require no code changes:

1. Add rows for the new season.
2. Set `Season`.
3. Use `Order` to control display sequence.
4. Change `Configuration → CurrentSeason`.

Blank email cells are automatically omitted from the cards.
