import { createApp } from "vue";
import Facts from "./Facts.vue";

function getPropsForFactsFromBlock(block) {
  const factPropObject = {
    facts: [],
  };
  factPropObject.facts = Array.from(block.children).map((child) => {
    return child.children[0].innerText;
  });
  return factPropObject;
}
export default async function decorate(block) {
  const factWrapper = document.createElement("div");
  factWrapper.className = "fact__block-style";
  const factProp = getPropsForFactsFromBlock(block);

  console.log("inner content of block ", block.innerHTML);
  createApp(Facts, {
    factProp: factProp,
  }).mount(factWrapper);
  block.textContent = "";
  block.append(factWrapper);
}
