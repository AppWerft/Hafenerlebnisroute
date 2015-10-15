<?
if ($_SERVER["HTTP_ACCEPT"] == 'application/json') {
	header('Content-Type: application/json');
	echo file_get_contents('./tides.json');
} else { 
	$start = time();$count =0; $tides =0;
	$ftp = ftp_connect('ftp-outgoing2.dwd.de', 21, 60);
	ftp_login($ftp, 'gds32025', 'cEtPCZbY');
	ftp_chdir ($ftp, 'gds');
	ftp_chdir ($ftp, 'specials');
	ftp_chdir ($ftp, 'radar');
	ftp_get($ftp,'images/radar.gif','Radarfilm_WEB_DL.gif', FTP_BINARY);

	ftp_chdir ($ftp, 'northwest');
	$imagelist = ftp_nlist($ftp , './'); 
	for ($i=0;$i<count($imagelist);$i++) {
	//	ftp_get($ftp,'images/' . $imagelist[$i],$imagelist[$i], FTP_BINARY);
	}
	ftp_close($ftp);
	if ($_GET['daily']) {
		$data = json_decode(file_get_contents('./data.json'));
		$tides = array();
		$weathers = array();
		for ($i=0;$i<count($data);$i++) {
			// @Weather
			$url= 'http://api.worldweatheronline.com/free/v1/marine.ashx?q=' .$data[$i]->loc . '&format=json&key=c2h262ekm6a4nrkc448s2zme';
			$jsonpage = file_get_contents($url);
			$weathers[$data[$i]->id] = json_decode($jsonpage)->data->weather[0]->hourly;
			//@Tides: 
			@$tides[$i] = new stdClass();
		//	$tides[$i]->title = $data[$i]->title;
			$tides[$i]->id = $data[$i]->id;
		//	$tides[$i]->loc = $data[$i]->loc;
			$tides[$i]->val = array();
			$id = $data[$i]->id;
			$url= 'http://mobile.bsh.de/cgi-bin/gezeiten/was_mobil.pl?ort=' . $id . '&zone=Gesetzliche+Zeit&niveau=KN';
			$page = preg_replace('/\n/','',file_get_contents($url));
			$withlevel = (preg_match('#keine Wasserstandsangaben#m',$page))? false : true;
			preg_match('#<table .*?>(.*?)</table>#mi',$page,$m);
			if (!$m) {
				continue;
			}
			$count++;
			$line = preg_replace('#<td.*?>#','|',$m[1]);
			$line= preg_replace('#<tr>#','',$line);
			$line= preg_replace('#</tr>#','',$line);
			$line= preg_replace('#</td>#','',$line);
			$line= preg_replace('# #','',$line);
			$line= preg_replace('#&nbsp;m#','',$line);
			$line= preg_replace('#\|\|#','|',$line);
			$parts = explode('|',$line);
			array_shift($parts);
			for ($p=0;$p<count($parts);$p++) {
				if ($withlevel) {
					$ndx = floor($p/5);
					$tides++;
					if (@!$tides[$i]->val[$ndx]) $tides[$i]->val[$ndx] = new stdClass();
			
					if ($p%5=='1') list($day,$mon) = explode('.',$parts[$p]);
					if ($p%5=='2') $tides[$i]->val[$ndx]->ty = $parts[$p]; 
					if ($p%5=='3') {
						list($hour,$min) = explode(':',$parts[$p]);
						$tides[$i]->val[$ndx]->ts = mktime($hour,$min,0,$mon,$day,date("Y"));
					}
					if ($p%5=='4') $tides[$i]->val[$ndx]->m = $parts[$p]; 
		
				} else {
					$ndx = floor($p/4);
					if (@!$tides[$i]->val[$ndx]) 
						$tides[$i]->val[$ndx] = new stdClass();
				
					if ($p%4=='1') list($day,$mon) = explode('.',$parts[$p]);
					if ($p%4=='2') $tides[$i]->val[$ndx]->ty = $parts[$p]; 
					if ($p%4=='3') {
						list($hour,$min) = explode(':',$parts[$p]);
						$tides[$i]->val[$ndx]->ts = mktime($hour,$min,0,$mon,$day,date("Y"));
					}		} 
			}
		
		
		}
		header('Content-Type: application/json');
		file_put_contents('./tides.json',json_encode($tides));
		file_put_contents('./weather.json',json_encode($weathers));
		$end = time();
		$laufzeit = $end-$start;
		echo $laufzeit." sec.\n";echo "Count: $count\nTides: $tides";
	}
	//echo file_get_contents('./tides.json');
}