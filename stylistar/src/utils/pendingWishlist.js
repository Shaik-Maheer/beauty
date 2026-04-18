const PENDING_WISHLIST_KEY = "pending_wishlist_item";

export const savePendingWishlist = (item) => {
  if (!item || !item.productId) return;
  sessionStorage.setItem(PENDING_WISHLIST_KEY, JSON.stringify(item));
};

export const popPendingWishlist = () => {
  const raw = sessionStorage.getItem(PENDING_WISHLIST_KEY);
  if (!raw) return null;

  sessionStorage.removeItem(PENDING_WISHLIST_KEY);
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
