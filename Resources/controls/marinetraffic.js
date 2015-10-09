module.exports = function(_callback) {
    function getCookie(_callback) {
        var xhr = Ti.Network.createHTTPClient({});
        xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:15.0) Gecko/20100101 Firefox/15.0.1');
        xhr.setRequestHeader('Referer', 'http://www.marinetraffic.com/');
        xhr.open('GET','http://www.marinetraffic.com/ais/');
        xhr.onload = function() {
            Ti.API.log(this);
            _callback(this.getResponseHeader("set-cookie"));
        };
        xhr.send();
    }
    getCookie(function(cookie) {
        Ti.API.log(cookie);
    });
    var TIMEOUT = 100;
    var d = new Date();
    var now = parseInt(d.getTime() / 1000, 10);
    Ti.API.log('NOW: ' + now);
    var DEFAULT = '[[53.55059,9.815207,"ALTONA",6,103,129,"DE",211437160,26,0],[53.54492,9.844747,"PETER",3,280,0,"DE",211436040,24,2],[53.53977,9.852652,"SCHLAFMUETZE",9,0,0,"DE",211541050,10,1],[53.54192,9.856648,"XXS",9,206,0,"DE",211488040,12,4],[53.54167,9.86335,"TOLLERORT",6,38,2,"DE",211430730,30,2],[53.54042,9.86697,"EILTANK 2",8,123,0,"DE",211202310,80,0],[53.53817,9.869333,"DAGMAR",8,353,1,"DE",211305290,50,1],[53.53777,9.869757,"STOERTEBECKER",4,0,0,"DE",211188220,32,2],[53.53721,9.876431,"WASSERBOOT",3,225,0,"DE",211265900,20,1],[53.53623,9.87936,"HARBURG",6,244,0,"DE",211472760,30,0],[53.53593,9.879606,"HELGOLAND EXPRESS",9,125,0,"DE",211442660,13,1],[53.53504,9.880823,"OORTKATEN",6,251,0,"DE",211462080,29,1],[53.53932,9.881019,"LOTSE 2",3,219,0,"DE",211318600,23,2],[53.5395,9.881059,"LOTSE 3",9,0,0,"DE",211436370,15,2],[53.53274,9.883692,"LANDRATH KUSTER",9,0,0,"DE",211352790,21,3],[53.54276,9.88521,"ST PAULI",6,270,96,"DE",211257820,30,2],[53.52539,9.887832,"CASCADE",8,0,0,"DE",211163700,100,0],[53.52308,9.889143,"ANNEMARIE",7,0,0,"DE",218784000,68,3],[53.51978,9.889334,"AKKE",3,0,0,"DE",211233270,46,2],[53.52399,9.889365,"KRANTOR",7,0,0,"DE",211438130,85,2],[53.52471,9.889482,"DETTMER SCHUB 125",8,0,0,"DE",211437690,16,2],[53.52391,9.889557,"NORDLAND 7",7,301,0,"DE",211207080,85,2],[53.52593,9.88963,"BERLINGERODE",8,230,0,"CH",269057227,86,1],[53.51927,9.890233,"HEINRICH",7,275,0,"DE",211470690,85,1],[53.52552,9.89246,"CITY OF HAMBURG",7,0,0,"LR",636012923,88,0],[53.57232,9.893162,"THEO FISCHER",3,184,1,"DE",211235220,23,5],[53.53629,9.895068,"BCF GLUECKAUF",7,125,0,"DE",211497790,100,0],[53.53631,9.89655,"PRIMERO",9,321,0,"NL",244730712,85,2],[53.52133,9.897833,"TARANG",7,93,0,"LR",636010408,225,2],[53.53367,9.904834,"DORNBUSCH",7,0,0,"DE",211234480,101,0],[53.55523,9.907634,"LABOR 3",6,0,0,"DE",211207760,125,1],[53.55695,9.908073,"SAM TEST",7,0,0,"DE",211001940,317,1],[53.53982,9.909014,"SANTA CLARA",7,271,0,"DE",218432000,300,0],[53.53747,9.909615,"ALEXANDER B",7,1,0,"AG",305654000,153,2],[53.54278,9.91141,"FAIRPLAY X",3,267,65,"DE",218272000,25,2],[53.54367,9.91322,"OTTENSTREUER",0,0,0,"DE",211444330,20,3],[53.54367,9.913877,"MOEWE",9,289,0,"DE",211359100,19,1],[53.53967,9.913967,"HANSE CONFIDENCE",7,0,0,"AG",304695000,140,1],[53.54344,9.91424,"REEPERBAHN",6,53,4,"DE",211316150,30,1],[53.54361,9.915615,"WOLTMAN",0,100,0,"DE",211425130,22,0],[53.53106,9.917377,"CMA CGM THALASSA",7,305,0,"CY",212151000,347,5],[53.53973,9.917784,"HS SCHUBERT",7,307,1,"LR",636091705,177,0],[53.5286,9.918339,"ALULA",7,304,0,"MT",256884000,366,1],[53.54305,9.919278,"SD RANGER",3,214,0,"MT",229096000,28,1],[53.54305,9.919724,"RT ZOE",3,341,1,"MT",215942000,28,0],[53.543,9.920667,"WILHELMINE",3,36,1,"DE",211442010,24,1],[53.543,9.922167,"BUGSIER 10",3,248,1,"DE",218321000,33,0],[53.5431,9.923407,"EXACT",3,247,0,"MT",256920000,32,2],[53.52868,9.92369,"JAKARTA EXPRESS",7,267,0,"HK",477105300,260,2],[53.54276,9.923735,"BUGSIER 5",3,252,39,"DE",218393000,28,0],[53.52569,9.925161,"GRETE MAERSK",7,304,0,"DK",220397000,367,2],[53.52742,9.926333,"JORK",7,0,0,"CY",209715000,136,1],[53.5256,9.927854,"SEEVE",8,295,0,"DE",211177960,50,1],[53.52349,9.929075,"MOORING TUG 3",9,223,0,"DE",211527970,11,0],[53.51348,9.933,"NIEDERSACHSEN 21",0,0,0,"DE",211513120,100,2],[53.51756,9.934756,"JANIS",7,318,0,"RU",273435220,114,0],[53.50849,9.937023,"HERM",7,249,1,"AG",304707000,135,2],[53.50592,9.937484,"HYUNDAI BRAVE",7,30,1,"PA",371219000,339,0],[53.50319,9.937655,"NAVI BALTIC",7,321,0,"CY",212706000,168,2],[53.49935,9.938258,"APL QINGDAO",7,324,0,"SG",566408000,349,1],[53.54276,9.939504,"OEVELGOENNE",6,270,119,"DE",211151080,30,1],[53.51858,9.94385,"GL XIUSHAN",7,309,1,"HK",477802600,240,2],[53.50971,9.948715,"PRITZ ERBE",7,185,1,"DE",211468860,80,1],[53.503,9.949166,"EKFORS",8,342,0,"NO",259721000,135,1],[53.52712,9.954237,"HHLA 3",0,0,0,"DE",211339980,50,1],[53.52335,9.9546,"WARNOW VAQUITA",7,360,1021,"AG",305360000,166,1],[53.5105,9.954917,"STOLT PELICAN",8,272,0,"UK",235083501,100,1],[53.53999,9.955089,"FRANKFURT EXPRESS",7,3,0,"DE",218364000,335,1],[53.5445,9.95531,"ELBMEILE",6,5,0,"DE",211437290,30,2],[53.47547,9.955595,"DETTMER TANK 136",0,187,0,"DE",211177620,100,2],[53.47719,9.955731,"FRANK BURMESTER",8,10,0,"LU",253242367,80,0],[53.52537,9.955978,"MIRA",7,0,0,"DE",211440970,80,1],[53.54483,9.95598,"HAFENCITY",6,292,0,"DE",211437270,30,0],[53.48989,9.95649,"TANJA DEYMANN 2",8,314,0,"DE",211514420,81,2],[53.5046,9.956491,"FLEX KESTON",7,201,0,"AG",305188000,95,2],[53.47622,9.956573,"DETTMER TANK 179",8,0,0,"DE",211214670,100,1],[53.48995,9.95669,"TANJA DEYMANN",8,0,0,"DE",211514430,85,2],[53.54506,9.95744,"WOLFGANG BORCHERT",6,95,0,"DE",211437330,28,1],[53.478,9.957751,"NOSI",8,21,0,"MT",248327000,109,2],[53.54511,9.958002,"FINKENWERDER",6,234,0,"DE",211437300,25,2],[53.53133,9.958426,"MAERSK BARRY",8,23,0,"DK",219127000,175,0],[53.54518,9.958625,"RAFIKI",6,299,0,"DE",211437310,25,0],[53.48031,9.95943,"BITUMINA1",8,0,0,"DE",211179660,80,1],[53.53213,9.960223,"CELTIC EXPLORER",9,339,1,"IE",250487000,65,1],[53.53363,9.961516,"HELGALAND",7,126,0,"UK",235695000,136,1],[53.54535,9.96177,"MOORING TUG 1",9,279,1,"DE",211527950,11,5],[53.53138,9.96221,"DETTMER TANK 83",8,0,0,"DE",211177720,80,2],[53.5439,9.962347,"ALTENWERDER",6,90,118,"DE",211263850,30,0],[53.52958,9.962633,"LIVERPOOL EXPRESS",7,0,0,"DE",218025000,281,0],[53.54533,9.962833,"BUGSIER 18",3,263,0,"DE",211247120,28,2],[53.52629,9.963576,"CERES",7,322,0,"AG",305531000,141,2],[53.47362,9.963578,"PIZ SIDLEY",8,328,0,"DE",211546440,67,1],[53.50332,9.96392,"ARIME",7,0,0,"DE",211169440,80,2],[53.54555,9.96393,"ANGELIKA",6,298,0,"DE",211511950,18,1],[53.50513,9.964084,"ELOISE",8,349,0,"NL",244670102,86,2],[53.5424,9.964233,"KATJA",8,193,1,"BS",309313000,232,1],[53.54553,9.965352,"ST.PAULI",6,335,0,"DE",211539800,18,3],[53.52605,9.9657,"MISTRAL",3,276,0,"DE",211366340,34,0],[53.5169,9.965874,"KARL HEINZ",9,0,0,"DE",211555020,23,2],[53.5338,9.966284,"TMS ANTONIA",8,222,1,"DE",211471880,100,2],[53.51822,9.966615,"SALMO",9,11,13,"DE",211518370,14,0],[53.54536,9.968371,"ANDREA G",6,42,0,"DE",211543820,16,1],[53.54534,9.968694,"T0KY0",6,46,0,"DE",211540080,17,1],[53.47985,9.96874,"DETTMERTANK 87",8,127,84,"DE",211509250,80,1],[53.54352,9.96976,"ZP CHALONE",3,132,76,"NL",244690362,29,2],[53.54522,9.969849,"JETTE ABICHT",6,0,0,"DE",211512370,18,7],[53.54508,9.971335,"211512400",0,81,1,"--",211512400,,2],[53.54497,9.971577,"TRAUTE ABICHT",6,155,0,"DE",211512270,18,1],[53.52379,9.971985,"CLASSIC QUEEN",9,165,0,"DE",211523800,53,1],[53.54246,9.97301,"ZP CONDON",3,120,58,"NL",244690361,29,2],[53.54087,9.974073,"HARMONIE",6,356,0,"DE",211437470,30,0],[53.54451,9.97411,"HALUNDER JET",4,303,0,"DE",211392200,51,1],[53.542,9.974167,"GRANDE AMBURGO",7,120,60,"IT",247098900,214,0],[53.53331,9.974513,"ALPINE SB1",3,263,0,"DE",211553960,57,1],[53.47257,9.97465,"FAUSTINA",7,337,0,"VC",377493000,82,1],[53.51667,9.97477,"AFRIKAHOEFT WS22",9,66,0,"DE",211315860,19,1],[53.54428,9.974983,"TMS 4",8,86,0,"DE",211555980,32,1],[53.47449,9.97572,"ALASCO",7,0,0,"DE",211177390,100,5],[53.54408,9.975725,"KARIN",3,297,0,"DE",211557750,18,1],[53.54319,9.976171,"CAP SAN DIEGO",7,272,1,"DE",211855000,160,0],[53.47333,9.976182,"EMDEN",7,0,0,"DE",211502813,85,2],[53.49879,9.976545,"GESTE",7,0,0,"DE",211505960,88,2],[53.53987,9.97687,"SCHAARHOERN",6,183,0,"DE",211227410,42,0],[53.54274,9.977235,"BALLINSTADT",6,68,0,"DE",211532590,17,4],[53.53865,9.9781,"ALSTER",3,155,0,"DE",211211450,84,1],[53.54337,9.97814,"ANITA EHLERS",6,308,0,"DE",211542050,20,18],[53.54219,9.97815,"HANSE EXPLORER",9,0,0,"AG",304977000,48,2],[53.54245,9.978853,"HAMMONIA",6,0,0,"DE",211512510,43,2],[53.52427,9.979375,"WOHLENRODE",8,176,0,"DE",211546580,62,1],[53.54268,9.979428,"HAMBURG",6,0,0,"DE",211512520,56,2],[53.54296,9.97985,"MARE FRISIUM",9,345,1,"NL",244596000,50,3],[53.54243,9.980311,"LOUISIANA STAR",6,0,0,"DE",211512320,56,1],[53.54235,9.981775,"GROSSER MICHEL",6,215,0,"DE",211499480,30,1],[53.48386,9.982157,"WESER",7,0,0,"DE",211508280,82,0],[53.49306,9.98225,"KARINA W",7,320,0,"DE",218439000,74,1],[53.54305,9.98231,"BRANDDIREKTOR KRUEGR",9,185,1,"DE",211242880,25,2],[53.48604,9.98321,"NORDLAND IV",7,71,0,"DE",211215280,85,2],[53.47441,9.983378,"LOESCHBOOT REPSOLD",9,191,1,"DE",211242870,29,2],[53.54199,9.983378,"BORKUM",8,261,0,"DE",211149890,39,1],[53.48466,9.9835,"JEANNY",7,149,0,"NL",244719000,67,1],[53.47026,9.983809,"OTTO STOCKHAUSEN",3,204,0,"DE",211559990,17,5],[53.52809,9.9843,"CARL W",8,307,0,"DE",211178650,38,1],[53.54164,9.984319,"WASSERBOOT 1",8,249,0,"DE",211544210,25,1],[53.53402,9.98506,"SHUYA",7,278,1,"RU",273417060,96,3],[53.53558,9.985887,"HYUNDAI ULSAN",7,304,0,"MH",538004217,193,0],[53.46728,9.987502,"STEINAU",7,191,1,"DE",211469530,0,0],[53.47362,9.988042,"WS 27",9,330,0,"DE",211234440,14,0],[53.53202,9.98815,"WILSON NANJING",7,20,0,"MT",215061000,123,2],[53.47117,9.988163,"HEINRICH 2",8,89,0,"DE",211515230,43,1],[53.53382,9.988457,"DAN VIKING",7,264,0,"DK",220439000,79,2],[53.46686,9.988568,"WERRA",7,0,0,"DE",211505940,94,1],[53.47105,9.988725,"HEINRICH",8,86,0,"DE",211514890,20,0],[53.46778,9.98924,"AJUG II",7,191,1,"DE",211468890,87,1],[53.5423,9.989358,"FAIRPLAY VIII",9,83,0,"DE",211286160,25,0],[53.54235,9.991167,"RUDOLF DIESEL",9,58,0,"DE",211100470,28,0],[53.47173,9.99234,"BIGFOOT",9,0,0,"DE",211518910,12,8],[53.52564,10.00327,"HAFENKAPITAEN",9,89,0,"DE",211559130,20,0],[53.53521,10.00575,"ELA S",0,225,0,"DM",325493000,82,2],[53.47339,10.00808,"NAWA 9",7,0,0,"PO",261182649,80,1],[53.53538,10.01101,"MISTRAL",7,0,0,"AG",305880000,135,1],[53.53571,10.01131,"JOHANNA SCHEPERS",7,277,0,"AG",305817000,141,1],[53.47386,10.01181,"LENA",4,351,0,"DE",211499520,85,0],[53.53533,10.01253,"ELBDEICH",7,283,0,"AG",304974000,127,2],[53.53533,10.014,"ELECTRON",7,151,0,"NL",244265000,118,0],[53.53465,10.02221,"WEGA",3,204,1,"DE",211205970,52,2],[53.52498,10.03491,"SCHUBSCHIFF 2707",7,0,0,"DE",211518760,24,0],[53.52469,10.03568,"SCHUB 2407",7,0,0,"DE",211518770,16,2],[53.54224,10.03689,"GLUECK AUF",7,347,0,"DE",211507830,80,7],[53.52877,10.04074,"DETTMER TANK 52",8,0,0,"DE",211168250,86,1],[53.5297,10.05243,"ALY-D",7,0,0,"NL",244660739,56,1],[53.52935,10.05544,"PLANETEN TOR",7,189,1,"DE",211473410,85,2],[53.52937,10.0556,"MICANTO",7,294,0,"NL",244660856,80,2],[53.52887,10.05775,"BEATRICE",7,50,0,"CZ",270263000,80,2],[53.45368,10.08193,"MINTAKA",7,312,77,"NL",244710594,67,1],[53.44761,10.09446,"WALTERSHOF",6,97,0,"DE",211437320,30,1]]';
    var url = 'http://www.marinetraffic.com/ais/getjson.aspx?sw_x=9.6&sw_y=53.4&ne_x=10.2&ne_y=53.800000000000004&zoom=12&fleet=&station=0&id=null&_=' + Math.random();
    var xhr = Ti.Network.createHTTPClient({});
    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:15.0) Gecko/20100101 Firefox/15.0.1');
    xhr.setRequestHeader('Referer', 'http://www.marinetraffic.com/ais/');
//    xhr.setRequestHeader('Cookie',"");
    Ti.API.log('Start vesselretrieving =========> test of timeout:');
   
    if (Ti.App.Properties.hasProperty('timestamp')) {
        Ti.API.debug('old timestamp found. ' + Ti.App.Properties.getInt('timestamp'));
    } else {
        Ti.API.debug('no timestamp found');
    }
    if (Ti.App.Properties.hasProperty('timestamp') && Ti.App.Properties.getInt('timestamp') > now - TIMEOUT) {
        if (Ti.App.Properties.hasProperty('vesseldatajsonstring')) {
            vessels = JSON.parse(Ti.App.Properties.getString('vesseldatajsonstring'));
            Ti.API.log('GOT '  + ' vessels from storage');
            if ( typeof (_callback) == 'function')
                _callback(vessels);
        }
        Ti.API.log('Request to shorttimed');
        return false;
    }
   
    xhr.open('GET', url);
    Ti.API.log('No vesselTimeout =========> go into net to');
    Ti.API.log(url);
    xhr.onload = function() {
        var data = this.responseText;
        var cookie = this.getResponseHeader("set-cookie");
 
        console.log('RESPONSE FROM SERVER:');
        console.log(data);
        try {
            var vesseldatajsonstring = eval("(" + data + ")");
            var vessels = [];
            var length = vesseldatajsonstring.length;
            if (length == 0) {
                if (Ti.App.Properties.hasProperty('vesseldatajsonstring')) {
                    vessels = JSON.parse(Ti.App.Properties.getString('vesseldatajsonstring'));
                    if ( typeof (_callback) == 'function')
                        _callback(vessels);
                    return;
                } else {
                    Ti.API.log('Storage is empty');
                    if ( typeof (_callback) == 'function')
                        vesseldatajsonstring = eval("(" + DEFAULT + ")");
                        length = vesseldatajsonstring.length;
                }
            }
            for (var i = 0; i < length; i++) {
                var v = vesseldatajsonstring[i];
                vessels.push({
                    lat : v[0],
                    lon : v[1],
                    name : v[2],
                    typeofship : v[3],
                    orientation : v[4],
                    speedoverground : v[5] / 10,
                    flag_css : v[6].toLowerCase(),
                    mmsi : v[7],
                    is_moored : (v[5] == 0) ? true : false
                });
            }
            Ti.App.Properties.setString('vesseldatajsonstring', JSON.stringify(vessels));
            Ti.App.Properties.setInt('timestamp', now);
            Ti.API.log('SAVE ' + length + ' vessels');
            if ( typeof (_callback) == 'function') {
                _callback(vessels);
            }
        } catch(E) {
            Ti.API.log(E);
        }
    };
    xhr.send();
   
};