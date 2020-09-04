var firesizer_customize = {
 localeStr: new Array(),
 ReloadCurrentList: function()
 {
  let labels = firesizer_common.LoadFromPrefs();
  let listbox = document.getElementById("firesizer-customize-currentlist");
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
  let dimensions = firesizer_common.LoadFromPrefs();
  let newdimensions = new Array();
  for(let i = 0; i < dimensions.length; i++)
  {
   if(dimensions[i] != dimstr)
    newdimensions[newdimensions.length++] = dimensions[i];
  }
  firesizer_common.SaveToPrefs(newdimensions);
 },
 LoadLocaleStrings: function()
 {
  let bundleMgr = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
  let customizeStrBundle = bundleMgr.createBundle("chrome://firesizer/locale/customize.properties");
  firesizer_customize.localeStr["SelectDelete"] = customizeStrBundle.GetStringFromName("firesizerSelectItemToDelete");
  firesizer_customize.localeStr["EnterSize"]    = customizeStrBundle.GetStringFromName("firesizerWidthHeight");
 },
 Delete: function()
 {
  let listbox = document.getElementById("firesizer-customize-currentlist");
  if(listbox.selectedItem == null)
  {
   alert(firesizer_customize.localeStr["SelectDelete"]);
   return;
  }
  firesizer_customize.RemoveDimension(listbox.selectedItem.label);
  firesizer_customize.ReloadCurrentList();
 },
 ListKeypress: function(evt)
 {
  if(evt.keyCode == 46)
  {
   firesizer_customize.Delete();
   return false;
  }
  return true;
 },
 Add: function()
 {
  let width  = document.getElementById("firesizer-customize-addwidth");
  let height = document.getElementById("firesizer-customize-addheight");
  width.value.replace(/\D+/g, '');
  height.value.replace(/\D+/g, '');
  if(firesizer_common.isEmpty(width.value) || firesizer_common.isEmpty(height.value))
  {
   alert(firesizer_customize.localeStr["EnterSize"]);
   return;
  }
  let listbox = document.getElementById("firesizer-customize-currentlist");
  firesizer_common.AddDimension(width.value, height.value);
  firesizer_customize.ReloadCurrentList();
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
  firesizer_customize.LoadLocaleStrings();
  firesizer_customize.ReloadCurrentList();
 }
};
window.addEventListener("load", firesizer_customize.DoOnLoad, false);
