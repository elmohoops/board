(() => {
  const cfg = window.ELMO_BOARD_CONFIG;
  const statusEl = document.getElementById("status");
  const gridEl = document.getElementById("board-grid");
  const seasonEl = document.getElementById("season");

  function normalizeSeason(value) {
    return String(value || "").trim();
  }

  function displaySeason(value) {
    return normalizeSeason(value).replace("-", "–");
  }

  function getCurrentSeason(rows) {
    const match = rows.find(row =>
      String(row.Key || "").trim().toLowerCase() === "currentseason"
    );
    if (!match || !String(match.Value || "").trim()) {
      throw new Error('Configuration sheet is missing "CurrentSeason".');
    }
    return normalizeSeason(match.Value);
  }

  function orderValue(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
  }

  function createCard(member) {
    const article = document.createElement("article");
    article.className = "member-card";

    const position = document.createElement("p");
    position.className = "position";
    position.textContent = member.Position || "Board Member";

    const name = document.createElement("h2");
    name.className = "name";
    name.textContent = member.Name || "";

    article.append(position, name);

    const emailText = String(member.Email || "").trim();
    if (emailText) {
      const email = document.createElement("a");
      email.className = "email";
      email.href = `mailto:${emailText}`;
      email.textContent = emailText;
      email.setAttribute("aria-label", `Email ${member.Name || "board member"} at ${emailText}`);
      article.appendChild(email);
    }

    return article;
  }

  function render(members, season) {
    seasonEl.textContent = displaySeason(season);
    gridEl.replaceChildren(...members.map(createCard));
    statusEl.hidden = true;
    gridEl.hidden = false;
  }

  function showError(error) {
    console.error(error);
    gridEl.hidden = true;
    statusEl.hidden = false;
    statusEl.classList.add("error");
    statusEl.textContent = "Booster Board information is temporarily unavailable. Please try again later.";
  }

  async function start() {
    try {
      const [configuration, board] = await Promise.all([
        ElmoSheets.fetchSheet(cfg.PUBLISHED_ID, cfg.CONFIG_SHEET),
        ElmoSheets.fetchSheet(cfg.PUBLISHED_ID, cfg.BOARD_SHEET)
      ]);

      const currentSeason = getCurrentSeason(configuration);

      const members = board
        .filter(row => normalizeSeason(row.Season) === currentSeason)
        .sort((a, b) => orderValue(a.Order) - orderValue(b.Order));

      if (!members.length) {
        throw new Error(`No Booster Board rows found for ${currentSeason}.`);
      }

      render(members, currentSeason);
    } catch (error) {
      showError(error);
    }
  }

  start();
})();
