'use client';
import { Input } from './ui/input';
import { Button } from './ui/button';
const miasta = [
  'Bolesławiec',
  'Nowogrodziec',
  'Bielawa',
  'Dzierżoniów',
  'Niemcza',
  'Pieszyce',
  'Piława Górna',
  'Głogów',
  'Góra',
  'Wąsosz',
  'Bolków',
  'Jawor',
  'Jelenia Góra',
  'Kamienna Góra',
  'Lubawka',
  'Karpacz',
  'Kowary',
  'Piechowice',
  'Szklarska Poręba',
  'Bystrzyca Kłodzka',
  'Duszniki-Zdrój',
  'Kłodzko',
  'Kudowa-Zdrój',
  'Lądek-Zdrój',
  'Międzylesie',
  'Nowa Ruda',
  'Polanica-Zdrój',
  'Radków',
  'Stronie Śląskie',
  'Szczytna',
  'Legnica',
  'Chojnów',
  'Prochowice',
  'Leśna',
  'Lubań',
  'Olszyna',
  'Świeradów-Zdrój',
  'Lubin',
  'Ścinawa',
  'Gryfów Śląski',
  'Lubomierz',
  'Lwówek Śląski',
  'Mirsk',
  'Wleń',
  'Milicz',
  'Bierutów',
  'Międzybórz',
  'Oleśnica',
  'Syców',
  'Twardogóra',
  'Jelcz-Laskowice',
  'Oława',
  'Chocianów',
  'Polkowice',
  'Przemków',
  'Strzelin',
  'Wiązów',
  'Miękinia',
  'Środa Śląska',
  'Jaworzyna Śląska',
  'Strzegom',
  'Świdnica',
  'Świebodzice',
  'Żarów',
  'Oborniki Śląskie',
  'Prusice',
  'Trzebnica',
  'Żmigród',
  'Wałbrzych',
  'Boguszów-Gorce',
  'Głuszyca',
  'Jedlina-Zdrój',
  'Mieroszów',
  'Szczawno-Zdrój',
  'Brzeg Dolny',
  'Wołów',
  'Wrocław',
  'Kąty Wrocławskie',
  'Siechnice',
  'Sobótka',
  'Bardo',
  'Kamieniec Ząbkowicki',
  'Ząbkowice Śląskie',
  'Ziębice',
  'Złoty Stok',
  'Bogatynia',
  'Pieńsk',
  'Węgliniec',
  'Zawidów',
  'Zgorzelec',
  'Świerzawa',
  'Wojcieszów',
  'Złotoryja',
  'Aleksandrów Kujawski',
  'Ciechocinek',
  'Nieszawa',
  'Brodnica',
  'Górzno',
  'Jabłonowo Pomorskie',
  'Koronowo',
  'Solec Kujawski',
  'Bydgoszcz',
  'Chełmno',
  'Golub-Dobrzyń',
  'Kowalewo Pomorskie',
  'Grudziądz',
  'Łasin',
  'Radzyń Chełmiński',
  'Gniewkowo',
  'Inowrocław',
  'Janikowo',
  'Kruszwica',
  'Pakość',
  'Bobrowniki',
  'Dobrzyń nad Wisłą',
  'Kikół',
  'Lipno',
  'Skępe',
  'Mogilno',
  'Strzelno',
  'Kcynia',
  'Mrocza',
  'Nakło nad Notecią',
  'Szubin',
  'Piotrków Kujawski',
  'Radziejów',
  'Rypin',
  'Kamień Krajeński',
  'Sępólno Krajeńskie',
  'Więcbork',
  'Nowe',
  'Pruszcz',
  'Świecie',
  'Toruń',
  'Chełmża',
  'Tuchola',
  'Wąbrzeźno',
  'Włocławek',
  'Brześć Kujawski',
  'Chodecz',
  'Izbica Kujawska',
  'Kowal',
  'Lubień Kujawski',
  'Lubraniec',
  'Barcin',
  'Gąsawa',
  'Janowiec Wielkopolski',
  'Łabiszyn',
  'Żnin',
  'Międzyrzec Podlaski',
  'Piszczac',
  'Terespol',
  'Biała Podlaska',
  'Biłgoraj',
  'Frampol',
  'Goraj',
  'Józefów',
  'Tarnogród',
  'Turobin',
  'Chełm',
  'Rejowiec',
  'Rejowiec Fabryczny',
  'Siedliszcze',
  'Hrubieszów',
  'Janów Lubelski',
  'Modliborzyce',
  'Izbica',
  'Krasnystaw',
  'Annopol',
  'Kraśnik',
  'Urzędów',
  'Kamionka',
  'Kock',
  'Lubartów',
  'Ostrów Lubelski',
  'Bełżyce',
  'Bychawa',
  'Lublin',
  'Łęczna',
  'Łuków',
  'Stoczek Łukowski',
  'Józefów nad Wisłą',
  'Opole Lubelskie',
  'Poniatowa',
  'Parczew',
  'Kazimierz Dolny',
  'Nałęczów',
  'Puławy',
  'Czemierniki',
  'Radzyń Podlaski',
  'Dęblin',
  'Ryki',
  'Piaski',
  'Świdnik',
  'Lubycza Królewska',
  'Łaszczów',
  'Tomaszów Lubelski',
  'Tyszowce',
  'Włodawa',
  'Krasnobród',
  'Szczebrzeszyn',
  'Zwierzyniec',
  'Zamość',
  'Kostrzyn nad Odrą',
  'Witnica',
  'Gorzów Wielkopolski',
  'Gubin',
  'Krosno Odrzańskie',
  'Międzyrzecz',
  'Skwierzyna',
  'Trzciel',
  'Bytom Odrzański',
  'Kożuchów',
  'Nowa Sól',
  'Nowe Miasteczko',
  'Otyń',
  'Cybinka',
  'Ośno Lubuskie',
  'Rzepin',
  'Słubice',
  'Dobiegniew',
  'Drezdenko',
  'Strzelce Krajeńskie',
  'Lubniewice',
  'Sulęcin',
  'Torzym',
  'Świebodzin',
  'Zbąszynek',
  'Sława',
  'Szlichtyngowa',
  'Wschowa',
  'Zielona Góra',
  'Babimost',
  'Czerwieńsk',
  'Kargowa',
  'Nowogród Bobrzański',
  'Sulechów',
  'Gozdnica',
  'Iłowa',
  'Małomice',
  'Szprotawa',
  'Żagań',
  'Brody',
  'Jasień',
  'Lubsko',
  'Łęknica',
  'Żary',
  'Bełchatów',
  'Zelów',
  'Brzeziny',
  'Jeżów',
  'Dąbrowice',
  'Krośniewice',
  'Kutno',
  'Żychlin',
  'Łask',
  'Grabów',
  'Łęczyca',
  'Piątek',
  'Kiernozia',
  'Łowicz',
  'Koluszki',
  'Rzgów',
  'Tuszyn',
  'Łódź',
  'Białaczów',
  'Drzewica',
  'Opoczno',
  'Żarnów',
  'Konstantynów Łódzki',
  'Lutomiersk',
  'Pabianice',
  'Działoszyn',
  'Pajęczno',
  'Rozprza',
  'Sulejów',
  'Wolbórz',
  'Piotrków Trybunalski',
  'Poddębice',
  'Uniejów',
  'Kamieńsk',
  'Przedbórz',
  'Radomsko',
  'Biała Rawska',
  'Rawa Mazowiecka',
  'Błaszki',
  'Sieradz',
  'Warta',
  'Złoczew',
  'Skierniewice',
  'Bolimów',
  'Inowłódz',
  'Tomaszów Mazowiecki',
  'Ujazd',
  'Osjaków',
  'Wieluń',
  'Bolesławiec',
  'Lututów',
  'Wieruszów',
  'Szadek',
  'Zduńska Wola',
  'Aleksandrów Łódzki',
  'Głowno',
  'Ozorków',
  'Parzęczew',
  'Stryków',
  'Zgierz',
  'Bochnia',
  'Nowy Wiśnicz',
  'Brzesko',
  'Czchów',
  'Alwernia',
  'Chrzanów',
  'Libiąż',
  'Trzebinia',
  'Dąbrowa Tarnowska',
  'Szczucin',
  'Biecz',
  'Bobowa',
  'Gorlice',
  'Krzeszowice',
  'Skała',
  'Skawina',
  'Słomniki',
  'Świątniki Górne',
  'Kraków',
  'Limanowa',
  'Mszana Dolna',
  'Książ Wielki',
  'Miechów',
  'Dobczyce',
  'Myślenice',
  'Sułkowice',
  'Grybów',
  'Krynica-Zdrój',
  'Muszyna',
  'Piwniczna-Zdrój',
  'Stary Sącz',
  'Czarny Dunajec',
  'Nowy Targ',
  'Rabka-Zdrój',
  'Szczawnica',
  'Nowy Sącz',
  'Bukowno',
  'Olkusz',
  'Wolbrom',
  'Brzeszcze',
  'Chełmek',
  'Kęty',
  'Oświęcim',
  'Zator',
  'Koszyce',
  'Nowe Brzesko',
  'Proszowice',
  'Jordanów',
  'Maków Podhalański',
  'Sucha Beskidzka',
  'Ciężkowice',
  'Radłów',
  'Ryglice',
  'Tuchów',
  'Wojnicz',
  'Zakliczyn',
  'Żabno',
  'Tarnów',
  'Zakopane',
  'Andrychów',
  'Kalwaria Zebrzydowska',
  'Wadowice',
  'Niepołomice',
  'Wieliczka',
  'Białobrzegi',
  'Wyśmierzyce',
  'Ciechanów',
  'Glinojeck',
  'Garwolin',
  'Łaskarzew',
  'Maciejowice',
  'Pilawa',
  'Żelechów',
  'Gostynin',
  'Sanniki',
  'Grodzisk Mazowiecki',
  'Milanówek',
  'Podkowa Leśna',
  'Grójec',
  'Mogielnica',
  'Nowe Miasto nad Pilicą',
  'Warka',
  'Głowaczów',
  'Kozienice',
  'Magnuszew',
  'Legionowo',
  'Serock',
  'Ciepielów',
  'Lipsko',
  'Sienno',
  'Solec nad Wisłą',
  'Łosice',
  'Maków Mazowiecki',
  'Różan',
  'Cegłów',
  'Dobre',
  'Halinów',
  'Kałuszyn',
  'Latowicz',
  'Mińsk Mazowiecki',
  'Mrozy',
  'Siennica',
  'Sulejówek',
  'Mława',
  'Nasielsk',
  'Nowy Dwór Mazowiecki',
  'Zakroczym',
  'Myszyniec',
  'Ostrołęka',
  'Brok',
  'Ostrów Mazowiecka',
  'Józefów',
  'Karczew',
  'Osieck',
  'Otwock',
  'Góra Kalwaria',
  'Konstancin-Jeziorna',
  'Piaseczno',
  'Tarczyn',
  'Płock',
  'Bodzanów',
  'Drobin',
  'Gąbin',
  'Wyszogród',
  'Czerwińsk nad Wisłą',
  'Nowe Miasto',
  'Płońsk',
  'Raciąż',
  'Sochocin',
  'Brwinów',
  'Piastów',
  'Pruszków',
  'Chorzele',
  'Przasnysz',
  'Gielniów',
  'Odrzywół',
  'Przysucha',
  'Pułtusk',
  'Radom',
  'Iłża',
  'Jedlnia-Letnisko',
  'Pionki',
  'Przytyk',
  'Skaryszew',
  'Siedlce',
  'Mordy',
  'Sierpc',
  'Sochaczew',
  'Kosów Lacki',
  'Sokołów Podlaski',
  'Jastrząb',
  'Szydłowiec',
  'Warszawa',
  'Błonie',
  'Łomianki',
  'Ożarów Mazowiecki',
  'Łochów',
  'Węgrów',
  'Jadów',
  'Kobyłka',
  'Marki',
  'Radzymin',
  'Tłuszcz',
  'Wołomin',
  'Ząbki',
  'Zielonka',
  'Wyszków',
  'Zwoleń',
  'Bieżuń',
  'Lubowidz',
  'Żuromin',
  'Mszczonów',
  'Wiskitki',
  'Żyrardów',
  'Brzeg',
  'Grodków',
  'Lewin Brzeski',
  'Baborów',
  'Głubczyce',
  'Kietrz',
  'Kędzierzyn-Koźle',
  'Byczyna',
  'Kluczbork',
  'Wołczyn',
  'Gogolin',
  'Krapkowice',
  'Strzeleczki',
  'Zdzieszowice',
  'Namysłów',
  'Głuchołazy',
  'Korfantów',
  'Nysa',
  'Otmuchów',
  'Paczków',
  'Dobrodzień',
  'Gorzów Śląski',
  'Olesno',
  'Praszka',
  'Opole',
  'Niemodlin',
  'Ozimek',
  'Prószków',
  'Tułowice',
  'Biała',
  'Głogówek',
  'Prudnik',
  'Kolonowskie',
  'Leśnica',
  'Strzelce Opolskie',
  'Ujazd',
  'Zawadzkie',
  'Ustrzyki Dolne',
  'Brzozów',
  'Brzostek',
  'Dębica',
  'Pilzno',
  'Jarosław',
  'Pruchnik',
  'Radymno',
  'Jasło',
  'Kołaczyce',
  'Kolbuszowa',
  'Krosno',
  'Dukla',
  'Iwonicz-Zdrój',
  'Jedlicze',
  'Rymanów',
  'Lesko',
  'Leżajsk',
  'Nowa Sarzyna',
  'Cieszanów',
  'Lubaczów',
  'Narol',
  'Oleszyce',
  'Łańcut',
  'Mielec',
  'Przecław',
  'Radomyśl Wielki',
  'Nisko',
  'Rudnik nad Sanem',
  'Ulanów',
  'Bircza',
  'Dubiecko',
  'Przemyśl',
  'Jawornik Polski',
  'Kańczuga',
  'Przeworsk',
  'Sieniawa',
  'Ropczyce',
  'Sędziszów Małopolski',
  'Błażowa',
  'Boguchwała',
  'Dynów',
  'Głogów Małopolski',
  'Sokołów Małopolski',
  'Tyczyn',
  'Rzeszów',
  'Sanok',
  'Zagórz',
  'Stalowa Wola',
  'Zaklików',
  'Strzyżów',
  'Tarnobrzeg',
  'Baranów Sandomierski',
  'Nowa Dęba',
  'Augustów',
  'Lipsk',
  'Choroszcz',
  'Czarna Białostocka',
  'Łapy',
  'Michałowo',
  'Supraśl',
  'Suraż',
  'Tykocin',
  'Wasilków',
  'Zabłudów',
  'Białystok',
  'Bielsk Podlaski',
  'Brańsk',
  'Grajewo',
  'Rajgród',
  'Szczuczyn',
  'Hajnówka',
  'Kleszczele',
  'Kolno',
  'Stawiski',
  'Łomża',
  'Jedwabne',
  'Nowogród',
  'Goniądz',
  'Knyszyn',
  'Mońki',
  'Sejny',
  'Drohiczyn',
  'Siemiatycze',
  'Dąbrowa Białostocka',
  'Krynki',
  'Sokółka',
  'Suchowola',
  'Suwałki',
  'Ciechanowiec',
  'Czyżew',
  'Szepietowo',
  'Wysokie Mazowieckie',
  'Zambrów',
  'Bytów',
  'Miastko',
  'Brusy',
  'Chojnice',
  'Czersk',
  'Czarne',
  'Człuchów',
  'Debrzno',
  'Gdańsk',
  'Pruszcz Gdański',
  'Gdynia',
  'Kartuzy',
  'Żukowo',
  'Kościerzyna',
  'Kwidzyn',
  'Prabuty',
  'Lębork',
  'Łeba',
  'Malbork',
  'Nowy Staw',
  'Krynica Morska',
  'Nowy Dwór Gdański',
  'Hel',
  'Jastarnia',
  'Puck',
  'Władysławowo',
  'Słupsk',
  'Kępice',
  'Ustka',
  'Sopot',
  'Czarna Woda',
  'Skarszewy',
  'Skórcz',
  'Starogard Gdański',
  'Dzierzgoń',
  'Sztum',
  'Gniew',
  'Pelplin',
  'Tczew',
  'Reda',
  'Rumia',
  'Wejherowo',
  'Będzin',
  'Czeladź',
  'Siewierz',
  'Sławków',
  'Wojkowice',
  'Czechowice-Dziedzice',
  'Szczyrk',
  'Wilamowice',
  'Bielsko-Biała',
  'Bieruń',
  'Imielin',
  'Lędziny',
  'Bytom',
  'Chorzów',
  'Cieszyn',
  'Skoczów',
  'Strumień',
  'Ustroń',
  'Wisła',
  'Częstochowa',
  'Blachownia',
  'Koniecpol',
  'Olsztyn',
  'Przyrów',
  'Dąbrowa Górnicza',
  'Gliwice',
  'Knurów',
  'Pyskowice',
  'Sośnicowice',
  'Toszek',
  'Jastrzębie-Zdrój',
  'Jaworzno',
  'Katowice',
  'Kłobuck',
  'Krzepice',
  'Lubliniec',
  'Woźniki',
  'Łaziska Górne',
  'Mikołów',
  'Orzesze',
  'Mysłowice',
  'Koziegłowy',
  'Myszków',
  'Żarki',
  'Piekary Śląskie',
  'Pszczyna',
  'Krzanowice',
  'Kuźnia Raciborska',
  'Racibórz',
  'Ruda Śląska',
  'Czerwionka-Leszczyny',
  'Rybnik',
  'Siemianowice Śląskie',
  'Sosnowiec',
  'Świętochłowice',
  'Kalety',
  'Miasteczko Śląskie',
  'Radzionków',
  'Tarnowskie Góry',
  'Tychy',
  'Pszów',
  'Radlin',
  'Rydułtowy',
  'Wodzisław Śląski',
  'Zabrze',
  'Łazy',
  'Ogrodzieniec',
  'Pilica',
  'Poręba',
  'Szczekociny',
  'Włodowice',
  'Zawiercie',
  'Żory',
  'Żywiec',
  'Busko-Zdrój',
  'Nowy Korczyn',
  'Pacanów',
  'Stopnica',
  'Wiślica',
  'Jędrzejów',
  'Małogoszcz',
  'Sędziszów',
  'Wodzisław',
  'Kazimierza Wielka',
  'Opatowiec',
  'Skalbmierz',
  'Kielce',
  'Bodzentyn',
  'Chęciny',
  'Chmielnik',
  'Daleszyce',
  'Łagów',
  'Łopuszno',
  'Morawica',
  'Nowa Słupia',
  'Piekoszów',
  'Pierzchnica',
  'Gowarczów',
  'Końskie',
  'Radoszyce',
  'Stąporków',
  'Iwaniska',
  'Opatów',
  'Ożarów',
  'Ćmielów',
  'Kunów',
  'Ostrowiec Świętokrzyski',
  'Działoszyce',
  'Pińczów',
  'Klimontów',
  'Koprzywnica',
  'Sandomierz',
  'Zawichost',
  'Skarżysko-Kamienna',
  'Suchedniów',
  'Starachowice',
  'Wąchock',
  'Bogoria',
  'Oleśnica',
  'Osiek',
  'Połaniec',
  'Staszów',
  'Szydłów',
  'Włoszczowa',
  'Bartoszyce',
  'Bisztynek',
  'Górowo Iławeckie',
  'Sępopol',
  'Braniewo',
  'Frombork',
  'Pieniężno',
  'Działdowo',
  'Lidzbark',
  'Elbląg',
  'Młynary',
  'Pasłęk',
  'Tolkmicko',
  'Ełk',
  'Giżycko',
  'Ryn',
  'Gołdap',
  'Iława',
  'Kisielice',
  'Lubawa',
  'Susz',
  'Zalewo',
  'Kętrzyn',
  'Korsze',
  'Reszel',
  'Lidzbark Warmiński',
  'Orneta',
  'Mikołajki',
  'Mrągowo',
  'Nidzica',
  'Nowe Miasto Lubawskie',
  'Olecko',
  'Olsztyn',
  'Barczewo',
  'Biskupiec',
  'Dobre Miasto',
  'Jeziorany',
  'Olsztynek',
  'Miłakowo',
  'Miłomłyn',
  'Morąg',
  'Ostróda',
  'Biała Piska',
  'Orzysz',
  'Pisz',
  'Ruciane-Nida',
  'Pasym',
  'Szczytno',
  'Wielbark',
  'Węgorzewo',
  'Budzyń',
  'Chodzież',
  'Margonin',
  'Szamocin',
  'Czarnków',
  'Krzyż Wielkopolski',
  'Trzcianka',
  'Wieleń',
  'Czerniejewo',
  'Gniezno',
  'Kłecko',
  'Trzemeszno',
  'Witkowo',
  'Borek Wielkopolski',
  'Gostyń',
  'Krobia',
  'Pogorzela',
  'Poniec',
  'Grodzisk Wielkopolski',
  'Rakoniewice',
  'Wielichowo',
  'Jaraczewo',
  'Jarocin',
  'Żerków',
  'Koźminek',
  'Opatówek',
  'Stawiszyn',
  'Kalisz',
  'Kępno',
  'Rychtal',
  'Dąbie',
  'Kłodawa',
  'Koło',
  'Przedecz',
  'Konin',
  'Golina',
  'Kleczew',
  'Rychwał',
  'Sompolno',
  'Ślesin',
  'Czempiń',
  'Kościan',
  'Krzywiń',
  'Śmigiel',
  'Kobylin',
  'Koźmin Wielkopolski',
  'Krotoszyn',
  'Sulmierzyce',
  'Zduny',
  'Osieczna',
  'Rydzyna',
  'Leszno',
  'Międzychód',
  'Sieraków',
  'Lwówek',
  'Nowy Tomyśl',
  'Opalenica',
  'Zbąszyń',
  'Oborniki',
  'Rogoźno',
  'Nowe Skalmierzyce',
  'Odolanów',
  'Ostrów Wielkopolski',
  'Raszków',
  'Grabów nad Prosną',
  'Mikstat',
  'Ostrzeszów',
  'Kaczory',
  'Łobżenica',
  'Miasteczko Krajeńskie',
  'Piła',
  'Ujście',
  'Wyrzysk',
  'Wysoka',
  'Chocz',
  'Dobrzyca',
  'Pleszew',
  'Poznań',
  'Buk',
  'Kostrzyn',
  'Kórnik',
  'Luboń',
  'Mosina',
  'Murowana Goślina',
  'Pobiedziska',
  'Puszczykowo',
  'Stęszew',
  'Swarzędz',
  'Bojanowo',
  'Jutrosin',
  'Miejska Górka',
  'Rawicz',
  'Słupca',
  'Zagórów',
  'Obrzycko',
  'Ostroróg',
  'Pniewy',
  'Szamotuły',
  'Wronki',
  'Środa Wielkopolska',
  'Dolsk',
  'Książ Wielkopolski',
  'Śrem',
  'Dobra',
  'Tuliszków',
  'Turek',
  'Gołańcz',
  'Mieścisko',
  'Skoki',
  'Wągrowiec',
  'Wolsztyn',
  'Miłosław',
  'Nekla',
  'Pyzdry',
  'Września',
  'Jastrowie',
  'Krajenka',
  'Okonek',
  'Złotów',
  'Białogard',
  'Karlino',
  'Tychowo',
  'Choszczno',
  'Drawno',
  'Pełczyce',
  'Recz',
  'Czaplinek',
  'Drawsko Pomorskie',
  'Kalisz Pomorski',
  'Złocieniec',
  'Goleniów',
  'Maszewo',
  'Nowogard',
  'Stepnica',
  'Gryfice',
  'Płoty',
  'Trzebiatów',
  'Cedynia',
  'Chojna',
  'Gryfino',
  'Mieszkowice',
  'Moryń',
  'Trzcińsko-Zdrój',
  'Dziwnów',
  'Golczewo',
  'Kamień Pomorski',
  'Międzyzdroje',
  'Wolin',
  'Gościno',
  'Kołobrzeg',
  'Koszalin',
  'Bobolice',
  'Mielno',
  'Polanów',
  'Sianów',
  'Dobra',
  'Łobez',
  'Resko',
  'Węgorzyno',
  'Barlinek',
  'Dębno',
  'Myślibórz',
  'Nowe Warpno',
  'Police',
  'Lipiany',
  'Pyrzyce',
  'Darłowo',
  'Sławno',
  'Chociwel',
  'Dobrzany',
  'Ińsko',
  'Stargard',
  'Suchań',
  'Szczecin',
  'Barwice',
  'Biały Bór',
  'Borne Sulinowo',
  'Szczecinek',
  'Połczyn-Zdrój',
  'Świdwin',
  'Świnoujście',
  'Człopa',
  'Mirosławiec',
  'Tuczno',
  'Wałcz'
];

const CitySearch = () => {
  return (
    <div className="relative">
      <Input type="text" className="h-16 rounded-xl text-lg" />
      <Button
        size="citySearch"
        variant="citySearch"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
      >
        Szukaj
      </Button>
    </div>
  );
};

export default CitySearch;
