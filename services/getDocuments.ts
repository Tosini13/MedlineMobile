import { getEventDocumentPath } from "@/utils/utils";
import {
  FirebaseStorage,
  getDownloadURL,
  list,
  ref,
  StorageReference,
} from "firebase/storage";

export const getDocuments = async (
  storage: FirebaseStorage,
  lineId: string,
  eventId: string,
  pageToken?: string,
) => {
  const listRef = ref(storage, getEventDocumentPath(lineId, eventId));

  const page = await list(listRef, { maxResults: 20, pageToken });

  const urls = await Promise.all(
    page.items.map((item) => getDownloadURL(ref(storage, item.fullPath))),
  );

  const items = page.items.map((item, key) => {
    const itemWithUrl = item as StorageReference & { url: string };
    itemWithUrl.url = urls[key];
    return itemWithUrl;
  });

  return {
    items,
    nextPageToken: page.nextPageToken,
  };
};
