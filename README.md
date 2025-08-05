E-Commerce Application
A modern, responsive e-commerce web application built with React, TypeScript, and SCSS. Features include user authentication, product browsing, cart management, and an admin panel, with a clean UI, consistent styling, and smooth user experience.
Features
1. Authentication (AuthContext)

Context: src/contexts/AuthContext.tsx
Description: Manages user authentication state using React Context and sessionStorage.
Details:
State:
isAuthenticated: Boolean indicating login status.
user: User | null (id, username, firstName, lastName, role, all nullable).
token: string | null for API authentication.
cart: CartItem[] | null (array of { product: Product, quantity: number }).
loading: Boolean for initial state loading.


Methods:
login(token, user, cart): Sets state, stores in sessionStorage.
signup(token, user, cart): Same as login for new users.
logout(): Clears state and sessionStorage.
updateUser(user): Updates user data, syncs sessionStorage.
updateCart(cart): Updates cart, syncs sessionStorage.
addToCart(productId, quantity): Calls POST /cart, updates cart via updateCart.
deleteFromCart(productId): Calls DELETE /cart, updates cart via updateCart.


Persistence: Loads token, user, cart from sessionStorage on mount, handles parsing errors by clearing storage.
Security: Requires isAuthenticated for cart operations, uses Bearer token for API calls.



2. Cart Management (CartPage)

Component: src/pages/CartPage.tsx
Route: /cart
Description: Displays user’s cart with item details, edit/delete options, and total price.
Details:
Display:
Lists cart from AuthContext (CartItem[] | null).
Headers: Product Name, Quantity, Price, Total, Actions (bold, aligned, hidden on mobile).
Each row: Product name, quantity, price (price or onSalePrice with strikethrough if isOnSale), total (quantity * (isOnSale ? onSalePrice : price)), Edit/Delete buttons.
Footer: Total cart price, “Finalize Order” button (shows alert("Order finalized!") for now).
Empty cart: White card with cart icon (FiShoppingCart), “Your cart is empty” text, fade-in animation.


Actions:
Edit: Opens AddToCartModal with current quantity, calls POST /cart via addToCart, updates cart, shows toast (Added ${quantity} of ${productName} to cart).
Delete: Calls DELETE /cart via deleteFromCart, updates cart, shows toast (Removed ${productName} from cart or error).


Responsive:
Desktop: Grid layout (2fr 1fr 1fr 1fr 1fr for Name, Quantity, Price, Total, Actions).
Mobile: Stacks rows, hides headers, uses data-label prefixes (e.g., “Product Name:”), card-like rows (subtle background, rounded), smaller fonts, centered actions.


Styling (src/styles/pages/CartPage.scss):
Gradient background (#f8f9fa to darker), white card, rounded, shadowed.
Price: Strikethrough for original-price (#6c757d), bold blue #007bff for sale-price.
Buttons: Edit (blue #007bff, hover #0056b3), Delete (red #dc3545, hover darker), Finalize (blue).
Footer fix: min-height: 100vh, flex: 1.





3. Add to Cart Modal (AddToCartModal)

Component: src/components/AddToCartModal.tsx
Description: Modal for adding/editing cart items, triggered from ProductCard, ProductDetail, or CartPage (Edit).
Details:
Inputs:
Quantity (1–99), controlled input with FiPlus/FiMinus buttons (react-icons).
No spin buttons (via index.scss).
Initial value: 1 (new item) or current quantity (Edit).


Actions:
Increment/Decrement: Updates quantity (1–99).
“Add” button: Calls POST /cart via addToCart, updates AuthContext.cart, shows toast, closes on success.
Close button: Closes modal.


Loading Mechanism:
isLoading state during POST /cart.
Shows FiLoader spinner on “Add” button.
Disables FiPlus, FiMinus, input, close button (gray #6c757d, cursor: not-allowed).


Styling (src/styles/components/AddToCartModal.scss):
White card, rounded, shadowed, centered in overlay.
Blue #007bff buttons, hover #0056b3, gray disabled.
Responsive: Smaller fonts/buttons on mobile.
Fade-in animation, spinning loader.





4. Product Browsing

Components:
ProductCard (src/components/ProductCard.tsx): Displays product image, name, price, “Add to Cart” button.
ProductDetail (src/pages/ProductDetail.tsx): Shows product details (image, name, description, stock, price, “Add to Cart”).
ProductsPage (src/pages/ProductsPage.tsx): Lists products via ProductsContainer.
ProductsContainer (src/components/ProductsContainer.tsx): Fetches and renders ProductCards.


Routes:
/products: ProductsPage.
/product/:id: ProductDetail.


Details:
ProductCard:
Image: Falls back to /default-image.svg if imageUrl fails.
Price: Strikethrough for price if isOnSale, blue #007bff for onSalePrice.
“Add to Cart”:
Logged Out: Disabled (gray #6c757d), tooltip, toast (“Please log in to add to cart”).
Logged In, In Stock: Blue #007bff, hover #0056b3, opens AddToCartModal.
Logged In, Out of Stock: Disabled, red text, toast (“This product is out of stock”).


Click: Navigates to /product/:id.
No description shown (per requirement).


ProductDetail:
Shows all product fields (image, name, description, stock, price, onSalePrice).
Same “Add to Cart” behavior as ProductCard.


Styling:
ProductCard.scss: White card, rounded, shadowed, hover effect, smaller button.
ProductDetail.scss: Gradient background, white card, centered content.
ProductsPage.scss: Grid layout for products, responsive.


Responsive: Mobile adjusts fonts, button sizes, stacks layouts.



5. Admin Panel

Component: src/pages/AdminPanel.tsx
Route: /admin
Description: Admin interface with Products tab as default.
Details:
Products Tab (src/components/AdminPanelProducts.tsx): Lists products, supports CRUD (delete button needs fixing).
Styling (src/styles/pages/AdminPanel.scss, src/styles/components/AdminPanelProducts.scss):
Gradient background, white card, rounded, shadowed.
Blue #007bff buttons, responsive layout.


Default Tab: Products tab loads by default.



6. About Us Page

Component: src/pages/AboutUsPage.tsx
Route: /about
Description: Static page with company information.
Details:
Gradient background, white card, rounded, shadowed.
Responsive layout, footer fix.
Styling: src/styles/pages/AboutUsPage.scss.



7. Global Styling

File: src/styles/index.scss
Details:
No Spin Buttons: Hides number input spin buttons via input[type="number"] styles.
Variables (src/styles/abstract/variables.scss):
Colors: $primary-color (#007bff), $accent-color (#0056b3), $neutral-color (#6c757d), $danger-color (#dc3545), etc.
Fonts: $font-size-xs (0.75rem), $font-size-small (0.875rem), $font-size-base (1rem), $font-size-large (1.25rem).
Spacing: $spacing-xs (0.25rem), $spacing-sm (0.5rem), $spacing-md (1rem), $spacing-lg (1.5rem).
Breakpoint: $breakpoint-md (768px).
Shadows, transitions, darken function.


Consistent UI:
Gradient background (#f8f9fa to darker).
White cards, rounded, shadowed ($shadow-lg).
Blue buttons (#007bff, hover #0056b3), red for delete (#dc3545).
Footer fix: min-height: 100vh, flex: 1.





8. API Integration

Config: src/data/configs.json (apiBaseUrl for API endpoints).
Endpoints:
POST /cart: Adds/updates item ({ productId, quantity }), returns { data: CartItem[] }.
DELETE /cart: Removes item ({ productId }), returns { data: CartItem[] }.
Headers: Authorization: Bearer ${token} (from AuthContext).


Error Handling: Shows toast.error for API failures, requires isAuthenticated.

File Structure
src/
├── components/
│   ├── AddToCartModal.tsx        # Cart modal with quantity input, loading
│   ├── ProductCard.tsx           # Product card with image, name, price
│   ├── ProductsContainer.tsx     # Fetches and renders product cards
│   ├── AdminPanelProducts.tsx    # Admin products tab
├── contexts/
│   ├── AuthContext.tsx           # Authentication and cart context
├── pages/
│   ├── CartPage.tsx              # Cart page with items, edit/delete
│   ├── ProductDetail.tsx         # Product detail page
│   ├── ProductsPage.tsx          # Product listing page
│   ├── AboutUsPage.tsx           # About us page
│   ├── AdminPanel.tsx            # Admin panel with products tab
├── styles/
│   ├── components/
│   │   ├── AddToCartModal.scss   # Modal styles
│   │   ├── ProductCard.scss      # Product card styles
│   │   ├── ProductsPage.scss     # Products page styles
│   │   ├── AdminPanelProducts.scss # Admin products styles
│   ├── pages/
│   │   ├── CartPage.scss         # Cart page styles
│   │   ├── ProductDetail.scss    # Product detail styles
│   │   ├── AboutUsPage.scss      # About us styles
│   │   ├── AdminPanel.scss       # Admin panel styles
│   ├── abstract/
│   │   ├── variables.scss        # SCSS variables and darken function
│   ├── index.scss                # Global styles, no spin buttons
├── model/
│   ├── product.model.ts          # Product interface
│   ├── cart-item.model.ts        # CartItem interface
│   ├── user.model.ts             # User interface
├── data/
│   ├── configs.json              # API base URL
├── App.tsx                       # Main app with routes
├── main.tsx                      # Entry point with AuthProvider

Setup and Installation

Clone Repository:git clone <repository-url>
cd <project-folder>


Install Dependencies:npm install

Key dependencies:
react, react-dom, react-router-dom
@types/react, @types/react-dom (TypeScript)
axios (API calls)
react-toastify (toasts)
react-icons (icons: FiPlus, FiMinus, FiLoader, FiShoppingCart)
sass (SCSS)


Run Development Server:npm run dev

Open http://localhost:3000 in your browser.

Testing

Navigate:
/products: View product cards.
/product/:id: View product details.
/cart: View cart.
/about: View about page.
/admin: View admin panel (Products tab default).


Test Features:
Authentication:
Login/Signup: Mock API to set token, user, cart in sessionStorage.
Refresh: Verify cart persists via AuthContext’s useEffect.
Logout: Clears sessionStorage, resets state.


CartPage:
Headers: Product Name, Quantity, Price, Total, Actions.
Rows: Name, quantity, price (strikethrough #6c757d, blue #007bff for sale), total, Edit/Delete.
Edit: Opens AddToCartModal, updates quantity, POST /cart, toast.
Delete: Calls DELETE /cart, updates cart, toast.
Empty: White card, cart icon, “Your cart is empty”.
Footer: Total price, “Finalize Order” alert.
Responsive: Mobile stacks rows, hides headers, uses data-label.


AddToCartModal:
Quantity: 1–99, FiPlus/FiMinus, no spin buttons.
Loading: Spinner (FiLoader), disabled buttons/input during POST /cart.
Toast: Success (Added ${quantity} of ${productName} to cart) or error.
Close: On success or close button.


ProductCard:
Image: Falls back to /default-image.svg.
Price: Strikethrough if on sale.
“Add to Cart”: Disabled if logged out (tooltip, toast) or out of stock (red text, toast).
Click: Navigates to /product/:id, no description.


ProductDetail: All fields, same “Add to Cart” behavior.
Responsive: Mobile adjusts fonts, stacks layouts, card-like rows.


API Mocks:// POST /cart
const cartResponse = { data: [
  { product: { id: "123", imageUrl: "http://invalid-url.com/img.jpg", name: "Product 1", description: "Desc 1", stock: 10, price: 99.99, isOnSale: true, onSalePrice: 79.99 }, quantity: 3 }
]};
// DELETE /cart (productId: "123")
const deleteResponse = { data: [] };
// Products
const productsResponse = { data: [
  { id: "123", imageUrl: "http://invalid-url.com/img.jpg", name: "Product 1", description: "Desc 1", stock: 10, price: 99.99, isOnSale: true, onSalePrice: 79.99 },
  { id: "124", imageUrl: "http://example.com/img2.jpg", name: "Product 2", description: "Desc 2", stock: 0, price: 49.99, isOnSale: false, onSalePrice: 0 }
]};
// Auth
const authResponse = {
  token: "abc123",
  user: { id: "user1", username: "testuser", firstName: "Test", lastName: "User", role: "customer" },
  cart: [{ product: { id: "123", ... }, quantity: 2 }]
};



Future Improvements

Implement finalize order API for CartPage.
Fix delete button in AdminPanelProducts.tsx (share code for assistance).
Add Users tab CRUD in AdminPanel.
Enhance empty cart with call-to-action (e.g., “Shop Now” button).
