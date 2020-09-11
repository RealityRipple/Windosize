var windosize_common = {
 LoadFromPrefs: function()
 {
  let prefMgr = Components.classes["@mozilla.org/preferences-service;1"].
   getService(Components.interfaces.nsIPrefService);
  let prefs = prefMgr.getBranch("extensions.windosize.dimensionlist.");
  let dimensionlist = prefs.getCharPref("outer");
  let dimensions = dimensionlist.split(";");
  dimensions.sort(windosize_common.SortByLabel);
  return dimensions;
 },
 SaveToPrefs: function(dimensions)
 {
  dimensions = windosize_common.deDupe(dimensions);
  dimensions.sort(windosize_common.SortByLabel);
  let prefMgr = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  let prefs = prefMgr.getBranch("extensions.windosize.dimensionlist.");
  prefs.setCharPref("outer", dimensions.join(";"));
 },
 AddDimension: function(width, height)
 {
  let dimensions = windosize_common.LoadFromPrefs();
  dimensions[dimensions.length++] = width + "x" + height;
  windosize_common.SaveToPrefs(dimensions);
 },
 SortByLabel: function(a, b)
 {
  let aSqPx = windosize_common.getSqPx(a);
  let bSqPx = windosize_common.getSqPx(b);
  if(aSqPx > bSqPx)
   return 1;
  else if(aSqPx < bSqPx)
   return -1;
  return 0;
 },
 deDupe: function(dimensions)
 {
  let unique = new Object();
  for(let i = 0; i < dimensions.length; i++)
  {
   unique[dimensions[i]] = 1;
  }
  let result = new Array();
  for(let dim in unique)
  {
   result[result.length++] = dim;
  }
  return result;
 },
 getSqPx: function(dimstr)
 {
  let dim = dimstr.split("x");
  return Number(dim[0]) * Number(dim[1]);
 },
 isEmpty: function(str)
 {
  if(str == null || str == "")
   return true; 
  return false;
 }
};
