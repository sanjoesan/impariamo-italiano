/* =========================================================
   Impariamo! — Italienische Gesten (Lektionen zur Auflockerung)
   Je Kurs-Sprache eine Liste; Reihenfolge = Reihenfolge im Lernpfad
   (buildLessons verteilt sie gleichmäßig über das ganze Programm).
   Eine Geste: pic (Emoji-Bild), name, meaning, how (So geht's),
   when (Wann/Achtung), sentences [{it, de}].
   Lädt VOR data.js (nach grammatik.js: nutzt pickDistractors).
   ========================================================= */

/* Auswahl-Aufgaben einer Gesten-Lektion: Bedeutung erkennen + Geste zum Satz finden */
function gestureDrill(g, all) {
  const label = (x) => `${x.pic} ${x.name}`;
  const meaningItem = {
    ask: `Was bedeutet die Geste ${label(g)}?`,
    answer: g.meaning,
    options: [g.meaning, ...pickDistractors(all.map((x) => x.meaning), g.meaning, 3, g.id)],
    explain: g.how
  };
  const sentenceItems = g.sentences.map((s) => ({
    ask: `Welche Geste passt zu „${s.it}"?`,
    hint: s.de,
    answer: label(g),
    options: [label(g), ...pickDistractors(all.map(label), label(g), 3, s.it)],
    explain: g.meaning,
    say: s.it
  }));
  return [meaningItem, ...sentenceItems];
}

const GESTI = {
  it: [
    { id: "mangiare", pic: "🤌👄", name: "Si mangia!", meaning: "Essen! / Es gibt Essen",
      how: "Die Fingerspitzen einer Hand zusammenlegen und mehrmals zum Mund führen.",
      when: "Um zum Essen zu rufen – oder quer über den Tisch zu fragen: Essen wir?",
      sentences: [
        { it: "A tavola, si mangia!", de: "Zu Tisch, es gibt Essen!" },
        { it: "Mangiamo qualcosa insieme?", de: "Essen wir zusammen etwas?" },
        { it: "Hai già mangiato?", de: "Hast du schon gegessen?" },
        { it: "Stasera mangiamo fuori.", de: "Heute Abend essen wir auswärts." }] },
    { id: "buono", pic: "☝️😋", name: "Buono!", meaning: "Lecker! Schmeckt super",
      how: "Den Zeigefinger in die Wange drücken und ein paar Mal hin und her drehen.",
      when: "Beim Essen – als Kompliment an die Köchin oder den Koch. Kinder machen es besonders gern.",
      sentences: [
        { it: "Che buona questa pizza!", de: "Wie lecker diese Pizza ist!" },
        { it: "Mamma, la lasagna è buonissima!", de: "Mama, die Lasagne ist superlecker!" },
        { it: "Questo gelato è davvero buono.", de: "Dieses Eis ist wirklich lecker." },
        { it: "Mmm, buono! Ne vorrei ancora.", de: "Mmm, lecker! Davon hätte ich gern noch mehr." }] },
    { id: "silenzio", pic: "🤫", name: "Zitto!", meaning: "Psst! Sei still!",
      how: "Den Zeigefinger senkrecht auf die Lippen legen.",
      when: "Im Kino, in der Kirche, wenn das Baby schläft – oder bei einem Geheimnis.",
      sentences: [
        { it: "Zitto, il bambino dorme!", de: "Psst, das Kind schläft!" },
        { it: "Silenzio, per favore, inizia il film.", de: "Ruhe bitte, der Film fängt an." },
        { it: "Non dirlo a nessuno, è un segreto.", de: "Sag es niemandem, es ist ein Geheimnis." },
        { it: "Parla piano, siamo in chiesa.", de: "Sprich leise, wir sind in der Kirche." }] },
    { id: "fame", pic: "✋🍝", name: "Ho fame!", meaning: "Ich habe Hunger!",
      how: "Mit der Handkante der flachen Hand ein paar Mal seitlich gegen die Taille schlagen.",
      when: "Kurz vor dem Essen, wenn der Magen knurrt.",
      sentences: [
        { it: "Ho una fame da lupi!", de: "Ich habe einen Bärenhunger!" },
        { it: "Quando si mangia? Ho fame!", de: "Wann gibt es Essen? Ich habe Hunger!" },
        { it: "Non ho mangiato niente da stamattina.", de: "Ich habe seit heute Morgen nichts gegessen." },
        { it: "Andiamo a mangiare qualcosa?", de: "Gehen wir etwas essen?" }] },
    { id: "bere", pic: "🤙🍷", name: "Beviamo qualcosa?", meaning: "Trinken wir was?",
      how: "Daumen und kleinen Finger abspreizen, die übrigen Finger einrollen und den Daumen zum Mund kippen.",
      when: "Um jemanden auf einen Drink einzuladen – auch quer durch einen lauten Raum.",
      sentences: [
        { it: "Andiamo a bere qualcosa?", de: "Gehen wir etwas trinken?" },
        { it: "Offro io da bere!", de: "Die Getränke gehen auf mich!" },
        { it: "Prendiamo un aperitivo?", de: "Nehmen wir einen Aperitif?" },
        { it: "Ho sete, beviamo un po' d'acqua.", de: "Ich habe Durst, trinken wir etwas Wasser." }] },
    { id: "telefono", pic: "🤙📞", name: "Ci sentiamo!", meaning: "Wir telefonieren! / Ruf mich an",
      how: "Daumen ans Ohr, kleinen Finger zum Mund – wie ein Telefonhörer.",
      when: "Beim Abschied oder quer über die Straße: Wir hören voneinander.",
      sentences: [
        { it: "Ci sentiamo domani!", de: "Wir hören uns morgen!" },
        { it: "Chiamami quando arrivi.", de: "Ruf mich an, wenn du ankommst." },
        { it: "Ti telefono stasera.", de: "Ich rufe dich heute Abend an." },
        { it: "Mandami un messaggio!", de: "Schick mir eine Nachricht!" }] },
    { id: "cosi-cosi", pic: "🤚〰️", name: "Così così", meaning: "So lala / mehr oder weniger",
      how: "Die flache Hand mit der Handfläche nach unten locker hin und her kippen.",
      when: "Wenn etwas weder richtig gut noch richtig schlecht ist.",
      sentences: [
        { it: "Come stai? – Così così.", de: "Wie geht's? – So lala." },
        { it: "Il film? Più o meno.", de: "Der Film? Na ja, mittelmäßig." },
        { it: "Ho capito più o meno tutto.", de: "Ich habe mehr oder weniger alles verstanden." },
        { it: "La cena era così così.", de: "Das Abendessen war so lala." }] },
    { id: "boh", pic: "🤷", name: "Boh!", meaning: "Keine Ahnung! / Wer weiß?",
      how: "Die Schultern hochziehen, die Mundwinkel nach unten, die Handflächen kurz nach oben drehen.",
      when: "Wenn man etwas nicht weiß – sehr umgangssprachlich und sehr häufig.",
      sentences: [
        { it: "Dov'è Marco? – Boh!", de: "Wo ist Marco? – Keine Ahnung!" },
        { it: "Chissà quando arriva il treno.", de: "Wer weiß, wann der Zug kommt." },
        { it: "Non lo so proprio.", de: "Ich weiß es wirklich nicht." },
        { it: "Boh, decidi tu!", de: "Keine Ahnung, entscheide du!" }] },
    { id: "ma-che-vuoi", pic: "🤌", name: "Ma che vuoi?", meaning: "Was willst du denn? / Was soll das?",
      how: "Alle Fingerspitzen einer Hand zusammenlegen (Spitzen nach oben) und die Hand locker auf und ab bewegen.",
      when: "Wenn dich etwas nervt oder du etwas nicht verstehst – unter Freunden, nicht beim Chef.",
      sentences: [
        { it: "Ma che vuoi da me?", de: "Was willst du denn von mir?" },
        { it: "Ma cosa stai dicendo?", de: "Was redest du da eigentlich?" },
        { it: "Ma che fai? Sei impazzito?", de: "Was machst du denn? Bist du verrückt geworden?" },
        { it: "Ma dai, non è possibile!", de: "Ach komm, das kann nicht sein!" }] },
    { id: "perfetto", pic: "🤌💋", name: "Perfetto!", meaning: "Perfekt! Ein Gedicht!",
      how: "Die zusammengelegten Fingerspitzen an die Lippen führen, einen Kuss darauf geben und die Hand nach vorne öffnen.",
      when: "Wenn etwas richtig gut gelungen ist – ein Essen, ein Wein, ein Tor.",
      sentences: [
        { it: "Questo vino è perfetto!", de: "Dieser Wein ist perfekt!" },
        { it: "La cena di stasera? Un capolavoro!", de: "Das Abendessen heute? Ein Meisterwerk!" },
        { it: "Che gol! Perfetto!", de: "Was für ein Tor! Perfekt!" },
        { it: "Il sugo della nonna è la fine del mondo.", de: "Omas Soße ist der Wahnsinn." }] },
    { id: "soldi", pic: "💶🤏", name: "Soldi!", meaning: "Geld – das ist teuer!",
      how: "Den Daumen an Zeige- und Mittelfinger reiben, als würdest du Geldscheine zählen.",
      when: "Wenn es ums Geld geht: Etwas ist teuer, oder jemand soll endlich zahlen.",
      sentences: [
        { it: "Questa borsa costa un occhio della testa!", de: "Diese Tasche kostet ein Vermögen!" },
        { it: "Hai i soldi per il biglietto?", de: "Hast du das Geld für das Ticket?" },
        { it: "Quel ristorante è troppo caro.", de: "Das Restaurant ist zu teuer." },
        { it: "Mi devi ancora dieci euro!", de: "Du schuldest mir noch zehn Euro!" }] },
    { id: "andiamo", pic: "👋💨", name: "Andiamo!", meaning: "Lass uns gehen! / Wir hauen ab",
      how: "Eine Hand flach halten und die andere flache Hand schnell darüber nach vorne gleiten lassen.",
      when: "Wenn es Zeit ist zu gehen – zum Beispiel auf einer langweiligen Party.",
      sentences: [
        { it: "È tardi, andiamo!", de: "Es ist spät, lass uns gehen!" },
        { it: "Qui mi annoio, ce ne andiamo?", de: "Mir ist langweilig hier, hauen wir ab?" },
        { it: "Dai, muoviti, perdiamo il treno!", de: "Los, beeil dich, wir verpassen den Zug!" },
        { it: "Io me ne vado, ciao a tutti!", de: "Ich gehe, tschüss zusammen!" }] },
    { id: "occhio", pic: "☝️👁️", name: "Occhio!", meaning: "Pass auf! / Augen auf!",
      how: "Mit dem Zeigefinger das untere Augenlid leicht nach unten ziehen.",
      when: "Als Warnung – oder um zu sagen: Ich hab dich durchschaut.",
      sentences: [
        { it: "Occhio al portafoglio in metro!", de: "Pass in der U-Bahn auf dein Portemonnaie auf!" },
        { it: "Occhio, il pavimento è bagnato.", de: "Vorsicht, der Boden ist nass." },
        { it: "Occhio a quel tipo, non mi fido.", de: "Pass auf den Typen auf, ich traue ihm nicht." },
        { it: "Stai attento, ti tengo d'occhio!", de: "Pass bloß auf, ich behalte dich im Auge!" }] },
    { id: "matto", pic: "☝️🌀", name: "Sei matto?", meaning: "Bist du verrückt?",
      how: "Mit dem Zeigefinger an die Schläfe tippen oder ihn dort hin und her drehen.",
      when: "Wenn jemand eine völlig verrückte Idee hat. Im Straßenverkehr gegen andere: unhöflich!",
      sentences: [
        { it: "Vuoi nuotare adesso? Sei matto?", de: "Du willst jetzt schwimmen? Bist du verrückt?" },
        { it: "Ma sei fuori di testa?", de: "Bist du noch ganz bei Trost?" },
        { it: "Guidare così veloce è da pazzi.", de: "So schnell zu fahren ist verrückt." },
        { it: "Quell'uomo è proprio matto!", de: "Dieser Mann ist wirklich verrückt!" }] },
    { id: "basta", pic: "🙅", name: "Basta!", meaning: "Schluss! Aus! Genug!",
      how: "Beide flachen Hände vor dem Körper überkreuzen und schnell nach außen auseinanderziehen.",
      when: "Wenn etwas endgültig vorbei ist – oder man keine Diskussion mehr will.",
      sentences: [
        { it: "Basta, non ne posso più!", de: "Schluss, ich kann nicht mehr!" },
        { it: "Tra noi è finita!", de: "Zwischen uns ist es aus!" },
        { it: "Basta con i dolci, sono a dieta.", de: "Schluss mit den Süßigkeiten, ich mache Diät." },
        { it: "Niente più discussioni, basta così.", de: "Keine Diskussionen mehr, das reicht." }] },
    { id: "ti-prego", pic: "🙏", name: "Ti prego!", meaning: "Ich bitte dich! / Was soll ich da machen?",
      how: "Die Handflächen wie zum Gebet aneinanderlegen und die Hände vor der Brust auf und ab bewegen.",
      when: "Wenn man jemanden inständig bittet – oder genervt fragt, was der andere eigentlich will.",
      sentences: [
        { it: "Ti prego, aiutami!", de: "Ich bitte dich, hilf mir!" },
        { it: "Per favore, fammi entrare!", de: "Bitte, lass mich rein!" },
        { it: "Ma che ti devo dire?", de: "Was soll ich dir denn sagen?" },
        { it: "Ti supplico, non dirlo a mia madre!", de: "Ich flehe dich an, sag es nicht meiner Mutter!" }] },
    { id: "corna", pic: "🤘", name: "Le corna!", meaning: "Unglück, bleib weg! (wie „toi, toi, toi\")",
      how: "Zeige- und kleinen Finger ausstrecken, die anderen Finger mit dem Daumen festhalten – die Hand zeigt nach unten.",
      when: "Wenn jemand etwas Unglückliches erwähnt. Achtung: Auf eine Person gerichtet ist es eine Beleidigung („cornuto\" = betrogener Ehemann)!",
      sentences: [
        { it: "Speriamo che non piova… facciamo le corna!", de: "Hoffentlich regnet es nicht … toi, toi, toi!" },
        { it: "Domani ho l'esame. Corna!", de: "Morgen habe ich die Prüfung. Toi, toi, toi!" },
        { it: "Non dirlo nemmeno, porta sfortuna!", de: "Sag das nicht mal, das bringt Unglück!" },
        { it: "Finora è andato tutto bene, corna!", de: "Bisher ist alles gut gegangen, unberufen!" }] },
    { id: "tocca-ferro", pic: "🔩✋", name: "Tocca ferro!", meaning: "Klopf auf Holz! (in Italien: Eisen berühren)",
      how: "Mit der Hand etwas aus Eisen oder Metall berühren – eine Türklinke, ein Geländer, einen Schlüssel.",
      when: "Wenn man Glück beschwören oder Pech abwenden will.",
      sentences: [
        { it: "Quest'anno non mi sono mai ammalato, tocca ferro!", de: "Dieses Jahr war ich noch nie krank, klopf auf Holz!" },
        { it: "Tocca ferro, domani parto per le vacanze.", de: "Klopf auf Holz, morgen fahre ich in den Urlaub." },
        { it: "La macchina funziona ancora… tocchiamo ferro!", de: "Das Auto läuft noch … klopfen wir auf Holz!" },
        { it: "Tocca ferro e speriamo bene.", de: "Klopf auf Holz und hoffen wir das Beste." }] },
    { id: "insieme", pic: "☝️☝️", name: "Stanno insieme", meaning: "Die beiden sind ein Paar",
      how: "Beide Zeigefinger nebeneinanderlegen und aneinander reiben.",
      when: "Um anzudeuten, dass zwei Menschen zusammen sind – meist augenzwinkernd.",
      sentences: [
        { it: "Luca e Giulia? Stanno insieme!", de: "Luca und Giulia? Die sind zusammen!" },
        { it: "Quei due sono inseparabili.", de: "Die beiden sind unzertrennlich." },
        { it: "Si vedono tutti i giorni…", de: "Die sehen sich jeden Tag …" },
        { it: "Sono fidanzati da un anno.", de: "Sie sind seit einem Jahr zusammen." }] },
    { id: "che-barba", pic: "🧔✋", name: "Che barba!", meaning: "Wie langweilig!",
      how: "Mit dem Handrücken seitlich an der Wange entlang nach unten streichen – als hätte man einen langen Bart.",
      when: "Wenn etwas endlos langweilig ist – so lange, dass einem ein Bart wächst.",
      sentences: [
        { it: "Questa lezione è una barba!", de: "Diese Stunde ist stinklangweilig!" },
        { it: "Che noia questo film!", de: "Wie langweilig dieser Film ist!" },
        { it: "Ancora la stessa storia? Che barba!", de: "Schon wieder dieselbe Geschichte? Wie öde!" },
        { it: "Mi sto annoiando da morire.", de: "Ich langweile mich zu Tode." }] },
    { id: "fin-qui", pic: "✋😤", name: "Ne ho fin qui!", meaning: "Mir steht's bis hier! / Ich hab die Nase voll",
      how: "Die flache Hand waagerecht unter das Kinn halten (oder sogar über den Kopf).",
      when: "Wenn man von etwas wirklich genug hat.",
      sentences: [
        { it: "Ne ho fin qui di questo lavoro!", de: "Ich habe die Nase voll von dieser Arbeit!" },
        { it: "Sono stufo di aspettare.", de: "Ich habe es satt zu warten." },
        { it: "Ho mangiato troppo, sono pieno fin qui!", de: "Ich habe zu viel gegessen, ich bin bis hier voll!" },
        { it: "Non ce la faccio più!", de: "Ich schaffe das nicht mehr!" }] },
    { id: "furbo", pic: "☝️👃", name: "Furbo!", meaning: "Schlau! / Gerissen – da ist was im Busch",
      how: "Mit dem Zeigefinger ein paar Mal seitlich an die Nase tippen.",
      when: "Wenn jemand clever ist – oder ein bisschen zu gerissen.",
      sentences: [
        { it: "Quel ragazzo è proprio furbo.", de: "Der Junge ist wirklich schlau." },
        { it: "Attento, è una volpe!", de: "Vorsicht, der ist ein schlauer Fuchs!" },
        { it: "Che furbo, ha trovato un parcheggio gratis!", de: "Wie gerissen, er hat einen Gratisparkplatz gefunden!" },
        { it: "Qui c'è qualcosa che non va.", de: "Hier stimmt etwas nicht." }] },
    { id: "me-ne-frego", pic: "🫲💨", name: "Me ne frego!", meaning: "Ist mir doch egal!",
      how: "Mit den Fingerspitzen (Handrücken nach vorn) unter dem Kinn entlangstreichen und die Hand nach vorne wegschnippen.",
      when: "Salopp und etwas frech – unter Freunden, nicht bei Fremden oder Vorgesetzten.",
      sentences: [
        { it: "Me ne frego di quello che dice.", de: "Mir ist egal, was er sagt." },
        { it: "Il calcio? Me ne frego!", de: "Fußball? Ist mir völlig egal!" },
        { it: "Se piove, pazienza: esco lo stesso.", de: "Wenn es regnet, egal: Ich gehe trotzdem raus." },
        { it: "Non me ne importa niente.", de: "Das interessiert mich überhaupt nicht." }] },
    { id: "vattene", pic: "🫸", name: "Vattene!", meaning: "Hau ab! Verschwinde!",
      how: "Die Hand mit dem Handrücken nach vorn ein paar Mal vom Körper wegschnippen.",
      when: "Unhöflich! Nur im Spaß unter Freunden – oder bei einer lästigen Fliege.",
      sentences: [
        { it: "Vattene, lasciami in pace!", de: "Hau ab, lass mich in Ruhe!" },
        { it: "Sparisci, non ti voglio vedere!", de: "Verschwinde, ich will dich nicht sehen!" },
        { it: "Via, via, sciò!", de: "Weg, weg, husch!" },
        { it: "Lasciami stare, per favore.", de: "Lass mich bitte in Ruhe." }] }
  ]
};
