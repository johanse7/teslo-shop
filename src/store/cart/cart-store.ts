import { CardProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SummaryType = {
  tax: number;
  subTotal: number;
  total: number;
  itemsInCart: number;
};

type State = {
  cart: CardProduct[];
  addProductToCart: (product: CardProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CardProduct, quantity: number) => void;
  removeProduct: (product: CardProduct) => void;
  getSummaryInformation: () => SummaryType;
  cleanCart: () => void;
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CardProduct) => {
        const { cart } = get();
        // size selected
        const cartItemIndex = cart.findIndex(
          ({ id, size }) => product.id === id && size === product.size
        );

        if (cartItemIndex === -1) {
          set({ cart: [...cart, product] });
          return;
        }
        const cartClone = structuredClone(cart);
        const cartItemUpdated = cartClone[cartItemIndex];

        cartItemUpdated.quantity += product.quantity;

        cartClone[cartItemIndex] = cartItemUpdated;
        set({ cart: cartClone });
      },
      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      updateProductQuantity: (product: CardProduct, quantity: number) => {
        const { cart } = get();
        const cartItemIndex = cart.findIndex(
          ({ id, size }) => product.id === id && size === product.size
        );
        const cartClone = structuredClone(cart);
        cartClone[cartItemIndex].quantity = quantity;

        set({ cart: cartClone });
      },
      removeProduct: (product: CardProduct) => {
        const { cart } = get();
        const cartUpdated = cart.filter(
          ({ id, size }) => !(product.id === id && size === product.size)
        );
        set({ cart: cartUpdated });
      },
      getSummaryInformation: () => {
        const { cart, getTotalItems } = get();

        const subTotal = cart.reduce(
          (total, cartProduct) =>
            cartProduct.quantity * cartProduct.price + total,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = getTotalItems();
        return {
          tax,
          subTotal,
          total,
          itemsInCart,
        };
      },
      cleanCart: () => {
        set({ cart: [] });
      },
    }),
    { name: "shopping-cart" }
  )
);
