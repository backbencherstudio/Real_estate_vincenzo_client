import { NavLink } from "react-router-dom";

export const sidebarItemGenerator = (items, role) => {
  const sideBarItems = items.reduce((acc, item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        icon: item.icon || null, // Add icon if it exists
        label: (
          <NavLink
            to={`/${role}/${item.path}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <span>{item.name}</span>
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        icon: item.icon || null, // Add parent icon if exists
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              icon: child.icon || null, // Add icon for child
              label: (
                <NavLink
                  to={`/${role}/${child.path}`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>{child.name}</span>
                </NavLink>
              ),
            };
          }
          return null;
        }),
      });
    }
    return acc;
  }, []);

  return sideBarItems;
};
