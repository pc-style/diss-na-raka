# Deep Research prompts — Diss na raka post-event

These are intended for the **Parallel Deep Research** product (processor=`ultra`,
`output_schema.type = "text"`) — paste each one into the Parallel UI / Workbench
or run via the API. They cover the qualitative, narrative, multi-week pieces that
do not fit the structured `parallel-postevent.ts` topics.

Common context to paste at the top of each prompt
-------------------------------------------------
> Polish charity livestream "Diss na raka" / "Łatwogang" / Fundacja Cancer Fighters,
> 9-day stream from 17 to 26 April 2026, ended Sunday 26 April 2026 around 21:37 CEST.
> Multiple sources report final on-stream total above 250 000 000 PLN, with the truly
> final number to be confirmed by Cancer Fighters in the following weeks. Write all
> output in Polish unless explicitly told otherwise.

---

## 1. Long-form post-event recap article (10–15 min read)

Write a 2 500–3 500 word Polish-language post-event recap article in the style of
TVN24 / Onet long-form journalism. Include:

- Krótki hook: ostateczna kwota i dlaczego to "polski rekord internetu".
- Historia powstania pomysłu Łatwogang i Cancer Fighters (z cytatami z wywiadów).
- Kluczowe punkty zwrotne osi czasu (start, pierwszy milion, 100 mln, 188 mln, finał).
- Sylwetki członków Łatwogang (po 2–3 zdania każdy).
- Najważniejsi goście studyjni i co zrobili (z linkami do shortów).
- Kontrowersje, błędy techniczne (np. problemy z płatnościami, opóźniony finał).
- Co stanie się z pieniędzmi: rola Fundacji Cancer Fighters, DKMS, szpitale,
  protezy, rozwój infrastruktury onkologicznej.
- Globalny kontekst: porównanie z "Mr Beast charity streams", "Z Event" we Francji,
  WOŚP, oraz dotychczasowe polskie streamy charytatywne.
- Co dalej: "Diss na raka 2"? Plany Łatwogang.

Każdy fakt z linkiem (inline markdown). Min. 30 unikalnych źródeł.

---

## 2. Wpływ kulturowy i medialny

Przygotuj raport (1 500–2 000 słów) o **wpływie kulturowym Diss na raka** na polską
przestrzeń publiczną:

- Hashtagi i trendy w polskim X / TikTok / Instagram (procentowy udział, zasięgi).
- Obecność akcji w mediach głównego nurtu (TVN, TVP, Polsat, RMF FM, Radio Zet, Trójka).
- Reakcje polityków, biznesu, kościoła, gwiazd niezwiązanych ze sceną hiphopową.
- Dyskusja o etyce streamingu charytatywnego (komentarze ekspertów, krytyka).
- Wpływ na rozpoznawalność Fundacji Cancer Fighters i DKMS (wzrost wpłat / rejestracji
  dawców szpiku, jeśli mierzalny).
- Reakcje zagranicznej prasy (ESPN, Variety, Forbes, Reuters – jeśli pisali).

Format: śródtytuły, bullet pointy z liczbami, cytaty z linkami.

---

## 3. Mechanika finansowa i transparencja

Zrób analizę (1 200–1 800 słów, ton dziennikarstwa śledczego) na temat
**mechaniki finansowej akcji**:

- Jak działała Tipply przy tej skali ruchu (potwierdzone awarie, skala TPS,
  rozwiązanie z bramkami płatności).
- Prowizje i marża: ile faktycznie trafi do Cancer Fighters z każdej zebranej zł.
- Sponsorzy techniczni / partnerzy płatnościowi i ich kontrybucja in-kind.
- Plan komunikacji finalnej kwoty przez fundację (deadline, audyt, raport roczny).
- Porównanie kosztu pozyskania 1 PLN do innych zbiórek charytatywnych w Polsce.
- Aspekty podatkowe: czy Łatwogang lub donatorzy mogą odliczyć darowizny, status OPP.

Każda liczba z linkiem do źródła.

---

## 4. Profil "9 dni": dziennik z perspektywy Łatwogang

Napisz osobistą, narracyjną kronikę dnia po dniu (8 sekcji, po 250–400 słów każda)
relacjonującą **co działo się każdego z 9 dni streama** z perspektywy ekipy
Łatwogang. Bazuj na cytatach i klipach. Każdy dzień:

- Data i godzina rozpoczęcia bloku.
- Najważniejsi goście dnia.
- Najmocniejszy "moment" (z linkiem do shorta).
- Stan licznika na koniec dnia (z linkiem do snapshotu / zrzutu).
- Cytat dnia od członka zespołu.
- Krótkie podsumowanie nastroju (zmęczenie, euforia, kryzys).

---

## 5. Mapa darczyńców korporacyjnych (B2B angle)

Stwórz raport (1 000–1 400 słów) o **firmach, które publicznie wsparły Diss na raka**:

- Tabela: firma, branża, kwota, forma (przelew / aukcja / produkt), data, źródło.
- Wzorce: które branże dominowały (gaming, e-commerce, fintech, FMCG)?
- Case study 3–5 największych donacji korporacyjnych z analizą motywacji marketingowej.
- Czy są firmy, które publicznie obiecały, ale nie wpłaciły (zweryfikuj!).
- Rekomendacje dla działów PR/CSR, które chciałyby uczestniczyć w "Diss na raka 2".

---

## API polecenie (cURL) do uruchomienia każdego z powyższych jako Deep Research:

```bash
curl -X POST "https://api.parallel.ai/v1/tasks/runs" \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  --data-raw "{
    \"input\": \"<TUTAJ WKLEJ JEDEN Z PROMPTÓW POWYŻEJ>\",
    \"processor\": \"ultra\",
    \"task_spec\": { \"output_schema\": { \"type\": \"text\" } }
  }"
```

Następnie odczyt wyniku:

```bash
curl "https://api.parallel.ai/v1/tasks/runs/<RUN_ID>/result" \
  -H "x-api-key: $PARALLEL_API_KEY" | jq -r '.output.content' > research/postevent/deep/<topic>.md
```
