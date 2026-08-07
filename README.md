# Sito Dr.ssa Raffaella Parrotta — Psicologa e Psicoterapeuta EMDR

Sito vetrina statico. Nessuna dipendenza, nessun build step: solo HTML, CSS e un file
JavaScript. Esistono **due versioni dello stesso contenuto**, che condividono lo stesso
`styles.css`, lo stesso `script.js` e la stessa cartella `assets/`.

| Versione | File di partenza | Quando conviene |
|---|---|---|
| **Multipagina** (predefinita) | `index.html` | Home breve + una pagina per argomento. Più comoda da leggere, migliore per la SEO (ogni pagina ha titolo e descrizione propri), più facile da aggiornare a pezzi. |
| **One-page** | `onepage.html` | Tutto in una pagina sola, con menu ad ancore. Più immediata su mobile, nessun caricamento tra le sezioni. |

Puoi tenerle entrambe online o **sceglierne una sola**: per pubblicare solo la one-page,
rinomina `onepage.html` in `index.html` (sovrascrivendo la home multipagina) e cancella le
pagine interne.

## Struttura

```
sito-raffaella-parrotta/
├── index.html                    HOME della versione multipagina
├── chi-sono.html
├── aree-di-intervento.html
├── emdr.html
├── bambini-e-adolescenti.html
├── percorso.html
├── formazione.html
├── domande-frequenti.html
├── contatti.html
├── onepage.html                  versione alternativa: tutto in una pagina
├── privacy.html                  informativa privacy (BOZZA da validare)
├── styles.css                    stili + palette in variabili CSS
├── script.js                     animazioni, menu mobile, demo EMDR
└── assets/
    ├── favicon.svg
    └── raffaella-parrotta.jpg    ritratto, 1320×1646 px
```

> **Attenzione:** intestazione (header) e piè di pagina (footer) sono ripetuti dentro ogni
> file HTML, perché il sito è statico e senza template. Se modifichi il menu o il footer,
> replica la modifica in **tutti** i file.

## Come vederlo in locale

Doppio clic su `index.html`. Oppure, per una resa identica alla produzione:

```bash
python3 -m http.server 8788 --directory "/Users/andreapulzone/Desktop/Sito Raffa/sito-raffaella-parrotta"
```

poi visita <http://localhost:8788> (per fermare il server: `Ctrl+C`).

## Contenuti

1. **Home** — presentazione, punti in evidenza, griglia "da dove vuoi cominciare",
   riepilogo di dove/quando/come/chi
2. **Chi sono** — percorso professionale, "come lavoro", numeri chiave
3. **Aree di intervento** — 6 schede (ansia, umore, trauma, DCA, relazioni, genitorialità)
4. **Cos'è l'EMDR** — spiegazione divulgativa, demo animata con le **tre forme di
   stimolazione bilaterale** (movimenti oculari, tocchi alternati, suoni alternati),
   4 fasi del percorso, per chi è indicato
5. **Bambini e adolescenti** — pagina rivolta ai genitori, dai 6 anni in su
6. **Il percorso** — dal primo contatto alla conclusione, 5 passaggi
7. **Formazione** — timeline dei titoli, albo, master (da completare)
8. **Domande frequenti** — 9 FAQ in accordion (fra cui il primo colloquio gratuito)
9. **Contatti** — WhatsApp / telefono / email / mappa, orari, avviso emergenze

## ⚠️ Cose da completare prima di pubblicare

| Dove | Cosa |
|---|---|
| `formazione.html` (e `onepage.html`) | **Master e corsi di perfezionamento**: su LinkedIn le voci di formazione sono visibili solo agli utenti registrati. Sostituire il riquadro `todo-box` con l'elenco reale (titolo, ente, anno). |
| Formazione e footer | **Numero di iscrizione all'albo: 2941**, trovato sul registro pubblico dell'[Ordine Psicologi Regione Campania](https://www.oprc.it/albo/risultati-ricerca/?cognome=Parrotta&nome=Raffaella) (unico risultato per il nome). **Da far confermare alla dott.ssa.** |
| Partita IVA | Volutamente **non pubblicata** per ora. Quando la vorrai aggiungere, in `contatti.html`/footer e in `privacy.html` c'è un commento HTML nel punto giusto. |
| Anni dei titoli | 1999–2004 (laurea) e 2006–2010 (specializzazione) ricavati dalle voci LinkedIn parzialmente oscurate: **da confermare**. |
| Nome della scuola | Il profilo EMDR indica genericamente "Scuola di Psicoterapia Cognitivo-Comportamentale, Napoli": inserire la denominazione esatta. |
| `formazione.html` — riquadro tratteggiato | Il promemoria "Da completare" su master e corsi **è visibile ai visitatori**: va sostituito con i titoli reali o rimosso prima della pubblicazione. |
| FAQ costi | Scelta fatta: il prezzo **non** compare sul sito, la FAQ dice che viene detto di persona durante il primo colloquio gratuito. |
| `privacy.html` | Testo da completare e far validare. Inserire il nome del provider di hosting. |
| `<link rel="canonical">` e Open Graph | Sostituire `https://www.raffaellaparrotta.it/` con il dominio reale. |
| `assets/og-image.jpg` | Immagine 1200×630 px per l'anteprima nelle condivisioni su WhatsApp/Facebook. |

Tutti i punti aperti sono cercabili nel codice con:

```bash
grep -rn "TODO\|da inserire\|da confermare" sito-raffaella-parrotta
```

## Registro linguistico

Il sito dà del **"tu"** e mantiene un tono caldo e accogliente: è la scelta usuale nei siti di
psicoterapia e funziona meglio con genitori e adolescenti.

Fanno eccezione, per scelta esplicita, due punti che descrivono la parte contrattuale del
rapporto e usano una **forma impersonale più professionale**:

- i cinque passi della sezione **Il percorso** (*"Il primo contatto avviene tramite WhatsApp o
  telefono…"*, *"Onorari e modalità sono esplicitati fin dall'inizio"*)
- la FAQ sull'**onorario** e la riga *"Tempi realistici. Nessuna promessa di risultati immediati"*

Se aggiungi testi, segui questa divisione: "tu" ovunque, forma impersonale quando si parla di
tempi, onorari e modalità di svolgimento.

## Personalizzazione rapida

**Colori** — tutto in cima a `styles.css`, blocco `:root`:

```css
--green-700: #4A6B5A;   /* verde salvia scuro: titoli, bottoni */
--green-300: #8FA99B;   /* salvia: dettagli */
--sand-300:  #E8DFD3;   /* sabbia */
--shell:     #FBF9F5;   /* sfondo pagina */
--clay:      #D98E5F;   /* accento terracotta: CTA, sottolineature */
```

**Caratteri** — Fraunces (titoli) + Inter (testo), caricati da Google Fonts.
Per evitare la connessione a Google (privacy) si possono scaricare i due font,
metterli in `assets/fonts/` e sostituire il `<link>` con delle regole `@font-face`.

**Testi** — sono in chiaro nell'HTML, commentati per sezione. Nessun contenuto è generato
dinamicamente. Ricorda che ogni sezione esiste in due copie: nella sua pagina e dentro
`onepage.html`.

## Accessibilità e prestazioni

- HTML semantico, `skip link`, contrasti conformi AA, navigazione completa da tastiera
- La pagina corrente è segnalata nel menu con `aria-current="page"`
- Tutte le animazioni si disattivano con `prefers-reduced-motion`
- Se JavaScript è disabilitato il sito resta completamente leggibile
- Zero librerie esterne: solo i font sono una richiesta di rete
- Dati strutturati `schema.org/Psychologist` su home e pagina contatti

## Pubblicazione

Qualsiasi hosting statico va bene. Le opzioni gratuite più semplici:

- **Netlify Drop** — <https://app.netlify.com/drop>, si trascina la cartella nel browser
- **Cloudflare Pages** / **GitHub Pages** — connettendo un repository
- Poi si collega il dominio (es. `raffaellaparrotta.it`) dal pannello del provider

Dopo la pubblicazione conviene registrare il sito su Google Search Console e creare/rivendicare
la scheda **Google Business Profile** dello studio: per un professionista locale porta più
contatti della SEO tradizionale.

## La demo della stimolazione bilaterale

Nella pagina EMDR il riquadro scuro mostra tre modalità, selezionabili dai pulsanti in alto:

| Modalità | Cosa mostra |
|---|---|
| **Tocchi alternati** (predefinita) | due mani che si illuminano a turno, compreso l'“abbraccio della farfalla” usato con i bambini |
| **Movimenti oculari** | il punto che si sposta da un lato all'altro |
| **Suoni alternati** | due altoparlanti che pulsano a turno, come i suoni in cuffia |

Per cambiare la modalità mostrata all'apertura servono tre modifiche coordinate: l'ordine dei
pulsanti in `.demo-tabs`, l'`aria-pressed="true"` sul pulsante giusto, e l'attributo
`data-mode` su `.demo-stage` (più il testo iniziale della didascalia).

Le didascalie che accompagnano ogni modalità sono nell'oggetto `CAPTIONS` in `script.js`:
per modificarne il testo basta intervenire lì. Per aggiungere una quarta modalità servono tre
cose: un pulsante `data-mode="nome"` in `.demo-tabs`, gli elementi grafici dentro `.demo-stage`
mostrati con `[data-mode="nome"]` in `styles.css`, e una voce in `CAPTIONS`.
