import { createVueBlock } from "../../scripts/scripts.js";
const templateUrl = "blocks/sitehero/template.html";

function extractBlockInformation(block) {
  const blockInfo = {
    headline: "",
    description: "",
    image: "",
    ctaOrderNow: "",
    ctaHowToOrder: "",
  };

  blockInfo.headline = block
    .querySelector("div div:nth-child(1) > div")
    .textContent.trim();
  blockInfo.description = block
    .querySelector("div div:nth-child(2) > div")
    .textContent.trim();

  const pictureElement = block.querySelector("picture");
  const sourceWebP = pictureElement.querySelector(
    'source[type="image/webp"][media="(min-width: 600px)"]'
  );
  const imgElement = pictureElement.querySelector("img");
  if (sourceWebP) {
    blockInfo.image = sourceWebP.srcset.split(" ")[0];
  } else if (imgElement) {
    blockInfo.image = imgElement.src;
  }

  blockInfo.ctaHowToOrder = block
    .querySelector("div div:nth-child(4) > div")
    .textContent.trim();

  blockInfo.ctaOrderNow = block
    .querySelector("div div:nth-child(3) > div")
    .textContent.trim();
 return blockInfo;
}
export default function decorate(block) {
  const blockData = extractBlockInformation(block);

  const heroSection = document.createElement("section");
  heroSection.className = "hero";

  fetch(templateUrl)
    .then((response) => response.text())
    .then((html) => {
      createVueBlock(html, blockData, heroSection); // Creating a side-effect to the bylineComponentWrapper
    });

  block.textContent = "";
  block.append(heroSection);
}
