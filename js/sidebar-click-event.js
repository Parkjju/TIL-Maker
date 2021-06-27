const sidebarGroup = document.getElementsByClassName("sidebar-group");

const CLICKED_CLASS = "open";

function handleClick(CL) {
  const check = CL.classList.contains(CLICKED_CLASS);
  if(!check){
    CL.classList.add(CLICKED_CLASS);
  }
  else{
    CL.classList.remove(CLICKED_CLASS);
  }

}

