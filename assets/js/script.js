// 1. Speichern der Google Sheets-ID
const sheetID = "1zuX0M1kgYamvY1KNkxqj1azSYxrREwUD";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "Wetter";

// 4. Erstellen einer SQL-ähnlichen Abfrage
const query = encodeURIComponent("Select *");

// 5. Zusammensetzen der vollständigen URL
const url = `${base}&sheet=${sheetName}&tq=${query}`;

// 6. Vorbereiten von Array zur Datenspeicherung
let data = [];

// 7. Abrufen der Daten mit fetch
fetch(url)
	// 8. Antwort in Text umwandeln
	.then((res) => res.text())

	// 9. Weiterverarbeitung der Antwort
	.then((rep) => {
		try {
			// 10. JSON-Daten extrahieren und parsen
			const jsData = JSON.parse(rep.substr(47).slice(0, -2));

			//console.log(jsData);

			// 11. Spaltennamen sammeln
			const colz = [];
			jsData.table.cols.forEach((heading) => {
				if (heading.label) {
					colz.push(heading.label.toLowerCase().replace(/\s/g, ""));
				}
			});

			// 12. Zeilen verarbeiten und in das data-Array laden
			for (let i = 1; i < jsData.table.rows.length; i++) {
				const main = jsData.table.rows[i];
				const row = {};

				colz.forEach((ele, ind) => {
					row[ele] = main.c[ind] != null ? main.c[ind].v : "";
				});

				data.push(row);
			}

			// 13. Weiterverarbeitung mit getData
			getData();

			// 14. Fehlerbehandlung für JSON-Parsing
		} catch (error) {
			console.error("Error parsing data:", error);
		}
	})
	// 15. Fehlerbehandlung für den Abruf der Daten
	.catch((error) => {
		console.error("Fetch error:", error);
	});

// 16. Funktionsbeginn und Überprüfung auf verfügbare Daten
function getData() {
	if (data.length > 0) {
		// 17. HTML-Element für die Ausgabe finden
		const outputElement = document.getElementById("output");

		// 18. Erstellen von HTML-Elementen für jede Datenzeile
		const rows = data
			.map((row) => {
				// 19. Erstellen von Zellen für jede Spalte
				return (
					`<div class="row">` +
					Object.values(row)
						.map((value, index) => {
							// 20. Uhrzeit in Emojis umwandeln (Spalte 2)
							if (index === 1) {
								const hour = parseInt(value.split(":")[0], 10);
								switch (hour) {
									case 0:
										return `<div class="cell">🕛</div>`;
									case 1:
										return `<div class="cell">🕐</div>`;
									case 2:
										return `<div class="cell">🕑</div>`;
									case 3:
										return `<div class="cell">🕒</div>`;
									case 4:
										return `<div class="cell">🕓</div>`;
									case 5:
										return `<div class="cell">🕔</div>`;
									case 6:
										return `<div class="cell">🕕</div>`;
									case 7:
										return `<div class="cell">🕖</div>`;
									case 8:
										return `<div class="cell">🕗</div>`;
									case 9:
										return `<div class="cell">🕘</div>`;
									case 10:
										return `<div class="cell">🕙</div>`;
									case 11:
										return `<div class="cell">🕚</div>`;
									case 12:
										return `<div class="cell">🕛</div>`;
									case 13:
										return `<div class="cell">🕐</div>`;
									case 14:
										return `<div class="cell">🕑</div>`;
									case 15:
										return `<div class="cell">🕒</div>`;
									case 16:
										return `<div class="cell">🕓</div>`;
									case 17:
										return `<div class="cell">🕔</div>`;
									case 18:
										return `<div class="cell">🕕</div>`;
									case 19:
										return `<div class="cell">🕖</div>`;
									case 20:
										return `<div class="cell">🕗</div>`;
									case 21:
										return `<div class="cell">🕘</div>`;
									case 22:
										return `<div class="cell">🕙</div>`;
									case 23:
										return `<div class="cell">🕚</div>`;
									default:
										return `<div class="cell">${value}</div>`;
								}
							}

							// 21. Windgeschwindigkeit in Emojis übersetzen (Spalte 4)
							if (index === 5) {
								const windSpeed = parseFloat(value);
								if (windSpeed >= 0 && windSpeed <= 3) {
									return `<div class="cell">🍃</div>`;
								} else if (windSpeed > 3 && windSpeed <= 7) {
									return `<div class="cell">🌬️</div>`;
								} else if (windSpeed > 7 && windSpeed <= 12) {
									return `<div class="cell">💨</div>`;
								} else if (windSpeed > 12 && windSpeed <= 17) {
									return `<div class="cell">🌀</div>`;
								} else if (windSpeed > 17) {
									return `<div class="cell">🌪️</div>`;
								}
							}

							// 22. Windrichtung in Emojis umwandeln (Spalte 5)
							if (index === 6) {
								switch (value) {
									case "N":
										return `<div class="cell">⬆️</div>`;
									case "O":
										return `<div class="cell">➡️</div>`;
									case "S":
										return `<div class="cell">⬇️</div>`;
									case "W":
										return `<div class="cell">⬅️</div>`;
									case "SO":
										return `<div class="cell">↘️</div>`;
									case "SW":
										return `<div class="cell">↙️</div>`;
									case "NW":
										return `<div class="cell">↖️</div>`;
									case "NO":
										return `<div class="cell">↗️</div>`;
									default:
										return `<div class="cell">${value}</div>`;
								}
							}

							// 23. Wolkendecke mit GIF’s anzeigen
							if (value === "Mostly cloudy") {
								return `<div class="cell"><img src="/assets/img/mostly-cloudy.webp" alt="Mostly Cloudy" /></div>`;
							} else if (value === "Partly cloudy") {
								return `<div class="cell"><img src="/assets/img/partly-cloudy.webp" alt="Partly Cloudy" /></div>`;
							} else if (value === "Overcast") {
								return `<div class="cell"><img src="/assets/img/overcast.webp" alt="Overcast" /></div>`;
							} else if (value === "Thunderstorm with Rain") {
								return `<div class="cell"><img src="/assets/img/thunderstorm.webp" alt="Thunderstorm with Rain" /></div>`;
							} else if (value === "Showers of Rain") {
								return `<div class="cell"><img src="/assets/img/rain.webp" alt="Showers of Rain" /></div>`;
							} else if (value === "Partly cloudy, mostly cloudy") {
								return `<div class="cell"><img src="/assets/img/clouds.webp" alt="Partly cloudy, mostly cloudy" /></div>`;
							} else if (value === "Mostly clear") {
								return `<div class="cell"><img src="/assets/img/mostly-clear.webp" alt="Mostly Clear" /></div>`;
							} else if (value === "Fog") {
								return `<div class="cell"><img src="/assets/img/fog.webp" alt="Fog" /></div>`;
							} else if (value === "Drizzle with Fog") {
								return `<div class="cell"><img src="/assets/img/fog-drizzle.webp" alt="Drizzle with Fog" /></div>`;
							} else if (value === "Showers of Light Rain") {
								return `<div class="cell"><img src="/assets/img/light-rain.webp" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Clear") {
								return `<div class="cell"><img src="/assets/img/clear.webp" alt="Clear" /></div>`;
							}
							return `<div class="cell">${value}</div>`;
						})
						.join("") +
					`</div>`
				);
			})
			.join("");

		// 24. Ausgabe der Daten in HTML-Struktur
		outputElement.innerHTML = `<div class="grid">${rows}</div>`;

		// 25. Zufallsanimation – Jede Zelle (cell) wird animiert
		const cells = document.querySelectorAll(".cell");
		cells.forEach((cell) => {
			const delay = Math.random() * 3 + "s";
			const duration = Math.random() * 2 + 1 + "s";

			cell.style.animationDelay = delay;
			cell.style.animationDuration = duration;
		});
		//26. Fehlerbehandlung
	} else {
		console.error("Keine Daten verfügbar.");
	}
}
