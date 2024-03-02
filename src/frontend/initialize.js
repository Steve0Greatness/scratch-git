/** @file Please someone refactor this nonsense */

import { fileMenu, gitMenu, scratchAlert } from "./gui-components";
import Cmp from "./accessors";
import { html } from "./utils";
import api from "./api";

import { WelcomeModal, CommitModal } from "./modals/index";
import styles from "./styles.css";

function injectStyles() {
  document.head.innerHTML += html`
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
    />
  `;
  const MENU_ITEM_CSS = `
    div.${Cmp.MENU_ITEM}:has(#push-status):hover {
      cursor: pointer;
    }
    div.${Cmp.MENU_ITEM}:has(#allcommits-log):hover {
      cursor: pointer;
    }
    
    .${Cmp.SETTINGS_BUTTON}[disabled] {
      background-color: hsla(0, 60%, 55%, 1);
      color: rgba(255, 255, 255, 0.4);
      cursor: default;
    }`;

  document.head.innerHTML += "<style>" + MENU_ITEM_CSS + styles + "</style>";
}

/** TODO: deprecate in favor of dedicated menu */
function addGitMenuButtons(saveArea, commitArea, commit) {
  // add buttons
  saveArea.innerHTML += html`<div
    class="${Cmp.MENU_ACCOUNTINFOGROUP} git-button"
  >
    <div class="${Cmp.MENU_ITEM}" style="padding: 0 0.375rem 0 0.375rem">
      <div id="push-status">
        <span>Push project</span>
      </div>
    </div>
  </div>`;

  commitArea.innerHTML += html`<div
    class="${Cmp.MENU_ACCOUNTINFOGROUP} git-button"
  >
    <div class="${Cmp.MENU_ITEM}" style="padding: 0 0.375rem 0 0.375rem">
      <div id="allcommits-log">
        <span>Commits</span>
      </div>
    </div>
  </div>`;

  // add button reactivity
  setTimeout(() => {
    document.querySelector("#push-status").parentElement.parentElement.onclick =
      async () => {
        document.querySelector("#push-status").style.opacity = "0.5";
        document.querySelector("#push-status").querySelector("span").innerText =
          "Pushing project...";
        await (await api.getCurrentProject()).push();
        document.querySelector("#push-status").style.opacity = "1";
        document.querySelector("#push-status").querySelector("span").innerText =
          "Push project";
        scratchAlert({
          message: "Commits pushed successfully",
          duration: 5000,
        });
      };
    // document.querySelector(
    //   "#allcommits-log"
    // ).parentElement.parentElement.onclick = commit.display;
    document.querySelectorAll(".git-button").forEach((element) => {
      element.parentElement.onmouseenter = () => {
        element.parentElement.style.backgroundColor =
          "var(--ui-black-transparent, hsla(0, 0%, 0%, 0.15))";
      };
      element.parentElement.onmouseleave = () => {
        element.parentElement.style.backgroundColor =
          document.body.getAttribute("theme") === "dark"
            ? "#333"
            : "hsla(0, 100%, 65%, 1)";
      };
    });
  }, 500);
}

export default function () {
  const MENU = `#app > div > div.${Cmp.MENU_POSITION}.${Cmp.MENU_BAR} > div.${Cmp.MENU_CONTAINER}`;
  let saveArea = `${MENU} > div:nth-child(4)`;
  let modalArea = document.querySelector("#gitModals");

  // let commit = new CommitModal(document.querySelector(saveArea));
  let welcome = new WelcomeModal(document.querySelector(saveArea));
  // let diff = new DiffModal(document.querySelector(saveArea));

  document.querySelector(
    "body > div[style='display: none;']"
  ).innerHTML += html`<dialog
      is="diff-modal"
      id="diffModal"
      style="overflow-x: hidden"
    ></dialog>
    <dialog
      is="commit-modal"
      id="commitModal"
      style="overflow-x: hidden; overflow-y: auto"
    ></dialog>`;

  setInterval(async () => {
    try {
      document.querySelector(`.${Cmp.SAVE_STATUS}`).onclick = async () => {
        document.querySelector("#diffModal").diff("Sprite1");
      };
      document.onkeydown = async (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === "S") {
          document.querySelector("#diffModal").diff("Sprite1");

          // await diff.display();
          // document.querySelector("#shortcutNote").remove();
        }
      };
    } catch {}
  }, 500);

  injectStyles();

  const secondCateg = document.querySelector(saveArea).cloneNode(true);
  document.querySelector(saveArea).after(secondCateg);
  // addGitMenuButtons(document.querySelector(saveArea), secondCateg, commit);
  document.querySelectorAll(`.${Cmp.MENU_ITEM}`)[1].onclick = () => {
    const isDark = document.body.getAttribute("theme") === "dark";
    document.querySelectorAll(".git-button").forEach((element) => {
      element.parentElement.style.backgroundColor = isDark
        ? "#333"
        : "hsla(0, 100%, 65%, 1)";
    });
  };
  if (!fileMenu.isProjectOpen()) {
    welcome.display();
  } else {
    gitMenu.create({
      commitViewHandler: async () =>
        document.querySelector("#commitModal").display("Sprite1"),
    });
  }
}
