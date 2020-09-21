/*
 * Written by Brian Mathis <bmathis-windosize@directedge.us>
 *
 * Heavily inspired by Galoca's "Yet Another Window Resizer"
 * which is available: https://addons.mozilla.org/en-US/firefox/addon/2498
 *
 * Update for Pale Moon by Andrew Sachen <webmaster@RealityRipple.com>
 */
var windosize = {
 localeDimensions: null,
 localeCustomize: null,
 localeCustomKey: null,
 localeSave: null,
 localeSaveKey: null,
 Customize: function()
 {
  window.openDialog('chrome://windosize/content/customize.xul', null, 'chrome,centerscreen,dependent');
 },
 SaveCurrent: function()
 {
  let width  = window.outerWidth  + '';
  let height = window.outerHeight + '';
  windosize_common.AddDimension(width, height);
 },
 UpdateStatus: function()
 {
  let width  = window.outerWidth  + '';
  let height = window.outerHeight + '';
  document.getElementById('windosize-statuspanel').label = width + 'x' + height;
 },
 ResizeWindow: function(width, height)
 {
  if(isNaN(width) || isNaN(height))
  {
   alert(windosize.localeDimensions + width + 'x' + height);
   return;
  }
  window.outerWidth  = width;
  window.outerHeight = height;
 },
 ShowMenu: function()
 {
  let labels = windosize_common.LoadFromPrefs();
  let statusmenu = document.getElementById('windosize-statuspanel-menu');
  while(statusmenu.childNodes.length > 0)
  {
   statusmenu.removeChild(statusmenu.childNodes[0]);
  }
  for(let i = 0; i < labels.length; i++)
  {
   let wxh = labels[i].split('x');
   let width  = Number(wxh[0]);
   let height = Number(wxh[1]);
   let menuitem = document.createElement('menuitem');
   menuitem.setAttribute('label', labels[i]);
   menuitem.setAttribute('id',    labels[i]);
   menuitem.setAttribute('value', 'windosize-menuitem');
   menuitem.setAttribute('oncommand', 'windosize.ResizeWindow(' + width + ',' + height + ')');
   statusmenu.appendChild(menuitem);
  }
  let separator = document.createElement('menuseparator');
  separator.setAttribute('id', 'windosize-statuspanel-separator');
  statusmenu.appendChild(separator);
  let customize = document.createElement('menuitem');
  customize.setAttribute('id', 'windosize-statuspanel-customize');
  customize.setAttribute('label', windosize.localeCustomize);
  customize.setAttribute('accesskey', windosize.localeCustomKey);
  customize.setAttribute('oncommand', 'windosize.Customize()');
  statusmenu.appendChild(customize);
  let savecurrent = document.createElement('menuitem');
  savecurrent.setAttribute('id', 'windosize-statuspanel-savecurrent');
  savecurrent.setAttribute('label', windosize.localeSave);
  savecurrent.setAttribute('accesskey', windosize.localeSaveKey);
  savecurrent.setAttribute('oncommand', 'windosize.SaveCurrent()');
  statusmenu.appendChild(savecurrent);
 },
 LoadLocaleStrings: function()
 {
  let bundleMgr = Components.classes['@mozilla.org/intl/stringbundle;1'].getService(Components.interfaces.nsIStringBundleService);
  let windosizeStrBundle = bundleMgr.createBundle('chrome://windosize/locale/windosize.properties');
  windosize.localeDimensions = windosizeStrBundle.GetStringFromName('windosizeInvalidDimensions');
  windosize.localeCustomize  = windosizeStrBundle.GetStringFromName('windosizeCustomize');
  windosize.localeCustomKey = windosizeStrBundle.GetStringFromName('windosizeCustomizeKey');
  windosize.localeSave = windosizeStrBundle.GetStringFromName('windosizeSaveCurrent');
  windosize.localeSaveKey = windosizeStrBundle.GetStringFromName('windosizeSaveCurrentKey');
 },
 DoOnLoad: function()
 {
  windosize.LoadLocaleStrings();
  windosize.UpdateStatus();
 }
};
window.addEventListener('load',   windosize.DoOnLoad, false);
window.addEventListener('resize', windosize.UpdateStatus, false);
