Find one strong public source for each timeline event in the `diss-na-raka` project.

Return structured data for these exact event ids:
- `evt_001`
- `evt_002`
- `evt_002b`
- `evt_003`
- `evt_004`
- `evt_005`
- `evt_006`
- `evt_007`
- `evt_008`
- `evt_009`
- `evt_010`

The event meanings are:
- `evt_001`: stream launch on 2026-04-17 around the looping of "Ciągle tutaj jestem (diss na raka)"
- `evt_002`: Bedoes, Brokies, and Dajczman shave heads / tattoos / gang lysych after the 500k milestone
- `evt_002b`: early momentum reporting above 400k and the 500k tattoo trigger
- `evt_003`: Disco Karol endurance challenge repeating "Cancer Fighters" 100,000 times after the 1.25M threshold
- `evt_004`: Bambi and Francis in the studio, Francis gets shaved, hot sauces, Bambi joins the project
- `evt_005`: Bambi reveals a snippet around the 2.6M milestone
- `evt_006`: Wojciech Gola shaves his head live around the 3.5M milestone
- `evt_007`: Maciek Dabrowski, Kostek, Zoja Skubis, and Eryk Moczko / DissNaRakaChallenge recap
- `evt_008`: White 2115 deadline, and announced / expected support from Oki, Zabson, and Szpaku
- `evt_009`: 5.5M reporting, Doda support, and major donor recap including Bedoes / Oki / SVM!R
- `evt_010`: manual snapshot / live overlay around 5,713,793.30 PLN on 2026-04-23 at 09:57 local time

Requirements:
- Prefer primary or high-signal public sources: official stream/channel pages, official foundation pages, or direct public reporting from established Polish media.
- Prefer one best source per event, not a list dump.
- If the best available source is weaker, still return it and lower the confidence.
- Use exact public URLs.
- For `evt_010`, it is acceptable to use the live YouTube channel or live stream URL as the best public source if no archived article captures the same overlay snapshot.
- Keep notes short and specific about why the source matches the event.
