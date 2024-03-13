import { loadVueJS } from "../../scripts/scripts.js";
const templateUrl = "blocks/byline/template.html";

//Extract the Block Information for Byline Custom Block
function extractBlockInformation(block) {
  // Initialize the object to hold the extracted information
  const blockInfo = {
    headline: "",
    description: "",
    image: "",
  };
  // Extract the headline
  blockInfo.headline = block
    .querySelector("div > div:nth-child(1) > div")
    .textContent.trim();
  // Extract the description
  blockInfo.description = block
    .querySelector("div > div:nth-child(2) > div")
    .textContent.trim();
  // Attempt to extract the image source URL
  // Prioritize the source tag with type="image/webp" and media="(min-width: 600px)"
  const pictureElement = block.querySelector("picture");
  const sourceWebP = pictureElement.querySelector(
    'source[type="image/webp"][media="(min-width: 600px)"]'
  );
  const imgElement = pictureElement.querySelector("img");
  if (sourceWebP) {
    blockInfo.image = sourceWebP.srcset.split(" ")[0]; // Assuming srcset format is "url size"
  } else if (imgElement) {
    // Fallback to the img src if specific source is not found
    blockInfo.image = imgElement.src;
  }
  return blockInfo;
}
//function to create Byline with help of Vue JS -> CreateApp
function createByline(html, blockData, bylineComponentWrapper) {
  loadVueJS().then(() => {
    const { createApp, ref } = Vue;
    createApp({
      setup() {
        const data = ref(blockData);
        console.log("Information in data ", data);
        return { data };
      },
      template: html,
    }).mount(bylineComponentWrapper);
  });
}
//The default main/decorate function to do the icing :)
export default function decorate(block) {
  const blockData = extractBlockInformation(block);
  const bylineComponentWrapper = document.createElement("div");

  fetch(templateUrl)
    .then((response) => response.text())
    .then((html) => {
      createByline(html, blockData, bylineComponentWrapper); // Creating a side-effect to the bylineComponentWrapper
    });

  block.textContent = "";
  block.append(bylineComponentWrapper);
}
