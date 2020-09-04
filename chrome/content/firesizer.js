/*
 * Written by Brian Mathis <bmathis-firesizer@directedge.us>
 *
 * Heavily inspired by Galoca's "Yet Another Window Resizer"
 * which is available: https://addons.mozilla.org/en-US/firefox/addon/2498
 *
 * Update for Pale Moon by Andrew Sachen <webmaster@RealityRipple.com>
 */
var firesizer = {
 localeStr: new Array(),
 Customize: function()
 {
  window.openDialog("chrome://firesizer/content/customize.xul", null, "chrome,centerscreen,dependent");
 },
 SaveCurrent: function()
 {
  let width  = window.outerWidth  + '';
  let height = window.outerHeight + '';
  firesizer_common.AddDimension(width, height);
 },
 UpdateStatus: function()
 {
  let width  = window.outerWidth  + '';
  let height = window.outerHeight + '';
  document.getElementById("firesizer-statuspanel").label = width + 'x' + height;
 },
 ResizeWindow: function(width, height)
 {
  if(isNaN(width) || isNaN(height))
  {
   alert(firesizer.localeStr["InvalidDimensions"] + width + "x" + height);
   return;
  }
  window.outerWidth  = width;
  window.outerHeight = height;
 },
 ShowMenu: function()
 {
  let labels = firesizer_common.LoadFromPrefs();
  let statusmenu = document.getElementById("firesizer-statuspanel-menu");
  while(statusmenu.childNodes.length > 0)
  {
   statusmenu.removeChild(statusmenu.childNodes[0]);
  }
  for(let i = 0; i < labels.length; i++)
  {
   let wxh = labels[i].split("x");
   let width  = Number(wxh[0]);
   let height = Number(wxh[1]);
   let menuitem = document.createElement("menuitem");
   menuitem.setAttribute("label", labels[i]);
   menuitem.setAttribute("id",    labels[i]);
   menuitem.setAttribute("value", "firesizer-menuitem");
   menuitem.setAttribute("oncommand", "firesizer.ResizeWindow(" + width + "," + height + ")");
   statusmenu.appendChild(menuitem);
  }
  let separator = document.createElement("menuseparator");
  separator.setAttribute("id", "firesizer-statuspanel-separator");
  statusmenu.appendChild(separator);
  let customize = document.createElement("menuitem");
  customize.setAttribute("id", "firesizer-statuspanel-customize");
  customize.setAttribute("label", firesizer.localeStr["Customize"]);
  customize.setAttribute("accesskey", firesizer.localeStr["CustomizeKey"]);
  customize.setAttribute("oncommand", "firesizer.Customize()");
  statusmenu.appendChild(customize);
  let savecurrent = document.createElement("menuitem");
  savecurrent.setAttribute("id", "firesizer-statuspanel-savecurrent");
  savecurrent.setAttribute("label", firesizer.localeStr["SaveCurrent"]);
  savecurrent.setAttribute("accesskey", firesizer.localeStr["SaveCurrentKey"]);
  savecurrent.setAttribute("oncommand", "firesizer.SaveCurrent()");
  statusmenu.appendChild(savecurrent);
 },
 LoadLocaleStrings: function()
 {
  let bundleMgr = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
  let firesizerStrBundle = bundleMgr.createBundle("chrome://firesizer/locale/firesizer.properties");
  firesizer.localeStr["InvalidDimensions"]	= firesizerStrBundle.GetStringFromName("firesizerInvalidDimensions");
  firesizer.localeStr["Customize"]		= firesizerStrBundle.GetStringFromName("firesizerCustomize");
  firesizer.localeStr["CustomizeKey"]	= firesizerStrBundle.GetStringFromName("firesizerCustomizeKey");
  firesizer.localeStr["SaveCurrent"]	= firesizerStrBundle.GetStringFromName("firesizerSaveCurrent");
  firesizer.localeStr["SaveCurrentKey"]	= firesizerStrBundle.GetStringFromName("firesizerSaveCurrentKey");
 },
 DoOnLoad: function()
 {
  firesizer.LoadLocaleStrings();
  firesizer.UpdateStatus();
 }
};
window.addEventListener("load",   firesizer.DoOnLoad, false);
window.addEventListener("resize", firesizer.UpdateStatus, false);
