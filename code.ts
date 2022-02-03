figma.showUI(__html__);

seachForTitles();

figma.ui.onmessage = msg => {
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

async function seachForTitles(): Promise<void> {
  const choices: string[] = [];
  const userName: string = figma.currentUser.name;
  const date = new Date().toLocaleDateString();
  let bannerNode: InstanceNode[] = figma.currentPage.selection as InstanceNode[];
  if(bannerNode.length !== 1) {
    figma.notify("Veuillez selectionner une seule et unique bannière");
    figma.closePlugin();
    return;
  }
  else if (bannerNode[0]?.children){
    for (let textNode of bannerNode[0]?.children) {
      if (textNode.name === 'Nom de la feature') {
        let characters: string = textNode["characters"];
        choices.push(characters);
      }
      if (textNode.name === 'Nom le jj Mois') {
        await figma.loadFontAsync({ family: "Open Sans", style: "Bold" }); // For some reason Figma wants to load the font before using it
        await figma.loadFontAsync({ family: "Open Sans", style: "Regular" });
        textNode["characters"] = `Mis à jour par ${userName} le ${date}`;
      }
    }
  }
  figma.ui.postMessage({type: "choices", choices, userName})
  return;
}