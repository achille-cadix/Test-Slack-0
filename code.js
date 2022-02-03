var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
seachForTitles();
figma.ui.onmessage = msg => {
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};
function seachForTitles() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const choices = [];
        const userName = figma.currentUser.name;
        const date = new Date().toLocaleDateString();
        let bannerNode = figma.currentPage.selection;
        if (bannerNode.length !== 1) {
            figma.notify("Veuillez selectionner une seule et unique bannière");
            figma.closePlugin();
            return;
        }
        else if ((_a = bannerNode[0]) === null || _a === void 0 ? void 0 : _a.children) {
            for (let textNode of (_b = bannerNode[0]) === null || _b === void 0 ? void 0 : _b.children) {
                if (textNode.name === 'Nom de la feature') {
                    let characters = textNode["characters"];
                    choices.push(characters);
                }
                if (textNode.name === 'Nom le jj Mois') {
                    yield figma.loadFontAsync({ family: "Open Sans", style: "Bold" }); // For some reason Figma wants to load the font before using it
                    yield figma.loadFontAsync({ family: "Open Sans", style: "Regular" });
                    textNode["characters"] = `Mis à jour par ${userName} le ${date}`;
                }
            }
        }
        figma.ui.postMessage({ type: "choices", choices, userName });
        return;
    });
}
