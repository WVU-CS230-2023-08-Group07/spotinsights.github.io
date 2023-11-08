function toggleSidebar() {
	const sidebar = document.getElementById("friends-list");
	if (sidebar.style.left === "0px" || sidebar.style.left === "") {
		sidebar.style.left = "-250px";
	} else {
		sidebar.style.left = "0px";
	}
}