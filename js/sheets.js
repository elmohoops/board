(() => {
  function csvUrl(publishedId, sheetName) {
    return `https://docs.google.com/spreadsheets/d/e/${publishedId}/pub?output=csv&sheet=${encodeURIComponent(sheetName)}`;
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ",") {
          row.push(field);
          field = "";
        } else if (ch === "\n") {
          row.push(field.replace(/\r$/, ""));
          rows.push(row);
          row = [];
          field = "";
        } else {
          field += ch;
        }
      }
    }

    if (field.length || row.length) {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
    }

    return rows.filter(r => r.some(cell => String(cell).trim() !== ""));
  }

  function rowsToObjects(rows) {
    if (!rows.length) return [];
    const headers = rows[0].map(h => String(h).trim());
    return rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = String(row[i] ?? "").trim();
      });
      return obj;
    });
  }

  async function fetchSheet(publishedId, sheetName) {
    const response = await fetch(csvUrl(publishedId, sheetName), { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Could not load "${sheetName}" (${response.status})`);
    }

    const text = await response.text();
    if (/^\s*<!doctype html/i.test(text) || /^\s*<html/i.test(text)) {
      throw new Error(`Google returned HTML instead of CSV for "${sheetName}".`);
    }

    return rowsToObjects(parseCsv(text));
  }

  window.ElmoSheets = { fetchSheet };
})();
