figma.showUI(__html__);

const choices = seachForTitles();
figma.ui.postMessage({type: "choices", choices, userName: figma.currentUser.name})

figma.ui.onmessage = msg => {
  console.log(msg)

  if (msg.action ==='select') {
    console.log("id", msg.title)
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

function seachForTitles(): string[] {
  const choices: string[] = [];
  let bannerNodes: InstanceNode[] = figma.currentPage.selection as InstanceNode[];
  for (let bannerNode of bannerNodes) {
    if (bannerNode?.children){
      for (let textNode of bannerNode?.children) {
        if (textNode.name === 'Nom de la feature') {
          let characters: string = textNode["characters"];
          choices.push(characters);
        }
     }
    }
  }
  return choices;
}