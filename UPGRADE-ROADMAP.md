# Red Velvet Live Club — piano di potenziamento

## Sintesi dell'audit

Il progetto contiene già una base full-stack React 19, Tailwind 4, Express, tRPC, Drizzle, autenticazione Manus, storage, Shopify headless e test Vitest. Le superfici principali sono la homepage live, Discovery, Creator Studio, profili creator, Inbox, Community, Safety, Settings, Admin, Earnings, Podcast, Writing, Rewards, Store, Rubina e Ruby Lounge.

La base è interessante perché il prodotto non è un semplice catalogo: unisce club live, community, creator economy, contenuti editoriali, rewards e commercio. Per renderlo competitivo nel settore adulto premium, il percorso corretto non è aumentare la quantità di contenuti espliciti, ma aumentare **fiducia, qualità della scoperta, retention, controllo dei creator, privacy e affidabilità operativa**.

## Priorità di prodotto

### 1. Fondamenta di sicurezza e consenso

Il gate 18+ deve diventare una policy verificabile lato server, non soltanto uno stato locale del browser. Occorrono un registro delle preferenze di consenso, timestamp UTC, versione della policy accettata, revoca rapida, blocco profilo, mute, report con contesto, code di moderazione e audit log amministrativo. Per i creator servono checklist prima della pubblicazione, stati `draft`, `review`, `approved`, `rejected` e motivazioni leggibili.

Questa fase deve includere rate limiting delle azioni sensibili, validazione degli upload, rimozione dei dati EXIF, limiti di dimensione, scanning antivirus e log minimizzati. Le decisioni di moderazione devono restare spiegabili e contestabili.

### 2. Live rooms e realtime

Le room esistono già come contratti tRPC ma non hanno ancora una vera infrastruttura realtime. Il passo successivo è aggiungere presenza, ruoli host/moderator/viewer, hand raise, mute, slow mode, messaggi fissati, reazioni, pass privato e aftercare post-room. Una room dovrebbe esporre sempre: regole, livello di accesso, trigger di segnalazione, host verificato, capacità, stato e replay consentito o vietato.

Per il realtime va scelto un servizio WebSocket/SSE con hosting persistente e limiti chiari. Non bisogna simulare il live in produzione con stato locale.

### 3. Discovery e personalizzazione

La Discovery attuale ha una buona base di ricerca, categorie e salvati. Va estesa con filtri per atmosfera, formato, lingua, disponibilità, live adesso, contenuto editoriale, creator verificato e livello di privacy. Un profilo dovrebbe avere una scheda di confini, preferenze di interazione, orari, formati e contenuti disponibili.

La personalizzazione iniziale può restare trasparente e basata su segnali semplici: salvati, room visitate, categorie seguite e preferenze esplicite. Evitare algoritmi opachi che inferiscano orientamento o dati sensibili.

### 4. Creator economy

Creator Studio deve evolvere da demo locale a workflow reale: calendario, bozze, media library, livelli premium, bundle, wishlist, richieste di collaborazione, revenue dashboard, payout status, analytics per contenuto e gestione di sponsor. Ogni funzione economica deve restare disabilitata finché provider, identità, tasse, rimborsi e autorizzazioni non sono verificati.

### 5. Community e retention

Community, Inbox, Podcast, Writing e Rewards sono già presenti. Il potenziamento più utile è unificare notifiche, calendari, follow, digest, reminder per le room, streak non manipolative e preferenze di comunicazione. Le ricompense devono premiare partecipazione rispettosa e contributi creativi, non pressione o permanenza compulsiva.

### 6. Commercio e affiliazione

Lo store Shopify è già predisposto. Servono sincronizzazione dello stato ordine, policy reali, resi, stock, tasse, compatibilità geografica, verifica di età dove richiesta e separazione netta tra acquisto di prodotti e accesso ai contenuti. L'affiliazione deve mostrare in modo chiaro commissioni, condizioni e stato maturazione.

## Prima release non distruttiva

La prima release tecnica deve mantenere tutte le route e funzioni esistenti e aggiungere:

1. metadata social e SEO coerenti;
2. caricamento analytics soltanto quando le variabili sono configurate;
3. centro privacy/consenso riutilizzabile;
4. filtri Discovery per live, verificato, disponibilità e atmosfera;
5. notifiche unificate e stato vuoto più informativo;
6. miglioramenti keyboard, focus, reduced motion e contrasto;
7. test per age gate, report, rewards, room e accesso ai contenuti.

## Dipendenze che richiedono configurazione reale

Per completare il potenziamento end-to-end servono un progetto WebDev collegato, database attivo, storage media, provider realtime, configurazione Meta, provider pagamenti e policy legali approvate. In assenza di questi collegamenti, è corretto implementare UI, contratti tRPC, migrazioni e test senza fingere che live video, pagamenti o moderazione siano già operativi.

## Principio editoriale

Red Velvet può essere audace, adulto e sensuale senza trasformare la piattaforma in un luogo coercitivo o privo di controlli. Il vantaggio competitivo deve essere **l'esperienza premium, la fiducia e la qualità della cura**, non la pubblicazione indiscriminata di contenuti espliciti.
