var windosize_customize = {
 localeStr: new Array(),
 ReloadCurrentList: function()
 {
  let labels = windosize_common.LoadFromPrefs();
  let listbox = document.getElementById("windosize-customize-currentlist");
  while(listbox.getRowCount() != 0)
  {
   listbox.removeItemAt(0);
  }
  for(let i = 0; i < labels.length; i++)
  {
   listbox.appendItem(labels[i], labels[i]);
  }
 },
 RemoveDimension: function(dimstr)
 {
  let dimensions = windosize_common.LoadFromPrefs();
  let newdimensions = new Array();
  for(let i = 0; i < dimensions.length; i++)
  {
   if(dimensions[i] != dimstr)
    newdimensions[newdimensions.length++] = dimensions[i];
  }
  windosize_common.SaveToPrefs(newdimensions);
 },
 LoadLocaleStrings: function()
 {
  let bundleMgr = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
  let customizeStrBundle = bundleMgr.createBundle("chrome://windosize/locale/customize.properties");
  windosize_customize.localeStr["SelectDelete"] = customizeStrBundle.GetStringFromName("windosizeSelectItemToDelete");
  windosize_customize.localeStr["EnterSize"]    = customizeStrBundle.GetStringFromName("windosizeWidthHeight");
 },
 Delete: function()
 {
  let listbox = document.getElementById("windosize-customize-currentlist");
  if(listbox.selectedItem == null)
  {
   alert(windosize_customize.localeStr["SelectDelete"]);
   return;
  }
  windosize_customize.RemoveDimension(listbox.selectedItem.label);
  windosize_customize.ReloadCurrentList();
 },
 ListKeypress: function(evt)
 {
  if(evt.keyCode == 46)
  {
   windosize_customize.Delete();
   return false;
  }
  return true;
 },
 Add: function()
 {
  let width  = document.getElementById("windosize-customize-addwidth");
  let height = document.getElementById("windosize-customize-addheight");
  width.value.replace(/\D+/g, '');
  height.value.replace(/\D+/g, '');
  if(windosize_common.isEmpty(width.value) || windosize_common.isEmpty(height.value))
  {
   alert(windosize_customize.localeStr["EnterSize"]);
   return;
  }
  let listbox = document.getElementById("windosize-customize-currentlist");
  windosize_common.AddDimension(width.value, height.value);
  windosize_customize.ReloadCurrentList();
  width.value = "";
  height.value = "";
 },
 NumberOnly: function(evt)
 {
  if(evt.charCode == 0)
   return true; 
  if(String.fromCharCode(evt.charCode) >= "0" && String.fromCharCode(evt.charCode) <= "9")
   return true;
  return false;
 },
 DoOnLoad: function()
 {
  windosize_customize.LoadLocaleStrings();
  windosize_customize.ReloadCurrentList();
 }
};
window.addEventListener("load", windosize_customize.DoOnLoad, false);
