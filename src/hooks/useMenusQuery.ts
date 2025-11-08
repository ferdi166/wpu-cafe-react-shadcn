import { getMenus } from "@/services/menu.service";
import { useQuery } from "@tanstack/react-query";

export function useMenusQuery(category: string) {
  return useQuery({
    queryKey: ["menus", category],
    queryFn: () => getMenus(category),
  });
}
