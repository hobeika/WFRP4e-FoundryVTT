import CombatHelpers from "../system/combat.js"

export default function() {
  Hooks.on("updateCombat", CombatHelpers.updateCombat)
  Hooks.on("preUpdateCombat", CombatHelpers.preUpdateCombat)
  Hooks.on("deleteCombat", CombatHelpers.endCombat)

  Hooks.on("preCreateCombatant", (combat, data) => {
    let mask = canvas.tokens.get(data.tokenId).document.getFlag("wfrp4e", "mask")
    if (mask)
    {
      data.img = "systems/wfrp4e/tokens/unknown.png"
      data.name = "???"
      setProperty(data, "flags.wfrp4e.mask", mask)
    }
  })

  /* Custom Combat Carousel */
  Hooks.on('renderCombatCarousel', () => {
    addClassByQuerySelector("wfrp4e", "#combat-carousel")
    let carouselSize = game.settings.get('combat-carousel', 'carouselSize')
    if (carouselSize !== "") {
      addClassByQuerySelector(carouselSize, "#combat-carousel")
    }
  });
  
  function addClassByQuerySelector(className, selector) {
    let navigation = document.querySelector(selector);
    navigation.classList.add(className)
  }
}
