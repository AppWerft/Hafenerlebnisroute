function Point(e,t){this.x=e,this.y=t}function Region(e){this.points=e||[],this.length=e.length}Region.prototype.getArea=function(){var e,t,i,n,a=0;for(e=0,t=this.length-1;e<this.length;t=e,e++)i=this.points[e],n=this.points[t],a+=i[0]*n[1],a-=i[1]*n[0];return a/=2},Region.prototype.getCentroid=function(){var e,t,i,n,a,r=0,l=0;for(e=0,t=this.length-1;e<this.length;t=e,e++)n=this.points[e],a=this.points[t],i=n[0]*a[1]-a[0]*n[1],r+=(n[0]+a[0])*i,l+=(n[1]+a[1])*i;return i=6*this.getArea(),new Point(r/i,l/i)},module.exports=Region;