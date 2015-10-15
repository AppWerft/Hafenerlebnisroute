var DEFAULT_PRECISION=12,BITS=[16,8,4,2,1],BASE32_CHARS=["0","1","2","3","4","5","6","7","8","9","b","c","d","e","f","g","h","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"],BASE32_DECODE_MAP={};for(i=0;i<BASE32_CHARS.length;i++)BASE32_DECODE_MAP[BASE32_CHARS[i]]=i;!function(e){function t(t,i,n){for(var a=[],r=0;r<n.length;r++)for(var o=n[r],l=e.subHashes(o),d=0;d<l.length;d++){var s=l[d],u=e.decode_bbox(s),g=e.polygonContains(t,u[0],u[2]),h=e.polygonContains(t,u[0],u[3]),p=e.polygonContains(t,u[1],u[2]),c=e.polygonContains(t,u[1],u[3]);if(g&&h&&p&&c)i.push(s);else if(g||h||p||c)a.push(s);else for(var m=t[0],f=1;f<t.length;f++){var b=t[f];if(e.linesCross(u[0],u[2],u[0],u[3],m[0],m[1],b[0],b[1])){a.push(s);break}if(e.linesCross(u[0],u[3],u[1],u[3],m[0],m[1],b[0],b[1])){a.push(s);break}if(e.linesCross(u[1],u[3],u[1],u[2],m[0],m[1],b[0],b[1])){a.push(s);break}if(e.linesCross(u[1],u[2],u[0],u[2],m[0],m[1],b[0],b[1])){a.push(s);break}}}return a}function i(e,t,i){if(1>i||i>12)throw new Error("length must be between 1 and 12");for(var n=[-90,90],a=[-180,180],r="",o=!0,l=0,d=0;r.length<i;){var s=0;o?(s=(a[0]+a[1])/2,t>s?(d|=BITS[l],a[0]=s):a[1]=s):(s=(n[0]+n[1])/2,e>s?(d|=BITS[l],n[0]=s):n[1]=s),o=o?!1:!0,4>l?l++:(r+=BASE32_CHARS[d],l=0,d=0)}return[r.toString(),[n[0],n[1],a[0],a[1]]]}function n(e){return e/180*Math.PI}function a(e){var t=n(e);return Math.cos(t)*d/360}function r(e,t,i){return(t[0]-e[0])*(i[1]-e[1])-(t[1]-e[1])*(i[0]-e[0])>0}e.decode=function(e){for(var t=[-90,90],i=[-180,180],n=!0,a=0;a<e.length;a++)for(var r=BASE32_DECODE_MAP[e[a]],o=0;o<BITS.length;o++){var l=BITS[o];n?0!=(r&l)?i[0]=(i[0]+i[1])/2:i[1]=(i[0]+i[1])/2:0!=(r&l)?t[0]=(t[0]+t[1])/2:t[1]=(t[0]+t[1])/2,n=n?!1:!0}var d=(t[0]+t[1])/2,s=(i[0]+i[1])/2;return[d,s]},e.decode_bbox=function(e){for(var t=[-90,90],i=[-180,180],n=!0,a=0;a<e.length;a++)for(var r=BASE32_DECODE_MAP[e[a]],o=0;o<BITS.length;o++){var l=BITS[o];n?0!=(r&l)?i[0]=(i[0]+i[1])/2:i[1]=(i[0]+i[1])/2:0!=(r&l)?t[0]=(t[0]+t[1])/2:t[1]=(t[0]+t[1])/2,n=n?!1:!0}(t[0]+t[1])/2,(i[0]+i[1])/2;return[t[0],t[1],i[0],i[1]]},e.encode=function(e,t,i){if(i||(i=DEFAULT_PRECISION),1>i||i>12)throw new Error("length must be between 1 and 12");for(var n=[-90,90],a=[-180,180],r="",o=!0,l=0,d=0;r.length<i;){var s=0;o?(s=(a[0]+a[1])/2,t>s?(d|=BITS[l],a[0]=s):a[1]=s):(s=(n[0]+n[1])/2,e>s?(d|=BITS[l],n[0]=s):n[1]=s),o=o?!1:!0,4>l?l++:(r+=BASE32_CHARS[d],l=0,d=0)}return r},e.north=function(t){var i=e.decode_bbox(t),n=i[1]-i[0],a=i[0]-n/2,r=(i[2]+i[3])/2;return e.encode(a,r,t.length)},e.south=function(t){var i=e.decode_bbox(t),n=i[1]-i[0],a=i[1]+n/2,r=(i[2]+i[3])/2;return e.encode(a,r,t.length)},e.west=function(t){var i=e.decode_bbox(t),n=i[3]-i[2],a=(i[0]+i[1])/2,r=i[2]-n/2;return-180>r&&(r=180-(r+180)),e.encode(a,r,t.length)},e.east=function(t){var i=e.decode_bbox(t),n=i[3]-i[2],a=(i[0]+i[1])/2,r=i[3]+n/2;return r>180&&(r=-180+(r-180)),e.encode(a,r,t.length)},e.geohashContains=function(t,i,n){return e.bboxContains(e.decode_bbox(t),i,n)},e.subHashes=function(e){for(var t=[],i=0;i<BASE32_CHARS.length;i++)t[i]=e+BASE32_CHARS[i];return t},e.subHashesN=function(e){var t=[],i=0;for(var n in BASE32_CHARS){var a=BASE32_CHARS[n];a>="0"&&"g">=a&&(t[i]=e+a,i++)}return t},e.subHashesS=function(e){var t=[],i=0;for(var n in BASE32_CHARS){var a=BASE32_CHARS[n];a>="h"&&"z">=a&&(t[i]=e+a,i++)}return t},e.subHashesNW=function(e){var t=[],i=0;for(var n in BASE32_CHARS){var a=BASE32_CHARS[n];a>="0"&&"7">=a&&(t[i]=e+a,i++)}return t},e.subHashesNE=function(e){var t=[],i=0;for(var n in BASE32_CHARS){var a=BASE32_CHARS[n];a>="8"&&"g">=a&&(t[i]=e+a,i++)}return t},e.subHashesSW=function(e){var t=[],i=0;for(var n in BASE32_CHARS){var a=BASE32_CHARS[n];a>="h"&&"r">=a&&(t[i]=e+a,i++)}return t},e.getGeoHashesForPolygon=function(i,n){if(2>n||n>=DEFAULT_PRECISION)throw new Error("maxLength should be between 2 and "+DEFAULT_PRECISION+" was "+n);for(var a=e.bboxForPolygon(i),r=e.distance(a[0],a[2],a[1],a[3]),o=e.getSuitableHashLength(r,a[0],a[2]),l=[],d=e.encode(a[0],a[2],o),s=e.decode_bbox(d);s[0]<a[1];){for(var u=d,g=s;e.isWest(g[2],a[3]);)l.push(u),u=e.east(u),g=e.decode_bbox(u);d=e.south(d),s=e.decode_bbox(d)}for(var h=[],p=o;n>p;)l=t(i,h,l),p++;return 0==h.length&&(h=h.concat(l)),h},e.getSuitableHashLength=function(t,i,n){if(5>t)return 10;for(var a=e.encode(i,n),r=0,o=a.length;t>r&&a.length>=2;){o=a.length;var l=e.decode_bbox(a);r=e.distance(l[0],l[2],l[0],l[3]),a=a.slice(0,a.length-1)}return Math.min(o+1,DEFAULT_PRECISION)},e.geoHashesForLine=function(t,n,a,r,o){if(n==r&&a==o)throw new error("identical begin and end coordinate: line must have two different points");var l=e.getSuitableHashLength(t,n,a),d=i(n,a,l),s=d[1],u=i(r,o,l),g=u[1];return d[0]==u[0]?[d[0]]:n!=r?e.getGeoHashesForPolygon([[s[0],s[2]],[s[1],s[2]],[g[1],g[3]],[g[0],g[3]]],l):e.getGeoHashesForPolygon([[s[0],s[2]],[s[0],s[3]],[g[1],g[2]],[g[1],g[3]]],l)},e.geoHashesForCircle=function(t,i,n,a){var r,o=e.getSuitableHashLength(a,i,n);r=t>o-3?200:t>o-2?100:t>o-1?50:15;var l=e.circle2polygon(r,i,n,a);return e.getGeoHashesForPolygon(l,t)},e.subHashesSE=function(e){var t=[],i=0;for(var n in BASE32_CHARS){var a=BASE32_CHARS[n];a>="s"&&"z">=a&&(t[i]=e+a,i++)}return t},e.isWest=function(e,t){var i=e+180,n=t+180;return n>i&&180>n-i?!0:i>n&&180>n+360-i?!0:!1},e.isEast=function(e,t){var i=e+180,n=t+180;return i>n&&180>i-n?!0:n>i&&180>i+360-n?!0:!1},e.isNorth=function(e,t){return e>t},e.isSouth=function(e,t){return t>e},e.bboxForPolygon=function(e){for(var t=91,i=181,n=-91,a=-181,r=0;r<e.length;r++)t=Math.min(t,e[r][0]),i=Math.min(i,e[r][1]),n=Math.max(n,e[r][0]),a=Math.max(a,e[r][1]);return[t,n,i,a]},e.bboxContains=function(e,t,i){return e[0]<=t&&t<=e[1]&&e[2]<=i&&i<=e[3]},e.polygonContains=function(t,i,n){if(t.length<=2)throw new Error("a polygon must have at least three points");var a=e.bboxForPolygon(t);if(!e.bboxContains(a,i,n))return!1;for(var r,o,l=0,d=t[t.length-1][0],s=t[t.length-1][1],u=0;u<t.length;d=r,s=o,u++)if(r=t[u][0],o=t[u][1],o!=s){var g;if(d>r){if(i>=d)continue;g=r}else{if(i>=r)continue;g=d}var h,p;if(s>o){if(o>n||n>=s)continue;if(g>i){l++;continue}h=i-r,p=n-o}else{if(s>n||n>=o)continue;if(g>i){l++;continue}h=i-d,p=n-s}p/(s-o)*(d-r)>h&&l++}return 0!=(1&l)},e.roundToDecimals=function(e,t){if(t>17)throw new Error("this probably doesn't do what you want; makes sense only for <= 17 decimals");var i=Math.pow(10,t);return Math.round(e*i)/i},e.linesCross=function(e,t,i,n,a,r,o,l){var d=i==e,s=o==a;if(d&&s)return e==a?r>=t&&n>r||l>=t&&n>l:!1;if(d&&!s){var u=(l-r)/(o-a),g=r-u*a,h=e,p=g+u*h;return p>=t&&n>=p}if(!d&&s){var c=(n-t)/(i-e),m=t-c*e,h=a,p=m+c*h;return p>=r&&l>=p}var c=(n-t)/(i-e),u=(l-r)/(o-a),m=t-c*e,g=r-u*a;if(c-u==0)return m==g?a>=e&&i>a||o>=e&&i>o:!1;var h=-(m-g)/(c-u),p=m+c*h;return(e-h)*(h-i)>=0&&(a-h)*(h-o)>=0&&(t-p)*(p-n)>=0&&(r-p)*(p-l)>=0?!0:!1};var o=6371e3,l=6371e3,d=l*Math.PI*2,s=l*Math.PI/180;e.translateLongitude=function(e,t,i){return[e,t+i/a(e)]},e.translateLatitude=function(e,t,i){return[e+i/s,t]},e.translate=function(t,i,n,a){var r=e.translateLongitude(t,i,a);return e.translateLatitude(t,r[1],n)},e.distance=function(e,t,i,a){var r=n(i-e),l=n(a-t),d=Math.sin(r/2)*Math.sin(r/2)+Math.cos(n(e))*Math.cos(n(i))*Math.sin(l/2)*Math.sin(l/2),s=2*Math.asin(Math.sqrt(d));return o*s},e.getPolygonCenter=function(e){var t=0,i=0;return e.forEach(function(e){t+=parseFloat(e.lat),i+=parseFloat(e.lon)}),{lat:t/e.length,lon:i/e.length}},e.bbox2polygon=function(e){return[[e[0],e[2]],[e[1],e[2]],[e[1],e[3]],[e[0],e[3]]]},e.circle2polygon=function(e,t,i,a){if(5>e)throw new Error("you need a minimum of 5 segments");for(var r=[],o=a/l*180/Math.PI,d=o/Math.cos(n(t))%90,s=0;e>s;s++){var u=2*Math.PI*s/e;u=u+=.1,u>=2*Math.PI&&(u-=2*Math.PI);var g=t+o*Math.sin(u),h=i+d*Math.cos(u);h>180?h=-180+(h-180):-180>h&&(h=180-(h+180)),g>90?g=90-(g-90):-90>g&&(g=-90-(g+90)),r[s]=[g,h]}return r},e.getPolygonForPoints=function(e){if(e.length<3)throw new Error("need at least 3 pois for a cluster");var t=e.slice();t.sort(function(e,t){return e[0]==t[0]?e[1]-t[1]:e[0]-t[0]});var i=t.length,n=[];n[0]=t[0],n[1]=t[1];for(var a=2,o=2;i>o;o++)for(n[a]=t[o],a++;a>2&&!r(n[a-3],n[a-2],n[a-1]);)n[a-2]=n[a-1],a--;var l=[];l[0]=t[i-1],l[1]=t[i-2];for(var d=2,o=i-3;o>=0;o--)for(l[d]=t[o],d++;d>2&&!r(l[d-3],l[d-2],l[d-1]);)l[d-2]=l[d-1],d--;for(var s=[],u=0,o=0;a>o;o++)s[u]=n[o],u++;for(var o=1;d-1>o;o++)s[u]=l[o],u++;return s},e.toDecimalDegree=function(e,t,i,n){var a=1;return!e||"w"!=e.toLowerCase()[0]&&"s"!=e.toLowerCase()[e.length-1]||(a=-1),(t+i/60+n/60/60)*a}}(module.exports);