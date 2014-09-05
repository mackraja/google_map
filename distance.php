<!DOCTYPE html>
<html>
  <head>
<script>
function distance() {

    var lat1 = document.getElementById('lat1').value;
    var lon1 = document.getElementById('lon1').value;
    var lat2 = document.getElementById('lat2').value;
    var lon2 = document.getElementById('lon2').value;

    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    alert('Distance in Miles = '+dist);
    if (unit=="K") 
	{ 
		alert('if1');
		dist = (dist * 1.609344);
	}
   
    if (unit=="N") 
	{
		alert('if2');
	 	dist = (dist * 0.8684);
	}
}
</script>
 </head>
  <body>
    <div>
	
      <p>
        <label for="start">lat one: </label>
        <input type="text" name="lat1" id="lat1" />
	<label for="start">lon one: </label>
        <input type="text" name="lon1" id="lon1" />

	<label for="start">lat two: </label>
        <input type="text" name="lat2" id="lat2" />
	<label for="start">lon two: </label>
        <input type="text" name="lon2" id="lon2" />
        
	<input type="submit" value="Calculate Route" onclick="distance()" />
      </p>
    </div>
  </body>
</html>
