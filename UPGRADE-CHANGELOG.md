# Red Velvet Live Club — prima release di potenziamento

## Applicato

La webapp conserva tutte le route, le integrazioni e le funzioni esistenti. Sono stati aggiunti metadata social e descrizioni più complete per anteprime e condivisioni; è stato eliminato il caricamento analytics con placeholder non configurati, che produceva warning e richieste errate; l'analytics Umami viene ora caricato soltanto quando `VITE_ANALYTICS_ENDPOINT` e `VITE_ANALYTICS_WEBSITE_ID` sono realmente presenti.

È stato inoltre rafforzato il comportamento globale di accessibilità con focus keyboard visibile, selezione cromaticamente coerente e stato `not-allowed` per controlli disabilitati. La palette e il linguaggio del progetto restano invariati.

## Verifica

Il typecheck passa. La suite passa con 14 test riusciti e 1 test saltato già presente nella baseline. La build di produzione passa; resta soltanto un avviso dimensionale sul bundle frontend superiore a 500 kB, da risolvere nella fase di code splitting senza modificare il comportamento.

## Prossima tranche consigliata

La prossima modifica ad alto impatto è il centro consenso/privacy condiviso e la trasformazione delle room da demo tRPC a esperienza realtime con presenza, ruoli, moderazione e aftercare. Per renderla realmente operativa servono database e progetto WebDev collegati, oltre alla scelta del provider realtime.

## Release ibrida — Live Hub

È stata aggiunta la route `/live` con Live Hub: token LiveKit server-side a durata breve e grant differenziati, componenti browser LiveKit per il video, token Stream Chat server-side, webchat umana persistente e catalogo di destinazioni affiliate esterne con disclosure. Rubina resta esplicitamente separata dalla chat reale.

La modalità fail-closed mostra lo stato `da configurare` quando le credenziali non esistono; non vengono creati token falsi e nessun secret viene inviato al browser. Variabili richieste: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `STREAM_API_KEY`, `STREAM_API_SECRET`.

Prima del lancio in produzione occorre ottenere l'approvazione scritta di LiveKit e Stream per l'esatto caso d'uso 18+ con contenuto eventualmente esplicito, oltre a completare age assurance, consenso performer, moderazione umana, procedure takedown/appeal e policy territoriali. Le piattaforme esterne sono link affiliate: nessun mirroring è stato implementato.
