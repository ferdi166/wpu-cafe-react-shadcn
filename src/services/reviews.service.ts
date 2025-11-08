import { environment } from "@/constants/environment";
import { fetchAPI } from "@/utils/fetch";

export const getReviews = async () => {
  let url = `${environment.API_URL}/reviews?page=1&pageSize=10`;

  const result = await fetchAPI(url, {
    method: "GET",
  }).then((data) => data);

  return result;
};
