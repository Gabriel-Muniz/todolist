import "../styles/reset.css";
import "../styles/main.css";

import { renderProject, renderSidebarProjects } from "./modules/projectView";
import { attachEventListeners, updateSidebarState, syncSidebarState } from "./modules/domManager";

import { checkLocalStorage, deserializeProjects, getLastActiveProject, storageAvailable } from "./utils/storageManager";

if (storageAvailable("localStorage")) {
  checkLocalStorage();
} else {
  // Too bad, no localStorage for us
}

let projects = deserializeProjects();



renderSidebarProjects();
attachEventListeners();

if (projects.length !== 0) {

  if (getLastActiveProject()) {
    let loadedProjectIndex = getLastActiveProject();

    renderProject(projects[loadedProjectIndex], loadedProjectIndex);
  }
  syncSidebarState()

}


